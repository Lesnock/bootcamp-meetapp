import fs from 'fs'
import sharp from 'sharp'
import { resolve } from 'path'
import File from '../models/File'
import message from '../messages'
import { AvatarSchema } from '../validations/AvatarValidation'

class AvatarController {
    async store (req, res) {
        // Check mimetype
        if (!await AvatarSchema.isValid()) {
            await fs.unlink(req.file.path, err => {
                if (err) console.log(err)
            })

            return res.status(400).json({ error: message('invalid-mime') })
        }

        // Path to avatars folder + filename
        const avatarPath = `${resolve(__dirname, '..', '..', '..', 'images', 'avatars')}/${req.file.filename}`

        // Shrink file and send to images/avatar folder
        await sharp(req.file.path)
            .jpeg({ quality: 50 })
            .resize(800)
            .toFile(avatarPath)

        // Delete tmp file
        fs.unlink(req.file.path, err => {
            if (err) console.log(err)
        })

        const { id, filename, path } = await File.create({
            filename: req.file.filename,
            path: avatarPath,
        })

        return res.json({ id, filename, path })
    }
}

export default new AvatarController()
