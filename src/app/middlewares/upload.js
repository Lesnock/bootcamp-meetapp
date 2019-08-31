import multer from 'multer'
import { storage } from '../../config/multer'

const upload = multer({ storage })

export function uploadSingle (input) {
    return upload.single(input)
}
