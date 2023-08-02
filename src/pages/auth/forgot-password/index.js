import { useRef } from "react"
import { useDispatch,useSelector } from "react-redux"
import { forgotPassword } from "../../../store/slices/auth/slices"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { EmailValidationSchema } from "../../../store/slices/auth/validation.js"
import "../../../Form.scss"

function ForgotPasswordPage () {
    const dispatch = useDispatch()
    const { isForgotLoading } = useSelector(state => {
        return {
          isForgotLoading : state.auth.isForgotLoading,
        }
    })

    const emailRef = useRef()

    const onButtonSendLink = () => {
        const email = emailRef.current?.value.toString()
        dispatch(forgotPassword({ email }))
    }

    return (
        <Formik
            initialValues={{email: ""}}
            validationSchema={EmailValidationSchema}
        >
      {({ errors, touched, isSubmitting}) => {
        return (
          <div>
            <div className="w-full fixed bg-slate-400 bg-opacity-100 pt-[250px] flex flex-col items-center right-0 z-40 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full"></div>
            <div className="ml-[-150px] container flex flex-col items-center justify-center z-50">
              <div className="form card w-4/12 bg-white rounded shadow-xl py-4 z-50">
                <Form>
                  <h1>Forgot Password</h1>
                  <div className="form-row mt-7">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      innerRef={emailRef}
                      className={
                        errors.email && touched.email ? "input-error input input-md w-full" : "input input-bordered input-md w-full"
                      }
                    />
                    <ErrorMessage name="email" component="span" className="error" />
                  </div>
                  <button
                    type="button"
                    className={
                      `inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                      ${(emailRef.current?.value === "")
                          ? "cursor-not-allowed"
                          : ""
                      }
                      `
                  } 
                    disabled={(emailRef.current?.value === "") || isSubmitting || isForgotLoading }
                    onClick={onButtonSendLink}
                  >
                    { isSubmitting || isForgotLoading ?  <span className="loading loading-spinner"></span> : null }
                    Send Link Reset Password 
                  </button>
                </Form>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
    )
}

export default ForgotPasswordPage