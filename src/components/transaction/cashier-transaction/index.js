import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { incrementQuantity, decrementQuantity, removeItem } from "../../../store/slices/transaction";
import { getProductFromLocalStorage } from "../get-product-from-local/productUtils"; 

function ProcessingTransaction({
    id = "",
    name = "",
    qty = 1,
    price = 0,
    onDelete = () => {},
}) {
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.cart)

    const totalPrice = qty * price

    // const totalPrice = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

    const today = moment().format("dddd, Do MMMM YYYY, h:mm:ss a");



    return (
        <tr key={id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">{name}</td>
            <td className="px-6 py-4">{price}</td>
            <td className="px-6 py-4">
                <div className="flex gap-2 items-center justify-center">
                    <button className="flex items-center justify-center bg-slate-200 border rounded-full w-6 h-6"
                        onClick={() => dispatch(decrementQuantity(id))}
                    >
                        -
                    </button>
                    {qty}
                    <button className="flex items-center justify-center bg-slate-200 border rounded-full w-6 h-6"
                    o   nClick={() => dispatch(incrementQuantity(id))}
                    >
                        +
                    </button>  
                </div>
            </td>
            <td className="px-6 py-4">{totalPrice}
            </td>
            <td class="px-6 py-4 text-right">
                <button class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={() => dispatch(removeItem(id))}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}

export default function RenderProcessingTransaction({
    productList = [],
    cart = [],
    onEdit = () => {},
    onDelete = () => {},
}) {
    return productList.map((productList, index) => {
        const isInCart = cart.some((item) => item.id === productList.id)
        return (
            <ProcessingTransaction
                key={productList.id}
                id={productList.id}
                image={productList.image}
                name={productList.name}
                price={productList.price}
                desc={productList.description}
                isInCart={isInCart}
            />
        )
    })
}
