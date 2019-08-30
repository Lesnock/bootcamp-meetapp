import jwt from 'jsonwebtoken'
import User from '../models/User'
import message from '../messages'
import authConfig from '../../config/auth'
import { LoginSchema } from '../validations/LoginValidation'

class LoginController {
    async store (req, res) {
        if (!await LoginSchema.isValid(req.body)) {
            return res.json({ error: message('wrong-credentials') })
        }

        const { username, password } = req.body

        const user = await User.findOne({ where: { username } })

        if (!user) {
            return res.json({ error: message('wrong-credentials') })
        }

        // Check password
        if (!await user.checkPassword(password)) {
            return res.json({ error: message('wrong-credentials') })
        }

        const token = jwt.sign(
            { id: user.id },
            authConfig.secret,
            { expiresIn: authConfig.expiresIn },
        )

        return res.json({
            user: {
                name: user.name,
                email: user.email,
                username,
            },
            token,
        })
    }
}

export default new LoginController()
