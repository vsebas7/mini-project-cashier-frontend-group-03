import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import moment from "moment"

function ProcessingTransaction ({
    id = "",
    name = "",
    qty = 0,
    price = 0,
    onEdit = () => {},
    onDelete = () => {}
}) {
    const dispatch = useDispatch()

    const cartItems = useSelector((state) => state.cart.items)

    const totalPrice = cartItems.reduce (
        (total, item) => total + item.price * item.qty,
        0
    )

    // const [cartItems, setCartItems] = useState([])

    // const totalPrice = cartItems.reduce (
    //     (total, item) => total + item.price * item.qty,
    //     0
    // )

    // const handleAddItemToCart = (product) => {
    //     const itemExists = cartItems.find(item => item.id === product.id)

    //     if (itemExists) {
    //         setCartItems (
    //             cartItems.map(item => {
    //                 item.id = product.id ? {...item, qty: item.qty + 1} : item
    //             })
    //         )
    //     } else {
    //         setCartItems ([...cartItems, {...product, qty: 1}])
    //     }
    // }

    const today = moment().format('dddd, Do MMMM YYYY, h:mm:ss a')

    return (
        <tr key={id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">{id + 1}</td>
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
    cartItem = [],
    onEdit = () => {},
    onDelete = () => {}
}) {
    return cartItem.map((cartItem, index) => {
        return (
            <ProcessingTransaction key={cartItem.id}
                id={cartItem.id}
                name={cartItem.name}
                qty={cartItem.qty}
                price={cartItem.price}
                totalPrice={cartItem.totalPrice}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        )
    })
}