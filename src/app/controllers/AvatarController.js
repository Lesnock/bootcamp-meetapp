import fs from 'fs'
import sharp from 'sharp'
import { resolve } from 'path'
import File from '../models/File'
import message from '../messages'
import { AvatarSchema } from '../validations/AvatarValidation'

class AvatarController {
    async store (req, res) {
        if (!await AvatarSchema.isValid()) {
            await fs.unlink(req.file.path, err => {
                if (err) console.log(err)
            })

            return res.json({ error: message('invalid-mime') })
        }

        // Shrink file and send to images/avatar folder
        await sharp(req.file.path)
            .jpeg({ quality: 50 })
            .resize(800)
            .toFile(resolve(__dirname, '..', '..', '..', 'images', 'avatars') + req.file.filename)

        // Delete tmp file
        fs.unlink(req.file.path, err => {
            if (err) console.log(err)
        })

        const file = await File.create({
            filename: req.file.filename,
            path: req.file.path,
        })

        return res.json(file)
    }
}

export default new AvatarController()
