import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import RenderCashierDetailCard from "./edit-product";
import { deleteProduct, getProduct, getProductDetail } from "../../store/slices/product/slices";
function ProductListCard ({
    id = "",
    name = "",
    price = "",
    image = "",
    desc = "",
}) {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [confirmation,deleteConfirm] = useState(false)

    const [modification,dataModified] = useState(false)

    const [editing,editProduct] = useState(false)

    const writeIcon = <FontAwesomeIcon icon={faPenToSquare} />

    const { detailProduct } = useSelector(state => {
        return {
            detailProduct : state.product.detail,
        }
    })

    const onButtonDelete = ()=>{
        dispatch(
            deleteProduct(id)
        )
        dataModified(!modification)
    }

    // useEffect(() => {
	// 	dispatch(
    //         getProduct({
    //             page:1, 
    //             product_name:"", 
    //             id_cat:"", 
    //             sort_price:"", 
    //             sort_name:""
    //         })
    //     )
    //     dataModified(false)
	// }, [modification,dataModified])

    const onButtonEdit = ()=>{
        dispatch(
            getProductDetail(id),
            editProduct(true)
        )
    }

    return (
        <div className="flex flex-wrap gap-4 pb-5 ">
            <div class={`
               flex flex-col gap-4 w-[250px] h-auto p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mr-5 
            `}>
                <a href="#" className="flex flex-col items-center bg-black h-[120px]">
                    <img 
                        class="rounded-t-lg " 
                        src={"https://res.cloudinary.com/dpgk4f2eu/image/upload/f_auto,q_auto/v1/" + image} 
                        alt="" 
                    />
                </a>
                <a href="#" >
                    <h5 class="mb-2  text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {name}
                    </h5>
                </a>
                <p class="text-left text-gray-500 dark:text-gray-400">
                    Desctiption : {desc}
                </p>

                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {price}
                </p>
                <div className={`
                    flex flex-row flex-wrap gap-4 justify-between justify-self-end
                    
                    `}>
                    <a 
                        onClick={onButtonEdit}
                        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {writeIcon}
                        Edit 
                    </a>
                    <button 
                        class="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" 
                        type="button"
                        onClick={()=>deleteConfirm(true)}
                        >
                        Delete
                    </button>
                </div>
            </div>
                <div 
                    id="popup-modal" 
                    class={`
                        fixed bg-slate-400 bg-opacity-50 pt-[250px] flex flex-col items-center right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full 
                        ${!confirmation  ? "hidden" : ""}
                    `}
                >

                        <div class="relative w-full max-w-md max-h-full">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div class="p-6 text-center">
                                    <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                    </svg>
                                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                        Are you sure you want to delete this product?
                                    </h3>
                                    <button 
                                        data-modal-hide="popup-modal" 
                                        type="button" 
                                        class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                        onClick={()=>{
                                            deleteConfirm(false)
                                            onButtonDelete()
                                        }}
                                    >
                                        Yes, I'm sure
                                    </button>
                                    <button 
                                        data-modal-hide="popup-modal" 
                                        type="button" 
                                        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                        onClick={()=>deleteConfirm(false)}
                                    >
                                        No, cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    <div class={`max-w-screen  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mr-5 ${confirmation ? "opacity-20" : ""} `}
                    >
                    </div>
                </div>
        </div>
    )
}

export default function RenderProductListCard ({
    productList = [],
}) {
    return productList.map((productList, index) => {
        return (
            <ProductListCard key={productList.id}
                id={productList.id}
                image={productList.image}
                name={productList.name}
                price = {productList.price}
                desc = {productList.description}
            />
        )
    })
}