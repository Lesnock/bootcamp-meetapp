import * as Yup from 'yup'

export const LoginSchema = Yup.object({
    username: Yup
        .string()
        .required(),

    password: Yup
        .string()
        .min(6)
        .strict()
        .required(),
})
