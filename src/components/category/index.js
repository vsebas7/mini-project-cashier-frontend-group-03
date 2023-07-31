import { useState, useEffect } from "react"
import { deleteCategory, getCategoryWithParentList, getDetailCategory } from "../../store/slices/category/slices"
import { useDispatch } from "react-redux"


function CategoryProduct ({
    id = "",
    name = "",
}) {
    return (
        <option className={id.toString()} value={name}>{name}</option>
    )
}


export function RenderCategoryProduct ({
    categories = [],
}) {
    return categories.map((category, index) => {
        return (
            <CategoryProduct key={category.id}
                id={category.id}
                name={category.name}
            />
        )
    })
}

function CategoryList ({
    id = "",
    name = "",
    parent = ""
}) {
    const dispatch = useDispatch()

    const [confirmation,deleteConfirm] = useState(false)

    const [modification,dataModified] = useState(false)

    const onButtonDelete = ()=>{
        dispatch(deleteCategory(id))
        dataModified(!modification)
    }

    const onButtonEdit = ()=>{
        dispatch(
            getDetailCategory(id),
        )
    }

    return (
        <tr class="bg-white text-left border-b bg-blue dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" class="px-6 py-4  font-medium text-gray-900  dark:text-white">
                {name}
            </th>
            <th scope="row" class="px-6 py-4  font-medium text-gray-900  dark:text-white">
                {`${parent===name ? "-" : parent}`}
            </th>
            <th class="px-6 py-4 flex flex-row gap-10 justify-center">
                <a 
                    onClick={onButtonEdit} 
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                    Edit
                </a>
                <a 
                    onClick={()=>deleteConfirm(true)} 
                    class="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                    Delete
                </a>
            </th>
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
                                    Are you sure you want to delete this category?
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
        </tr>
    )
}

export function RenderCategoryList ({
    categories = [],
}) {
    return categories.map((category, index) => {
        return (
            <CategoryList key={category.id}
                id={category.id}
                name={category.name}
                parent={category.parent}
            />
        )
    })
}