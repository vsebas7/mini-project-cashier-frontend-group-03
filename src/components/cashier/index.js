import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { deactiveCashier, getCashier, getCashierDetail } from "../../store/slices/cashier/slices"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import RenderCashierDetailCard from "./edit-cashier";

function CashierListCard ({
    id = "",
    username = "",
    email = "",
    image = "",
    status = "",
    onEdit = ()=>{}
}) {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [confirmation,deleteConfirm] = useState(false)

    const [modification,dataModified] = useState(false)

    const writeIcon = <FontAwesomeIcon icon={faPenToSquare} />

    const onButtonDelete = ()=>{
        dispatch(
            deactiveCashier(
                {
                    idCashier : id
                }
            )
        )
        dataModified(!modification)
    }

    useEffect(() => {
		dispatch(getCashier())
        dataModified(false)
	}, [modification,dataModified])

    const onButtonEdit = ()=>{
        dispatch(
            getCashierDetail(id),
        )
        onEdit()
    }

    return (
        <div className="flex flex-wrap gap-4 h-[100%] ">
            <div class={`
                 gap-4 p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mr-5 
                ${status === 0  ? "opacity-50" : ""}
            `}>
                <a href="#" >
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {username}
                    </h5>
                </a>
                <p class="text-left text-gray-500 dark:text-gray-400">
                    Status : {
                        (status === 1)
                        ? "Active"
                        : "Not-active"
                    }
                </p>

                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {email}
                </p>
                <div className={`
                    flex flex-row flex-wrap gap-4 justify-between
                    ${status === 0 ? "hidden" : ""}
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
                        Deactive
                    </button>
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
                                        Are you sure you want to deactive this product?
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
        </div>
    )
}

export default function RenderCashierListCard ({
    cashierList = [],
    onEdit = ()=>{}
}) {
    return cashierList.map((cashierList, index) => {
        return (
            <CashierListCard key={cashierList.id}
                id={cashierList.id}
                username={cashierList.username}
                image={cashierList.image}
                email = {cashierList.email}
                status = {cashierList.status}
                onEdit = {onEdit}
            />
        )
    })
}