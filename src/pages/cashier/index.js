import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import RenderCashierListCard from "../../components/cashier/"
import { getCashier } from "../../store/slices/cashier/slices"
import RenderCashierDetailCard from "../../components/cashier/edit-cashier"
function ListCashierPage () {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { listCashier, detailCashier } = useSelector(state => {
        return {
            listCashier : state.cashier.list,
            detailCashier : state.cashier.detail,
        }
    })
    
    useEffect(() => {
		dispatch(getCashier())
	}, [])

    return (
        <div>
            <a className="flex items-center normal-case text-[20pt] pb-10">
                Cashier List
            </a>
            <div className="flex w-full ">
                <div className={`flex flex-row flex-wrap ${detailCashier.length ? "opacity-20" : ""}`}>
                    <RenderCashierListCard cashierList={listCashier} />
                </div>
                <div className={`w-full  ${!detailCashier.length ? "hidden" : ""}`}>
                    <RenderCashierDetailCard cashierDetail={detailCashier}/>
                </div>
            </div>
        </div>
    )
}

export default ListCashierPage