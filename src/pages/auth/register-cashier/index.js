import { useRef, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import { deactiveCashier, registerCashier } from "../../../store/slices/cashier/slices"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { RegisterValidationSchema } from "../../../store/slices/cashier/validation.js"
import "../../../Form.scss"

const initialValuesSignUp = {
    username:"",
    email: "",
}

function RegisterCashierPage () {

    const usernameRef = useRef()
    const emailRef = useRef()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isRegisterLoading } = useSelector(state => {
        return {
            isRegisterLoading : state.auth.isRegisterCashierLoading
        }
    })
    
    const onButtonRegister = () => {
        dispatch(registerCashier({
            username : usernameRef.current?.value.toString(),
            email : emailRef.current?.value.toString(),
            password : usernameRef.current?.value.toString().charAt(0).toUpperCase() + usernameRef.current?.value.toString().slice(1) + '_123'
        }))
    }

    const onButtonDeactive = () => {
        dispatch(deactiveCashier({
            idCashier : 2
        }))
    }

    return (
        <Formik
            initialValues={initialValuesSignUp}
            validationSchema={RegisterValidationSchema}
        >
        {({ errors, touched, isSubmitting }) => {
            return (
            <div className="container flex flex-col items-center justify-center">
                <div className="form card w-4/12 bg-base-100 shadow-xl py-4 ">
                    <Form>
                    <h1>Register a New Cashier</h1>
                    <div className="form-row mt-5">
                        <label >Username</label>
                        <Field
                            type="username"
                            name="username"
                            id="username"
                            innerRef = {usernameRef}
                            className={
                                errors.username && touched.username ? "input-error input input-md w-full " : "input input-bordered input-md w-full "
                            }
                        />
                        <ErrorMessage name="username" component="span" className="error" />
                    </div>

                    <div className="form-row">
                        <label >Email</label>
                        <Field
                            type="email"
                            name="email"
                            id="email"
                            innerRef={emailRef}
                            className={
                                errors.email && touched.email ? "input-error input input-md w-full " : "input input-bordered input-md w-full "
                            }
                        />
                        <ErrorMessage name="email" component="span" className="error" />
                    </div>

                    <div className="flex flex-row justify-between">
                        <button
                            type="button"
                            className={
                                `inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                                ${(emailRef.current?.value === "") || (usernameRef.current?.value === "")
                                    ? "cursor-not-allowed"
                                    : ""
                                }
                                `
                            }
                            disabled={(emailRef.current?.value === "") || (usernameRef.current?.value === "")|| isSubmitting || isRegisterLoading}
                            onClick={onButtonRegister}
                        >
                            { isSubmitting || isRegisterLoading ?  <span className="loading loading-spinner"></span> : null }
                            Register
                        </button>
                        <button 
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                            onClick={() =>{navigate("/cashier")}}
                        >
                            Cancel
                        </button>
                    </div>
                    </Form>
                </div>
            </div>
            );
        }}
        </Formik>
    )
}

export default RegisterCashierPage