import express from 'express'
import { PrismaClient } from '@prisma/client'
import { uploadCloud } from '../config/cloudinary.js' 

const router = express.Router()
const prisma = new PrismaClient()

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

// --- LIVROS (USANDO CLOUDINARY) ---

router.post('/livros', uploadCloud.single('capa'), async (req, res) => {
    try {
        const { titulo, descricao, categoryId } = req.body 
        
        const novoLivro = await prisma.book.create({
            data: {
                titulo,
                descricao,
                // req.file.path agora contém a URL (https://res.cloudinary.com/...)
                capa: req.file ? req.file.path : null,
                userId: req.userID, 
                categoryId: categoryId 
            }
        })
        res.status(201).json(novoLivro)
    } catch (err) {
        console.error("ERRO AO CRIAR LIVRO:", err)
        res.status(500).json({ message: "Erro ao criar livro", error: err.message })
    }
})

// LISTAGEM
router.get('/livros', async (req, res) => {
    try {
        const livros = await prisma.book.findMany({
            where: {
                userId: req.userID 
            },
            include: { 
                category: true
            }
        })
        
        res.status(200).json({ listaDeLivros: livros || [] })
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar livros", error: err.message })
    }
})

router.put('/livros/:id', uploadCloud.single('capa'), async (req, res) => {
    try {
        const { id } = req.params
        const { titulo, descricao, categoryId } = req.body
        
        const livroExistente = await prisma.book.findFirst({ 
            where: { id, userId: req.userID } 
        })
        
        if (!livroExistente) return res.status(404).json({ message: "Livro não encontrado" })

        let dadosParaAtualizar = { titulo, descricao, categoryId }

        if (req.file) {
            // Se enviou foto nova, salvamos a nova URL da nuvem
            dadosParaAtualizar.capa = req.file.path
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
        
        const livro = await prisma.book.findFirst({ 
            where: { id, userId: req.userID } 
        })
        
        if (!livro) return res.status(404).json({ message: "Livro não encontrado" })

        await prisma.book.delete({ where: { id } })
        
     
        res.status(200).json({ message: "Deletado com sucesso" })
    } catch (err) {
        res.status(500).json({ message: "Erro ao deletar" })
    }
})

export default router