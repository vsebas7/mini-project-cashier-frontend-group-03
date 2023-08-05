import { useEffect, useState, useRef, React } from "react"
import { useDispatch, useSelector } from "react-redux"
import RenderReportListCard from "../../components/report"
import { getAllReport, getReport } from "../../store/slices/report/slices"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import Pagination from "../../components/pagination"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from "moment/moment"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ListTransactionReportPage () {
    const dispatch = useDispatch()
    
    const { reportList, currentPage, totalPage, reportAll} = useSelector(state => {
        return {
            reportList : state.report.list.report,
            reportAll : state.report.all,
            currentPage : state.report.list.currentPage,
            totalPage : state.report.list.totalPage
        }
    })

    const startDateRef = useRef()
    const endDateRef = useRef()

    const [graph,setGraph] = useState(false)
    const [filter,setFilter] = useState(false)

    const onChangePagination = (type) => {
        dispatch(
            getReport({
                page:type === "prev" ? Number(currentPage) - 1 : Number(currentPage) + 1
            })
        )
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Total Sales',
            },
        },
    }

    const labels = reportAll?.map((item)=> {
        return moment(item.tanggal).format("DD-MM-Y")
    })
    
    
    const data = {
        labels,
        datasets: [
            {
                label: 'Total Sales',
                data: reportAll?.map((item)=> {return Number(item.total)}),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    }
    
    const onButtonFilter = () => {
        dispatch(
            getReport({
                startFrom : !startDateRef.current.value ? moment().format("YYYY-MM-DD") : startDateRef.current.value,
                endFrom : !endDateRef.current.value ? moment().format("YYYY-MM-DD") : endDateRef.current.value
            })
        )
        dispatch(getAllReport({
                startFrom : startDateRef.current.value ? moment().format("YYYY-MM-DD") : startDateRef.current.value,
                endFrom : !endDateRef.current.value ? moment().format("YYYY-MM-DD") : endDateRef.current.value,
            }))
        setFilter(true)
    }


    const onButtonGraph = () => {
        setGraph(true)
        dispatch(
            getAllReport({
                startFrom : startDateRef.current.value,
                endFrom : endDateRef.current.value ,
            })
        )
    }
    
    const onButtonHide =() =>{
        setGraph(false)
    }

    const clearFilter = () => {
        window.history.replaceState({}, null, ("http://localhost:3000/report"))
        startDateRef.current.value = ""
        endDateRef.current.value = ""
        dispatch(
            getReport({
                page : 1
            })
        )
        dispatch(
            getAllReport({
                startFrom : startDateRef.current.value,
                endFrom : endDateRef.current.value,
            })
        )
        setFilter(false)
    }

    useEffect(() => {
        if(!window.location.search){
            dispatch(
                getReport({
                    page : 1
                })
            )
        }else {
            window.history.pushState({},null,window.location.href)
            dispatch(
                getReport({
                    page:new URLSearchParams(window.location.search).get('page'), 
                    startFrom:new URLSearchParams(window.location.search).get('startFrom'), 
                    endFrom:new URLSearchParams(window.location.search).get('endFrom'), 
                })
            )
        }
	}, [])

    return (
        <div>
            <div className="pb-10">
                <a className="flex items-center normal-case text-[20pt] pb-3">
                    Report Transaction
                </a>
                
                <div class="flex items-center pb-5">
                    <span class="mx-4 text-gray-500">from</span>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                            </svg>
                        </div>
                        <input 
                            name="start" 
                            type="date" 
                            defaultValue={new URLSearchParams(window.location.search).get('startFrom')?new URLSearchParams(window.location.search).get('startFrom'):""}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            ref={startDateRef}
                        />
                        
                    </div>
                    <span class="mx-4 text-gray-500">to</span>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                            </svg>
                        </div>
                        <input 
                            name="end" 
                            type="date" 
                            defaultValue={new URLSearchParams(window.location.search).get('endFrom')?new URLSearchParams(window.location.search).get('endFrom'):""}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            ref={endDateRef}
                        />
                    </div>
                    <button 
                        type="button" 
                        class="mx-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        disabled ={startDateRef.current?.value && endDateRef.current?.value}
                        onClick={onButtonFilter}

                    >
                        Filter
                        <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </button>
                    <button className={`flex flex-row items-center h-auto text-red-700 ${filter ? "" : "hidden"}`}
                        onClick={clearFilter} 
                    >
                        <FontAwesomeIcon icon={faCircleXmark} style={{color: "#ff0000",}} />
                        Clear filter
                    </button>

                </div>

                <div className="w-full">
                    <Pagination 
                        onChangePagination={onChangePagination}
                        disabledPrev={Number(currentPage) === 1}
                        disabledNext={currentPage >= totalPage}
                    />
                </div>

                <div class="my-10 mr-20 w-full  shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Invoice Number
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Total Price
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Time
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <RenderReportListCard reportList={reportList} />
                    </table>
                </div>

                <button 
                    type="button" 
                    class={`${graph ? "hidden" : ""} mx-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                    onClick={onButtonGraph}

                >
                    Show Graph
                    <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </button>
                <button 
                    type="button" 
                    class={`${!graph ? "hidden" : ""} mx-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                    onClick={onButtonHide}

                >
                    Hide Graph
                    <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </button>
                <div className={`${graph ? "" : "hidden"}`}>
                    <Line options={options} data={data} />
                </div>
                
            </div>
        </div>
    )
}

export default ListTransactionReportPage