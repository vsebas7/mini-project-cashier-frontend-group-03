import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import {useDropzone} from 'react-dropzone';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AddProductValidationSchema } from "../../../store/slices/product/validation";
import { addProduct } from "../../../store/slices/product/slices";
import { getCategory } from "../../../store/slices/category/slices";
import {RenderCategoryProduct} from "../../../components/category";
import "../../../Form.scss"

const initialValuesAddProduct = {
    name:"",
    price: "",
    desc: "",
    image : "",
    category : "",
};

function AddNewProductPage () {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const nameRef = useRef()
    const priceRef = useRef()
    const descRef = useRef()

    const { categoryProduct, editImage } = useSelector(state => {
        return {
            categoryProduct : state.category.list,
            editImage : state.product.isEditImageLoading
        }
    })

    const [confirmation, setConfirmation] = useState(false)
    const [categoryID,setCategory] = useState("")
    const [file, setFile] = useState("null")

    const formData = new FormData()

    const onButtonSave = () =>{
        formData.append('file',file)
        console.log("after drop picture and save",formData.get('file'))
    }

    const onButtonCancelUpload = () =>{
        setFile("null")
    }

    const onDrop = (acceptedFiles,FileRejection) => {
        FileRejection.length === 0 
        ?
        setFile(acceptedFiles[0])
        :
        setFile(FileRejection[0].errors[0])
    }

    const {getRootProps , getInputProps , open, isDragActive} = useDropzone({onDrop , 
        maxFiles:1 , 
        accept : {'image/*' : ['.jpg','.jpeg','.webp','.png']} ,
        maxSize :1000000,
        noClick : true ,
        noKeyboard : true
    })

    const handleChangeCategory = (event) => {
        setCategory(event.target.selectedOptions[0].className)
    }
        
    const onButtonSure = () => {
        let output ={ 
            data : {
                "name" : nameRef.current?.value,
                "price" : priceRef.current?.value,
                "desc" : descRef.current?.value,
                "category" : categoryID
            },
            file : file    
        }

        formData.append("data",JSON.stringify(output.data))

        formData.append("file",output.file)
        
        dispatch(addProduct(formData))

        setConfirmation(false)
        navigate("/product", "replace")
    }
    
    useEffect(() => {
        dispatch(
            getCategory()
        )
	}, [editImage])
      
    return (
        <Formik
            initialValues={initialValuesAddProduct}
            validationSchema={AddProductValidationSchema}
        >
        {({ errors, touched}) => {
            return (
                <div className="container flex justify-center">
                    <div className=" form card w-[30%] bg-white rounded flex flex-col items-center shadow-xl">
                        <Form className="w-[80%] flex flex-col items-center">
                            <h1>Add New Product</h1>
                            
                            <div className="form-row ">
                                <label>Picture</label>
                                <div className={`${file?.code ? "" : "hidden"}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{file?.code}</span>
                                </div>      
                                <div 
                                    className={`flex file-input-bordered file-input-md h-4 py-5 border-2 ${file.name === "null" && touched.picture ? "input-error" :"border-black" }  w-full rounded-md break-all`}
                                >
                                    <input {...getInputProps({name : 'image'})}/>
                                    <a 
                                        onClick={open} 
                                        className='link link-hover text-amber-950 font-semibold rounded-lg w-auto ml-2 text-[12pt] flex-grow mt-[-22px]'
                                    >
                                        {
                                            file?.name
                                            ? file.name 
                                            : "Choose a file"
                                        }
                                    </a>
                                    <button
                                        className={`mt-[-12px] ${(file === "null" || file?.code) ? "hidden" : ""}`} 
                                        onClick={onButtonCancelUpload}
                                        >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>             
                                </div>
                                    {
                                        file.name == "null" && touched.picture
                                        ? `${console.log(file.name == "null" && touched.picture)}`
                                        // <span className="error">Picture is required</span>
                                        : ""
                                    }
                            </div>

                            <div className="form-row">
                                <label >Product Name</label>
                                <Field
                                    type="name"
                                    name="name"
                                    id="name"
                                    innerRef = {nameRef}
                                    className={
                                        errors.name && touched.name ? "input-error input input-md w-full " : "input input-bordered input-md w-full "
                                    }
                                />
                                <ErrorMessage name="name" component="span" className="error" />
                            </div>

                            <div className="form-row">
                                <label >Price</label>
                                <Field
                                    type="price"
                                    name="price"
                                    id="price"
                                    innerRef={priceRef}
                                    className={
                                        errors.price && touched.price ? "input-error input input-md w-full " : "input input-bordered input-md w-full "
                                    }
                                />
                                <ErrorMessage name="price" component="span" className="error" />
                            </div>

                            <div className="form-row">
                                <label >Description</label>
                                <Field
                                    type="desc"
                                    name="desc"
                                    id="desc"
                                    innerRef={descRef}
                                    className={
                                        errors.desc && touched.desc ? "input-error input input-md w-full " : "input input-bordered input-md w-full "
                                    }
                                />
                                <ErrorMessage name="desc" component="span" className="error" />
                            </div>

                            <div className="form-row">
                                <label >Category</label>                
                                <select 
                                    value={categoryID?.name} 
                                    onChange={handleChangeCategory}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                <option selected>Choose a category</option>
                                <RenderCategoryProduct categories={categoryProduct}/>
                                </select>
                            </div>
                            
                            <div className="flex flex-row justify-center w-full">
                                <button 
                                    type="button" 
                                    class="text-sm font-medium px-5 py-2.5 mr-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={() =>{setConfirmation(true)}}
                                    >
                                    Save Changes
                                </button>
                                {/* <button 
                                    type="button" 
                                    class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center "
                                    onClick={() =>{setConfirmation(true)}}
                                >
                                    Cancel
                                </button> */}
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
                                    Are you sure you want to save this changes ?
                                </h3>
                                <button 
                                    type="button" 
                                    class="text-sm font-medium px-5 py-2.5 mr-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={onButtonSure}
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

export default AddNewProductPage