import { useRef, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Formik, Form, Field, ErrorMessage } from "formik";
import {useDropzone} from 'react-dropzone';
import {RenderCategoryProduct} from "../../../components/category"
import { EditProductValidationSchema } from "../../../store/slices/product/validation";
import { editProductDetail, editProductImage, getProduct } from "../../../store/slices/product/slices";

const initialValuesEditProduct = {
    name:"",
    price: "",
    desc: "",
    image : "",
    category : "",
}

function ProductDetailCard ({
    id = "",
    product_name = "",
    price = "",
    desc = "",
    image = "",
    cat ="",
    cat_id ="",
    onButtonCancel = ()=>{}
}) {
    const dispatch = useDispatch()

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
    }

    const onButtonCancelUpload = () =>{
        setFile([])
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
        formData.append('file',file)
        dispatch(
            editProductDetail(
                { 
                    data : {
                        name : nameRef.current?.value ? nameRef.current?.value : nameRef.current?.placeholder,
                        price : priceRef.current?.value ? priceRef.current?.value : priceRef.current?.placeholder,
                        description : descRef.current?.value ? descRef.current?.value : descRef.current?.placeholder,
                        categoryId : categoryID ? categoryID : cat_id
                    },
                    product_id : id
                }
            )
        )
        dispatch(editProductImage({product_id : id,data :formData})) 
        setConfirmation(false)
        onButtonCancel()
    }

    useEffect(() => {
        dispatch(
            getProduct()
        )
	}, [editImage])

    return (
        <Formik
            initialValues={initialValuesEditProduct}
            validationSchema={EditProductValidationSchema}
        >
        {({ errors, touched }) => {
            return (
                <div className="container">
                    <div className=" form card w-[80%] bg-white rounded flex flex-col items-center shadow-xl">
                        <Form className="w-[80%] flex flex-col items-center">
                            <h1>Product Detail</h1>
                            <img class="w-36 h-36 my-3 rounded-full shadow-lg " src={"https://res.cloudinary.com/dpgk4f2eu/image/upload/f_auto,q_auto/v1/" + image} alt=""/>
                            
                            <div>
                                <div className="flex flex-row flex-wrap gap-5 justify-center align-middle">
                                    <button 
                                    className="justify-center break-all" 
                                    onClick={()=>window.modalUploadImageProfile.showModal()}>
                                        {file?.name ? file.name : "Upload Product Image"} 
                                    </button> 
                                    <button
                                    className={`${file?.name ? "" : "hidden"}`} 
                                    onClick={onButtonCancelUpload}
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button> 
                                </div>
                                <dialog id="modalUploadImageProfile" className="modal modal-bottom sm:modal-middle rounded">
                                    <Form method="dialog" className="modal-box ">
                                    <h3 className="font-bold text-lg">Upload Product Image</h3>
                                    <p className="py-4">File should be jpg, jpeg, webp or png and less than 1Mb</p>
                                    <div className={`alert alert-error ${file?.code ? "" : "hidden"}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span>{file?.code}</span>
                                    </div>
                                    {file?.name 
                                        ? 
                                        <div className="stats shadow ">
                                            <div className="stat">
                                            <div className="stat-title">{file.name}</div>
                                            </div>                            
                                        </div> 
                                        : 
                                        <div className='rounded flex flex-col h-auto drop-shadow-lg p-5 justify-between bg-white w-full '>
                                            <div  {...getRootProps({className :`h-auto] w-full bg-light-grey ${isDragActive ? 'border-amber-950':'border-light-blue'} border-2 border-dashed rounded-md`})}>
                                            <input {...getInputProps({name : 'image'})}/>
                                            <img className='max-w-1/3 mx-auto mt-4' />
                                            <p 
                                                className='text-slate-400 md:text-md text-md text-center mt-2 mb-4 '
                                            >
                                                Drag & Drop your image here
                                            </p>
                                            </div>
                                            <div className="flex flex-col">
                                            <p className='text-center font-normal text-slate-400 text-md mt-2 mb-2'>
                                                Or
                                            </p>
                                            <a 
                                                onClick={open} 
                                                className='link link-hover bg-blue text-amber-950 font-normal p-1 rounded-lg w-auto mx-auto px-4 py-2 text-md '
                                            >
                                                Choose a file
                                            </a>
                                            </div>
                                        </div>
                                    }

                                    <div className="modal-action flex flex-row justify-between mt-5">
                                        <button 
                                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center "
                                            onClick={onButtonCancelUpload}
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            className="text-sm font-medium px-5 py-2.5 mr-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                                            onClick={onButtonSave}
                                        >
                                            Save
                                        </button>
                                    </div>
                                    </Form>
                                </dialog>
                                <br/>
                            </div>

                            <div className="form-row">
                                <label >Product Name</label>
                                <Field
                                    type="name"
                                    name="name"
                                    id="name"
                                    defaultValue = {product_name}
                                    placeholder = {product_name}
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
                                    defaultValue = {price}
                                    placeholder = {price}
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
                                    defaultValue = {desc}
                                    placeholder = {desc}
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
                                <option selected>{cat}</option>
                                <RenderCategoryProduct categories={categoryProduct}/>
                                </select>
                            </div>
                            
                            <div className="flex flex-row justify-between w-full py-5">
                                <button 
                                    type="button" 
                                    class="text-sm font-medium px-5 py-2.5 mr-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={() =>{setConfirmation(true)}}
                                    >
                                    Save Changes
                                </button>
                                <button 
                                    type="button" 
                                    class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center "
                                    onClick={onButtonCancel}
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

export default function RenderProductDetailCard ({
    productDetail = [],
    onButtonCancel =()=>{}
}) {
    return productDetail.map((productDetail, index) => {
        return (
            <ProductDetailCard key={productDetail.id}
                id={productDetail.id}
                product_name = {productDetail.name}
                price = {productDetail.price}
                desc = {productDetail.description}
                image = {productDetail.image}
                cat = {productDetail.productCategory[0].category.name}
                cat_id = {productDetail.productCategory[0].categoryId}
                onButtonCancel={onButtonCancel}
            />
        )
    })
}