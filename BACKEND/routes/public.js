

import express from 'express'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'


const prisma = new PrismaClient()
const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET
//CADASTRO

router.post('/cadastro', async (req, res) => {

    try {
    const user = req.body

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(user.password, salt)

    const ELDatabase = await prisma.user.create({
        data: {
            email: user.email,
            name: user.name,
           password: hashPassword,
        },
    })
    res.status(201).json(ELDatabase)
}
catch(err){
    res.status(500).json({message: "erro no servidor tente novamente"})
}
})
// FIM CADASTRO

//LOGIN

router.post('/login', async (req, res) => {
    
try {

const userInfo = req.body

//Busca usuario no banco de dados
const user = await prisma.user.findUnique({
    where: {
        email: userInfo.email,
    },
})

//Verifica se usuario existe
if(!user){
    return res.status(404).json({message: "Usuario nao encontrado"})
}

//compara senha e valida
const isMatch = await bcrypt.compare(userInfo.password, user.password)

if(!isMatch){
    return res.status(400).json({message: "Senha invalida"})
}
//gera token JWT

const token = jwt.sign({id: user.id,}, JWT_SECRET, {expiresIn: '7d'})

res.status(200).json(token)
} catch(err){
    res.status(500).json({message: "erro no servidor tente novamente"})
}

})
//FIM LOGIN

export default router


