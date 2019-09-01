import User from '../models/User'
import File from '../models/File'
import message from '../messages'
import { UserCreateSchema } from '../validations/UserValidation'

class UserController {
    async index (req, res) {
        const users = await User.findAll({
            attributes: ['id', 'name', 'username', 'email'],
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'filename', 'path'],
                },
            ],
        })

        return res.json(users)
    }

    async store (req, res) {
        // Yup validation
        if (!await UserCreateSchema.isValid(req.body)) {
            return res.status(400).json({ error: message('validation-fails') })
        }

        const { username, email } = req.body

        // Check if email is used
        if (await User.hasEmail(email)) {
            return res.status(400).json({ error: message('email-used') })
        }

        // Check if username is used
        if (await User.hasUsername(username)) {
            return res.status(400).json({ error: message('username-used') })
        }

        const { name, password } = await User.create(req.body)

        return res.json({ name, username, email, password })
    }
}

export default new UserController()
