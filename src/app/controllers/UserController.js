import User from '../models/User'
import message from '../messages'
import { UserCreateSchema } from '../validations/UserValidation'

class UserController {
    async index (req, res) {
        return res.json()
    }

    async store (req, res) {
        // Yup validation
        if (!await UserCreateSchema.isValid(req.body)) {
            return res.json({ error: message('validation-fails') })
        }

        const { username, email } = req.body

        // Check if email is used
        if (await User.hasEmail(email)) {
            return res.json({ error: message('email-used') })
        }

        // Check if username is used
        if (await User.hasUsername(username)) {
            return res.json({ error: message('username-used') })
        }

        const { name, password } = await User.create(req.body)

        return res.json({ name, username, email, password })
    }
}

export default new UserController()
