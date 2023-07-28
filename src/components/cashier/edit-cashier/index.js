import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"

import { DetailValidationSchema } from "../../../store/slices/cashier/validation"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getCashier } from "../../../store/slices/cashier/slices";

const initialValuesEditCashier = {
    username:"",
    email: "",
}

function CashierDetailCard ({
    id = "",
    username = "",
    email = "",
    image = "",
}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const usernameRef = useRef()
    const emailRef = useRef()

    const { isRegisterLoading } = useSelector(state => {
        return {
            isRegisterLoading : state.auth.isRegisterCashierLoading
        }
    })
    
    const [changes, saveChanges] = useState(false)
    const [confirmation, setConfirmation] = useState(false)

    const onButtonSave = () =>{
        console.log({
            username : usernameRef.current?.value ? usernameRef.current?.value : usernameRef.current?.placeholder,
            email : emailRef.current?.value ? emailRef.current?.value : emailRef.current?.placeholder
        })
        setConfirmation(false)
    }

    return (
        <Formik
            initialValues={initialValuesEditCashier}
            validationSchema={DetailValidationSchema}
        >
        {({ errors, touched, isSubmitting }) => {
            return (
            <div className="container">
                <div className=" form card w-[35%] bg-white rounded flex flex-col items-center shadow-xl">
                    <Form className="w-[80%] flex flex-col items-center">
                        <h1>Cashier Detail</h1>
                        <img class="w-36 h-36 my-3 rounded-full shadow-lg " src={"https://res.cloudinary.com/dpgk4f2eu/image/upload/f_auto,q_auto/v1/" + image} alt=""/>
                        <div className="form-row mt-5">
                            <label >Username</label>
                            <Field
                                type="username"
                                name="username"
                                id="username"
                                defaultValue = {username}
                                placeholder = {username}
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
                                defaultValue = {email}
                                placeholder = {email}
                                innerRef={emailRef}
                                className={
                                    errors.email && touched.email ? "input-error input input-md w-full " : "input input-bordered input-md w-full "
                                }
                            />
                            <ErrorMessage name="email" component="span" className="error" />
                        </div>
                        
                        <div className="flex flex-row justify-between w-full">
                            <button 
                                type="button" 
                                class="text-sm font-medium px-5 py-2.5 mr-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={()=>{setConfirmation(true)}}
                                >
                                Save Changes
                            </button>
                            <button 
                                type="button" 
                                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center "
                                onClick={() =>{dispatch(getCashier())}}
                            >
                                Cancel
                            </button>
                        </div>
                        <div 
                            id="popup-modal" 
                            class={`
                                fixed bg-slate-400 bg-opacity-50 pt-[150px] flex flex-col items-center right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full 
                                ${!confirmation ? "hidden" : ""}
                            `}
                        >
                            <div class="relative text-center p-3 bg-white w-[20%] rounded-lg shadow dark:bg-gray-700">
                                <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to save this changes?
                                </h3>
                                <button 
                                    type="button" 
                                    class="text-sm font-medium px-5 py-2.5 mr-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={onButtonSave}
                                    >
                                    Yes, I'm sure
                                </button>
                                <button 
                                    type="button" 
                                    class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center "
                                    onClick={() =>{setConfirmation(false)}}
                                >
                                    No
                                </button>
                            </div>  
                        </div>
                    </Form>
                </div>
            </div>
            );
        }}
        </Formik>
    )
}

export default function RenderCashierDetailCard ({
    cashierDetail = [],
}) {
    return cashierDetail.map((cashierDetail, index) => {
        return (
            <CashierDetailCard key={cashierDetail.id}
                id={cashierDetail.id}
                username={cashierDetail.username}
                image={cashierDetail.image}
                email = {cashierDetail.email}
            />
        )
    })
}