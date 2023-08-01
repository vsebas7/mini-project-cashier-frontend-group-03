import * as Yup from "yup"

export const EditProductValidationSchema = Yup.object({
    name : Yup.string(),
    price : Yup.string(),
    category : Yup.string(),
    desc :  Yup.string()
})

export const AddProductValidationSchema = Yup.object({
    name : Yup.string().required(),
    price : Yup.string().required(),
    category : Yup.string().required(),
    desc :  Yup.string().required()
})