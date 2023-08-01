import * as Yup from "yup"

export const RegisterValidationSchema = Yup.object({
    username : Yup.string()
        .required("Username is required")
        .min(6,"Username must contain 6 or more characters"),
       
    email : Yup.string().email("Invalid email").required("Username is required")
})

export const DetailValidationSchema = Yup.object({
    username : Yup.string()
        .min(6,"Username must contain 6 or more characters"),
       
    email : Yup.string()
        .email("Invalid email")
})