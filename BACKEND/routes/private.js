import express from 'express'
import { PrismaClient } from '@prisma/client'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const router = express.Router()
const prisma = new PrismaClient()

const uploadDir = './uploads/'
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
})

const upload = multer({ storage })

// --- CATEGORIAS ---
router.get('/categorias', async (req, res) => {
    try {
        const categorias = await prisma.category.findMany()
        res.status(200).json(categorias)
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar categorias" })
    }
})

router.post('/categorias', async (req, res) => {
    try {
        const { name } = req.body
        const nova = await prisma.category.create({ data: { name } })
        res.status(201).json(nova)
    } catch (err) {
        res.status(500).json({ message: "Erro ao criar categoria" })
    }
})

// --- LIVROS (PROTEGIDOS POR USUÁRIO) ---

router.post('/livros', upload.single('capa'), async (req, res) => {
    try {
        const { titulo, descricao, categoryId } = req.body 
        
        const novoLivro = await prisma.book.create({
            data: {
                titulo,
                descricao,
                capa: req.file ? req.file.filename : null,
                userId: req.userID, // Usa o ID vindo do token
                categoryId: categoryId 
            }
        })
        res.status(201).json(novoLivro)
    } catch (err) {
        console.error("ERRO NO PRISMA:", err)
        res.status(500).json({ message: "Erro ao criar livro", error: err.message })
    }
})

// LISTAGEM
router.get('/livros', async (req, res) => {
    try {
        const livros = await prisma.book.findMany({
            where: {
                userId: req.userID // <-- O FILTRO MÁGICO AQUI
            },
            include: { 
                category: true
            }
        })
        
        res.status(200).json({ listaDeLivros: livros || [] })
    } catch (err) {
        console.error("Erro no Prisma:", err) 
        res.status(500).json({ message: "Erro ao buscar livros", error: err.message })
    }
})

router.put('/livros/:id', upload.single('capa'), async (req, res) => {
    try {
        const { id } = req.params
        const { titulo, descricao, categoryId } = req.body
        
        // Verifica se o livro existe E se pertence ao usuário
        const livroExistente = await prisma.book.findFirst({ 
            where: { id, userId: req.userID } 
        })
        
        if (!livroExistente) return res.status(404).json({ message: "Livro não encontrado ou sem permissão" })

        let dadosParaAtualizar = { titulo, descricao, categoryId }

        if (req.file) {
            dadosParaAtualizar.capa = req.file.filename
            if (livroExistente.capa) {
                const antigaPath = path.join(uploadDir, livroExistente.capa)
                if (fs.existsSync(antigaPath)) fs.unlinkSync(antigaPath)
            }
        }

        const livroAtualizado = await prisma.book.update({
            where: { id },
            data: dadosParaAtualizar
        })
        res.status(200).json(livroAtualizado)
    } catch (err) {
        res.status(500).json({ message: "Erro ao atualizar" })
    }
})

router.delete('/livros/:id', async (req, res) => {
    try {
        const { id } = req.params
        
        // Só busca o livro se ele for do usuário logado
        const livro = await prisma.book.findFirst({ 
            where: { id, userId: req.userID } 
        })
        
        if (!livro) return res.status(404).json({ message: "Livro não encontrado ou permissão negada" })

        await prisma.book.delete({ where: { id } })
        
        if (livro.capa) {
            const filePath = path.join(uploadDir, livro.capa)
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
        }
        res.status(200).json({ message: "Deletado com sucesso" })
    } catch (err) {
        res.status(500).json({ message: "Erro ao deletar" })
    }
})

export default router