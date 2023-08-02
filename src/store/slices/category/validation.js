import * as Yup from "yup"

export const CategoryValidationSchema = Yup.object({
    name : Yup.string(),
    parent : Yup.string().nullable()
})