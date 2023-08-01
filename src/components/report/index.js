import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { getReportDetail } from "../../store/slices/report/slices";
import RenderReportDetailCard from "./detail-report";

function ReportListCard ({
    id = "",
    invoice = "",
    total_price = "",
    created_at ="",
    show = "",
    onShow =()=>{},
    onHide =()=>{},
}) {
    const dispatch = useDispatch()

    const navigate = useNavigate()  

    const { reportDetail } = useSelector(state => {
        return {
            reportDetail : state.report.detail
        }
    })

    const onButtonDetail = () => {
        dispatch(
            getReportDetail(id)
        )
        onShow()
    }

    const onButtonHide = () => {
        onHide()
    }

    return (
        <tbody>
            <tr class="bg-white text-left border-b bg-blue dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4  font-medium text-gray-900  dark:text-white">
                    {invoice}
                </th>
                <th scope="row" class="px-6 py-4  font-medium text-gray-900  dark:text-white">
                    {total_price}
                </th>
                <th scope="row" class="px-6 py-4  font-medium text-gray-900  dark:text-white">
                    {moment(created_at).format("DD-MM-Y HH:MM")}
                </th>
                <th scope="row" class="px-6 py-4  font-medium text-gray-900  dark:text-white">
                    <a 
                        onClick={onButtonDetail} 
                        class={`font-medium text-blue-600 dark:text-blue-500 hover:underline my-4 ${show ? "hidden" : ""}`}
                    >
                        Show Details
                    </a>
                    <a 
                        onClick={onButtonHide} 
                        class={`font-medium text-blue-600 dark:text-blue-500 hover:underline my-4 ${!show ? "hidden" : ""}`}
                    >
                        Hide Details
                    </a>
                </th>
            </tr>
            <div className={`ml-[30px] mr-[-500px] my-5 w-auto ${show ? "" : "hidden"}`}>
                <table class="text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 underline uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Product Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Qty
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Total Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <RenderReportDetailCard reportDetail={reportDetail} />
                    </tbody>
                </table>
            </div>
        </tbody>
    )
}

export default function RenderReportListCard ({
    reportList = []
}) {
    const [hide, setHide] = useState(null)
    return reportList.map((reportList, index) => {
        return (
            <ReportListCard key={reportList.id}
                id={reportList.id}
                invoice={reportList.invoice}
                total_price={reportList.total_price}
                created_at={reportList.created_at}
                show = {hide == reportList.id }
                onShow = {()=>{setHide(reportList.id)}}
                onHide = {()=>{setHide(null)}}
            />
        )
    })
}