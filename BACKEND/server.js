import express from 'express'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import 'dotenv/config' 

import publicRoutes from './routes/public.js'
import privateRoutes from './routes/private.js'
import auth from './middlewares/auth.js'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()


//lembrete para mim: Adicione a URL do seu frontend quando fizer o deploy
const allowedOrigins = [
    'http://localhost:5173', // Vite padrão
    'http://localhost:3000',
    'https://escrita-ludica-lfix.onrender.com' // Troque pela URL real após o deploy
]

app.use(cors({
    origin: function (origin, callback) {
        
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Acesso bloqueado pelo CORS'));
        }
    },
    credentials: true
}))

// --- MIDDLEWARES GERAIS ---
app.use(express.json())



// --- ROTAS ---
app.use('/', publicRoutes)
app.use('/', auth, privateRoutes) 


const PORT = process.env.PORT || 3000

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Servidor rodando na porta ${PORT}`);
    
});