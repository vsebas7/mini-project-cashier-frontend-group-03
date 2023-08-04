import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import moment from "moment"
import { addItemToCart } from "../../../store/slices/transaction"
import ProductListForTransaction from "../list-product/index"

function ProcessingTransaction ({
    id = "",
    name = "",
    qty = 1,
    price = 0,
    onEdit = () => {},
    onDelete = () => {}
}) {
    const dispatch = useDispatch()

    const cartItems = useSelector((state) => state.cart)

    // const totalPrice = cartItems.reduce (
    //     (total, item) => total + item.price * item.qty,
    //     0
    // )

    const totalPrice = qty * price
    
    const today = moment().format('dddd, Do MMMM YYYY, h:mm:ss a')

    return (
        <tr key={id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">{id}</td>
            <td className="px-6 py-4">{name}</td>
            <td className="px-6 py-4">{qty}</td>
            <td className="px-6 py-4">{price}</td>
            <td className="px-6 py-4">{totalPrice}</td>
            <td class="px-6 py-4 text-right">
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Edit
                </a>
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Delete
                </a>
            </td>
        </tr>        
    )
}

export default function RenderProcessingTransaction ({
    cartItems = [],
    onEdit = () => {},
    onDelete = () => {}
}) {
    return cartItems.map((item, index) => {
        return (
            <ProcessingTransaction key={item.id}
                id={item.id}
                name={item.name}
                qty={item.qty}
                price={item.price}
                totalPrice={item.totalPrice}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        )
    })
}
