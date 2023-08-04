import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProduct } from "../../../store/slices/product/slices"
import { getCategory } from "../../../store/slices/category/slices"
// import RenderProductListCard from "../../components/products"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpAZ, faArrowDownZA, faArrowUp19, faArrowDown91,faCircleXmark  } from "@fortawesome/free-solid-svg-icons"
import Pagination from "../../../components/pagination"
import {RenderCategoryProduct} from "../../../components/category"
import RenderProductListForTransaction from "../../../components/transaction/list-product"

function ProductListPage () {
    const dispatch = useDispatch()

    const { listProduct, detailProduct, currentPage, totalPage, categoryProduct } = useSelector(state => {
        return {
            listProduct : state.product.list,
            detailProduct : state.product.detail,
            currentPage : state.product.currentPage,
            totalPage : state.product.totalPage,
            categoryProduct : state.category.list,
        }
    })

    const [sortingName,setSortingName] = useState("")
    const [sortingPrice,setSortingPrice] = useState("")
    const [nameFilter,setNameFilter] = useState("")
    const [category,setCategory] = useState("")
    const [show,setShow] = useState(false)
    const [filter,setFilter] = useState(false)

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
        setFilter(true)
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
        setFilter(true)
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
        setFilter(true)
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
        setNameFilter("")
        setFilter(true)
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
    }

    const clearFilter = () => {
        setSortingName("")
        setSortingPrice("")
        setNameFilter("")
        setCategory("")
        setFilter(false)
        window.location.assign("/transaction")
    }

    useEffect(() => {
        if(!window.location.search){
            dispatch(
                getProduct({
                    page:1, 
                    product_name:nameFilter, 
                    id_cat:"", 
                    sort_price:sortingPrice, 
                    sort_name:sortingName
                })
            )
        }else {
            window.history.pushState({},null,window.location.href)
            dispatch(
                getProduct({
                    page:new URLSearchParams(window.location.search).get('page'), 
                    product_name:new URLSearchParams(window.location.search).get('product_name'), 
                    id_cat:new URLSearchParams(window.location.search).get('id_cat'), 
                    sort_price:new URLSearchParams(window.location.search).get('sort_price'), 
                    sort_name:new URLSearchParams(window.location.search).get('sort_name')
                })
            )
            setSortingName(new URLSearchParams(window.location.search).get('sort_name'))
            setSortingPrice(new URLSearchParams(window.location.search).get('sort_price'))
            setCategory(new URLSearchParams(window.location.search).get('id_cat'))
            setFilter(true)
        }
        dispatch(getCategory())
	}, [])

    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg flex-1">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    Product List
                    {/* <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Check</p> */}

                    <div className="flex flex-wrap flex-row pb-2 gap-4">
                        <div className="">
                        <form id="name_filter" className="w-[10%] relative">   
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input 
                                class="block w-auto p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Search Product Name"
                                defaultValue={new URLSearchParams(window.location.search).get('product_name') ? new URLSearchParams(window.location.search).get('product_name') :""}
                                required
                                onChange={handleChange}
                            />
                        </form>
                        </div>
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
                            <select 
                                value={category?.name} 
                                onChange={handleChangeCategory}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                            <option selected>Choose a category</option>
                            <RenderCategoryProduct categories={categoryProduct}/>
                            </select>
                        </div>
                        <button className={`flex flex-row items-center h-auto text-red-700 ${filter ? "" : "hidden"}`}
                            onClick={clearFilter}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} style={{color: "#ff0000",}} />
                            Clear filter
                        </button>
                    </div>
                    <div className="flex flex-col justify-self-center w-full align-middle items-center">
                        <Pagination 
                            onChangePagination={onChangePagination}
                            disabledPrev={Number(currentPage) === 1}
                             disabledNext={currentPage >= totalPage}
                        />
                    </div>                    

                </caption>
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Image
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Product Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">Add</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <RenderProductListForTransaction productList={listProduct} onAdd={() => setShow(true)}/>
                </tbody>
            </table>

            <div className="flex flex-col justify-self-center w-full align-middle items-center mt-5">
                <Pagination 
                    onChangePagination={onChangePagination}
                    disabledPrev={Number(currentPage) === 1}
                    disabledNext={currentPage >= totalPage}
                />
            </div>  
        </div>
    )
}

export default ProductListPage