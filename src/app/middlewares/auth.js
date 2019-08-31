import jwt from 'jsonwebtoken'
import message from '../messages'
import authConfig from '../../config/auth'

export default function authMiddleware (req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.json({ error: message('invalid-token') })
    }

    const [, token] = authHeader.split(' ')

    try {
        const decoded = jwt.verify(token, authConfig.secret)
        req.userId = decoded.id
    } catch (err) {
        res.json({ error: message('invalid-token') })
    }

    return next()
}
