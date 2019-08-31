import multer from 'multer'
import crypto from 'crypto'
import { resolve } from 'path'

// Folder to save uploads
const destination = (req, file, cb) => cb(null, resolve(__dirname, '..', '..', 'tmp', 'uploads'))

// Name of the file
const filename = (req, file, cb) => {
    crypto.randomBytes(12, (err, res) => {
        if (err) return cb(err)

        return cb(null, res.toString('hex') + file.originalname)
    })
}

export const storage = multer.diskStorage({
    destination,
    filename,
})
