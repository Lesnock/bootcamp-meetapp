import * as Yup from 'yup'

export const AvatarSchema = Yup.object({
    mimetype: Yup
        .string()
        .oneOf([
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
        ]),
})
