import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: "Acesso negado. Token não fornecido." })
    }

    const token = authHeader.replace('Bearer ', '')

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        
        // Garante que o ID do usuário seja passado para as rotas
        req.userID = decoded.id 
        
        next() // Só prossegue se o token for válido
    } catch (err) {
        console.error("Erro no JWT:", err.message)
        return res.status(401).json({ message: "Acesso negado. Token inválido." })
    }
}

export default auth