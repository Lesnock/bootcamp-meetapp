import * as Yup from 'yup'

export const UserCreateSchema = Yup.object({
    name: Yup
        .string()
        .strict()
        .required(),

    username: Yup
        .string()
        .strict()
        .required(),

    email: Yup
        .string()
        .email()
        .required(),

    password: Yup
        .string()
        .min(6)
        .strict()
        .required(),
})
