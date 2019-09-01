import * as Yup from 'yup'

export const MeetupCreateSchema = Yup.object({
    title: Yup
        .string()
        .required(),

    description: Yup
        .string()
        .required(),

    address: Yup
        .string()
        .required(),

    date: Yup
        .date()
        .required(),

    file_id: Yup
        .number()
        .required(),
})

export const MeetupUpdateSchema = Yup.object({
    title: Yup
        .string(),

    description: Yup
        .string(),

    address: Yup
        .string(),

    date: Yup
        .date(),

    file_id: Yup
        .number(),
})
