import { useRef, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addNewCategory, changeDetailCategory, defaultCategory, getCategory, getCategoryWithParentList, getDetailCategory } from "../../../store/slices/category/slices";
import { RenderCategoryProduct } from "..";

const initialValuesEditCategory = {
    name:"",
    parent: "",
}

function CategoryDetailCard ({
    id = "",
    name = "",
    parent_name = "",
    parent_id = "",
    onButtonCancel = ()=>{}
}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const nameRef = useRef()
    
    const [confirmation, setConfirmation] = useState(false)
    const [category,setCategory] = useState("")

    const { categoryProduct, categoryDetail } = useSelector(state => {
        return {
            categoryDetail : state.category.detail,
            categoryProduct : state.category.list
        }
    })

    const onButtonYes = () =>{
        if(categoryDetail.length > 0 ){
            dispatch(
                changeDetailCategory({
                    data : {
                        name : nameRef.current?.value ? nameRef.current?.value : nameRef.current?.placeholder,
                        parent : category ? category  : null,
                    },
                    category_id : id
                })
            )
        }else {
            dispatch(
                addNewCategory({
                    name : nameRef.current?.value,
                    parent : category ? category : parent_id ? parent_id : null,
                })
            )
        }
        document.forms["frm_id"].reset();
        dispatch(defaultCategory())
        setConfirmation(false)
        dispatch(getCategory())
        dispatch(getCategoryWithParentList())
        onButtonCancel()
    }

    const handleChangeCategory = (event) => {
        setCategory(event.target.selectedOptions[0].className)
    }
    
    useEffect(() => {
        dispatch(getCategoryWithParentList())
	}, [])

    return (
        <Formik
            initialValues={initialValuesEditCategory}
            // validationSchema={DetailValidationSchema}
        >
        {({ errors, touched, isSubmitting }) => {
            return (
            <div className="w-full container flex items-center justify-center ">
                <div className=" form card w-[35%] bg-white rounded flex flex-col items-center shadow-xl">
                    <Form className="w-[80%] flex flex-col items-center" id="frm_id">
                        <h1>{categoryDetail.length > 0 ? "Edit Category Detail" : "Add New Category"}</h1>
                        <div className="form-row mt-5">
                            <label >Category Name</label>
                            <Field
                                type="name"
                                name="name"
                                id="name"
                                defaultValue = {name ? name : ""}
                                placeholder = {name ? name : ""}
                                innerRef = {nameRef}
                                className={
                                    errors.name && touched.name ? "input-error input input-md w-full " : "input input-bordered input-md w-full "
                                }
                            />
                            <ErrorMessage name="name" component="span" className="error" />
                        </div>

                        <div className="form-row">             
                            <label >Sub-Category</label>
                            <select 
                                onChange={handleChangeCategory}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                            <option selected>{parent_name}</option>
                            <option value={null}></option>
                            <RenderCategoryProduct categories={categoryProduct}/>
                            </select>
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
z                                onClick={onButtonCancel}
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
                                    onClick={onButtonYes}
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

export default function RenderCategoryDetailCard ({
    categoryDetail = [],
    onButtonCancel =()=>{}
}) {
    return (
        <CategoryDetailCard
            id={categoryDetail.length > 0 ? categoryDetail[0].id : ""}
            name={categoryDetail.length > 0 ? categoryDetail[0].name : ""}
            parent_name={categoryDetail.length > 1 ? categoryDetail[1].name : ""}
            parent_id={categoryDetail.length > 1 ? categoryDetail[1].id : ""}
            onButtonCancel={onButtonCancel}
        />
    )
}