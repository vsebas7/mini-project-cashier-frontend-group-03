import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getProduct } from "../../store/slices/product/slices"
import { getCategory } from "../../store/slices/category/slices"
import RenderProductListCard from "../../components/products"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpAZ, faArrowDownZA, faArrowUp19, faArrowDown91  } from "@fortawesome/free-solid-svg-icons"
import Pagination from "../../components/pagination"
import RenderProductDetailCard from "../../components/products/edit-product"
import {RenderCategoryProduct} from "../../components/category"


function ListProductPage () {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { listProduct, detailProduct, currentPage, totalPage, categoryProduct, editLoading } = useSelector(state => {
        return {
            listProduct : state.product.list,
            detailProduct : state.product.detail,
            currentPage : state.product.currentPage,
            totalPage : state.product.totalPage,
            categoryProduct : state.category.list,
            editLoading : state.product.isEditProductLoading
        }
    })

    const [sortingName,setSortingName] = useState("")
    const [sortingPrice,setSortingPrice] = useState("")
    const [nameFilter,setNameFilter] = useState("")
    const [category,setCategory] = useState("")
    const [show,setShow] = useState(false)

    const PARAMETER = `?page=${currentPage}&product_name=${nameFilter}&id_cat=${category}&sort_price=${sortingPrice}&sort_name=${sortingName}`

    const onButtonSortName = (type="")=>{
        setSortingName(type)
        dispatch(
            getProduct({
                page:1, 
                product_name:nameFilter, 
                id_cat:category, 
                sort_price: sortingPrice,
                sort_name : type
            })
        )
        // window.history.pushState({}, null, ("http://localhost:3000/product" + PARAMETER));
    }

    const onButtonSortPrice = (type="")=>{
        setSortingPrice(type)
        dispatch(
            getProduct({
                page:1, 
                product_name:nameFilter, 
                id_cat:category, 
                sort_price: type,
                sort_name : sortingName
            })
        )
        // window.history.pushState({}, null, ("http://localhost:3000/product" + PARAMETER));
    }

    const handleChange = (event) => {
        setNameFilter(event.target.value)
        dispatch(
            getProduct({
                page:1, 
                product_name : event.target.value, 
                id_cat:category, 
                sort_price: sortingPrice,
                sort_name : sortingName
            })
        )
        window.history.replaceState({}, null, ("http://localhost:3000/product" + `?page=${currentPage}&product_name=${event.target.value}&id_cat=${category}&sort_price=${sortingPrice}&sort_name=${sortingName}`));
    }

    const handleChangeCategory = (event) => {
        setCategory(event.target.selectedOptions[0].className)
        dispatch(
            getProduct({
                page:1, 
                product_name : nameFilter, 
                id_cat:event.target.selectedOptions[0].className, 
                sort_price: sortingPrice,
                sort_name : sortingName
            })
        )
        // window.history.pushState({}, null, ("http://localhost:3000/product" + PARAMETER));
    }

    const onChangePagination = (type) => {
        dispatch(
            getProduct({ 
                page : type === "prev" ? Number(currentPage) - 1 : Number(currentPage) + 1, 
                product_name : nameFilter, 
                id_cat:category, 
                sort_price: sortingPrice,
                sort_name : sortingName
            })
        )
        // window.history.replaceState({}, null, ("http://localhost:3000/product" + PARAMETER));
    }

    useEffect(() => {
        dispatch(
            getProduct({
                page:1, 
                product_name:nameFilter, 
                id_cat:"", 
                sort_price:sortingPrice, 
                sort_name:sortingName
            })
        )
        dispatch(getCategory())
	}, [editLoading])

    return (
        <div>
            <a className="flex items-center normal-case text-[20pt] pb-10">
                Product List
            </a>
            <div className="flex flex-row pb-2 w-screen gap-4">
                <form className="w-[10%] relative">   
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input 
                        type="search" 
                        id="default-search" 
                        class="block w-auto p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Search Product Name" 
                        required
                        onChange={handleChange}
                    />
                </form>
                <div className="flex flex-row items-center h-auto">
                    Name
                    <FontAwesomeIcon  icon={faArrowUpAZ} size="2xl" className= {`${sortingName === "ASC" ? "hidden" : " "}`} onClick={()=>{onButtonSortName("ASC")}} />
                    <FontAwesomeIcon icon={faArrowDownZA} size="2xl" className= {`${sortingName === "DESC"  || sortingName === "" ? "hidden" : " "}`} onClick={()=>{onButtonSortName("DESC")}}/>                
                </div>
                <div className="flex flex-row items-center h-auto">
                    Price
                    <FontAwesomeIcon  icon={faArrowUp19} size="2xl" className= {`${sortingPrice === "ASC" ? "hidden" : " "}`} onClick={()=>{onButtonSortPrice("ASC")}} />
                    <FontAwesomeIcon icon={faArrowDown91} size="2xl" className= {`${sortingPrice === "DESC"  || sortingPrice === "" ? "hidden" : " "}`} onClick={()=>{onButtonSortPrice("DESC")}}/>                
                </div>
                <div className="flex flex-row items-center h-auto">
                    <Pagination 
                        onChangePagination={onChangePagination}
                        disabledPrev={Number(currentPage) === 1}
                        disabledNext={currentPage >= totalPage}
                    />
                </div>
                <div>                
                    <select 
                        value={category?.name} 
                        onChange={handleChangeCategory}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                    <option selected>Choose a category</option>
                    <RenderCategoryProduct categories={categoryProduct}/>
                    </select>
                </div>
            </div>
            
            <div className="flex w-full ">
                <div className={`flex flex-row flex-wrap  ${!show ? "" : "w-full gap-9"}`}>
                    <div className={`w-full  ${!show ? "hidden" :"fixed bg-slate-400 bg-opacity-50 pt-[250px] flex flex-col items-center right-0 z-40 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full"}`}></div>
                    <RenderProductListCard productList={listProduct} onEdit={()=>{setShow(true)}} />
                </div>
                <div className={`w-full  ${!show ? "hidden" : "flex flex-grow z-50 mt-[-50px]"}`}>
                    <RenderProductDetailCard productDetail={detailProduct} onButtonCancel={()=>{setShow(false)}}/>
                </div>
                
            </div>
            <div className="flex flex-col justify-self-center w-full align-middle items-center">
                <Pagination 
                    onChangePagination={onChangePagination}
                    disabledPrev={Number(currentPage) === 1}
                    disabledNext={currentPage >= totalPage}
                />
            </div>
        </div>
    )
}

export default ListProductPage