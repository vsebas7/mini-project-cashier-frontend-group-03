import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import RenderProcessingTransaction from "../../../components/transaction/cashier-transaction"
// import { calculateTotalPrice } from "../../../components/transaction/total-transaction"
// import { login } from "../../../store/slices/auth/slices"

function CashierTransactionRightPage () {
    const dispatch = useDispatch()

    // const { cart } = useSelector(state => state.cart)

    // const getTotalQuantity = () => {
    //     let total = 0
    //     cart.forEach(item => {
    //         total += item.qty
    //     })
    //     return total
    // }

    const { listProduct } = useSelector(state => {
        return {
            listProduct : state.product.list,
        }
    })

    const [show,setShow] = useState(false)


    // const cartItems = useSelector((state) => state.cart)
    
    // const totalPrice = calculateTotalPrice(cartItems)

	const { username } = useSelector(state => {
        return {
			username : state.auth.username
        }
    })

    const today = moment().format('dddd, Do MMMM YYYY, h:mm:ss a')

    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg max-w-screen-md flex-1">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <caption class="p-5 text-lg font-semibold text-gray-900 bg-white text-center dark:text-white dark:bg-gray-800">
                    Toko Hidup Makmur
                    <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                        Cashier {username} <br/>
                        {today}
                    </p>
                </caption>
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3 ">
                            No.
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" class="px-6 py-3 max-w-0">
                            Qty
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Each Price
                        </th>
                        <th scope="col" class="px-6 py-3 font-semibold">
                            Total Price
                        </th>
                        <th scope="col" class="px-6 py-3 w-4">
                            <span class="sr-only">Edit Delete</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <RenderProcessingTransaction productList={listProduct} onEdit={() => setShow(true)} onDelete={() => setShow(true)}/>
                </tbody>
                <thead class="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Total
                        </th>
                        <th scope="col" class="px-6 py-3">
                            
                        </th>
                        <th scope="col" class="px-6 py-3">
                            
                        </th>
                        <th scope="col" class="px-6 py-3 font-bold">
                            {/* menjumlahkan keseluruhan totalPrice */}
                            {/* {totalPrice} */}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            
                        </th>
                    </tr>
                </thead>
            </table>

            <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 mt-9 mb-9 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                Cancel Transaction
            </button>

            <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 mt-9 mb-9 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Bayar
            </button>
        </div>
    )
}

export default CashierTransactionRightPage