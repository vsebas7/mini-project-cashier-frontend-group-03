import { React, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../../store/slices/auth/slices"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {LoginValidationSchema} from "../../../store/slices/auth/validation.js"
import "../../../Form.scss"

function LoginPage () {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector(state => {
    return {
      loading : state.auth.isLoginLoading,
    }
  })

  const eye = <FontAwesomeIcon icon={faEye} />;
  const eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;
  const [passwordShown, setPasswordShown] = useState({value : false, field_name : ""});

  const usernameRef = useRef()
  const passwordRef = useRef()
  
  const onButtonLogin = () => {
    const username = usernameRef.current?.value
    const password = passwordRef.current?.value
    dispatch(login({ username, password }))
  }

  const token = localStorage.getItem("token")

  if (token) return <Navigate to="/product" replace/>

  return (
      <Formik
          initialValues={{username : "" , password : ""}}
          validationSchema={LoginValidationSchema}
      >
    {({ errors, touched,isSubmitting}) => {
      return (
        <div >
          <div className="w-full fixed bg-slate-400 bg-opacity-100 pt-[250px] flex flex-col items-center right-0 z-40 overflow-x-hidden overflow-y-auto md:inset-0 h-full"></div>
          <div className="ml-[-150px] container flex flex-col items-center justify-center z-50 ">
            <div className="form card w-4/12 bg-white rounded shadow-xl py-4  z-50  ">
              <Form>
              <h1>Login to continue</h1>
                <div className="form-row mt-7">
                  <label>Username</label>
                  <Field
                    type="text"
                    name="text"
                    id="text"
                    innerRef={usernameRef}
                    className={
                      errors.text && touched.text ? "input-error input input-md w-full " : "input input-bordered input-md w-full "
                    }
                  />
                  <ErrorMessage name="text" component="span" className="error" />
                </div>

                <div className="form-row">
                  <label>Password</label>
                  <div className="form-row-pass">
                    <Field
                      type={passwordShown.value && passwordShown.field_name === "password" ? "text" : "password"}
                      name="password"
                      id="password"
                      innerRef={passwordRef}
                      className={
                        errors.password && touched.password ? "input-error input input-md w-full " : "input input-bordered input-md w-full "
                      }
                    />
                    <i className="eye-password" 
                      onClick={()=>{
                        setPasswordShown({value : !passwordShown.value, field_name : "password"})
                      }}>
                        {passwordShown.value && passwordShown.field_name === "password" ? eye_slash : eye}
                    </i>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="span"
                    className="error"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    disabled={isSubmitting || loading}
                    onClick={onButtonLogin}
                  >
                    { isSubmitting || loading ?  <span className="loading loading-spinner"></span> : null }
                    Login
                  </button>
                </div>
              </Form>
              <button className="link link-hover pl-5" onClick={() =>{navigate("/forgot-password")}}>Forgot Password</button>
              <br/>
            </div>
          </div>
        </div>  
      );
    }}
  </Formik>
  )
}

export default LoginPage