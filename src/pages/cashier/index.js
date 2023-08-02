import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import RenderCashierListCard from "../../components/cashier/"
import { getCashier } from "../../store/slices/cashier/slices"
import RenderCashierDetailCard from "../../components/cashier/edit-cashier"

function ListCashierPage () {
    const dispatch = useDispatch()

    const { listCashier, detailCashier } = useSelector(state => {
        return {
            listCashier : state.cashier.list,
            detailCashier : state.cashier.detail,
        }
    })

    const [show,setShow] = useState(false)
    
    useEffect(() => {
		dispatch(getCashier())
	}, [])

    return (
        <div>
            <a className="flex items-center normal-case text-[20pt] pb-10">
                Cashier List
            </a>
            <div className="flex w-full ">
                <div className={`flex flex-row flex-wrap ${!show ? "" : "w-full gap-9"}`}>
                    <div className={`w-full  ${!show ? "hidden" :"fixed bg-slate-400 bg-opacity-50 pt-[250px] flex flex-col items-center right-0 z-40 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full"}`}></div>
                    <RenderCashierListCard cashierList={listCashier} onEdit={()=>{setShow(true)}} />
                </div>
                <div className={`w-full  ${!show ? "hidden" : "flex flex-grow z-50 mt-[-50px]"}`}>
                    <RenderCashierDetailCard cashierDetail={detailCashier} onButtonCancel={()=>{setShow(false)}}/>
                </div>
            </div>
        </div>
    )
}

export default ListCashierPage