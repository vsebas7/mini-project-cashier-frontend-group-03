import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addNewCategory, getCategoryWithParentList, getCategory, defaultCategory, getDetailCategory } from "../../../store/slices/category/slices"
import { RenderCategoryList } from "../../../components/category"
import RenderCategoryDetailCard from "../../../components/category/edit-category"

function ListCategoryPage () {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { categoryList, categoryDetail, editing} = useSelector(state => {
        return {
            categoryList : state.category.subcategory,
            categoryDetail : state.category.detail,
            editing : state.category.isGetDetailCategoryLoading,
        }
    })
    
    useEffect(() => {
        dispatch(getCategory())
        dispatch(getCategoryWithParentList())
	}, [])


    return (
        <div>
            <div className="pb-10">
                <a className="flex items-center normal-case text-[20pt] pb-3">
                    Category List
                </a>
                <button 
                    type="button" 
                    class="mb-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={()=> dispatch(getDetailCategory())}
                >
                    Add New Category
                    <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </button>
                <div class="mr-20  overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Category Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Subcategory
                                </th>
                                <th scope="col" class="px-6 py-3 text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <RenderCategoryList categories={categoryList} />
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={`w-full  ${categoryDetail.length || editing ? "flex flex-grow " : "hidden"}`}>
                <div 
                    id="popup-modal" 
                    class={`
                        fixed bg-slate-400 bg-opacity-50 pt-[250px] flex flex-col items-center right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full 
                        ${editing ? "" : "hidden"}
                    `}
                >
                    <RenderCategoryDetailCard categoryDetail={categoryDetail} />
                </div>
            </div>
        </div>
    )
}

export default ListCategoryPage