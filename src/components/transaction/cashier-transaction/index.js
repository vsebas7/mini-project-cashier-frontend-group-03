import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { incrementQuantity, decrementQuantity, removeItem } from "../../../store/slices/transaction";
import { getProductFromLocalStorage } from "../../../pages/transaction/get-product-from-local/productUtils"; 

function ProcessingTransaction({
    id = "",
    name = "",
    qty = 1,
    price = 0,
    onDelete = () => {},
}) {
    const dispatch = useDispatch();
    const [cartItems, setCartItems] = useState([])

    // const cartItems = useSelector((state) => state.cart.cart)

    useEffect(() => {
        const cartData = getProductFromLocalStorage()
        setCartItems(cartData)
    })

    // useEffect(() => {
    //     const cartData = JSON.parse(localStorage.getItem('products')) || [];
    //         setCartItems(cartData);
    // }, []);

    // const handleAddToCart = () => {
    //     onButtonAdd
    // }

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

    // const totalPrice = qty * price;

    const today = moment().format("dddd, Do MMMM YYYY, h:mm:ss a");



    return (
        <div>
        <tr key={id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">{id}</td>
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
        </div>
    );
}

export default function RenderProcessingTransaction({
    cartItem = [],
    productList = [],
    onDelete = () => {},
}) {
    return cartItem.map((item, index) => {
        return (
            <ProcessingTransaction
                key={item.id}
                id={item.id}
                name={item.name}
                qty={item.qty}
                price={item.price}
                totalPrice={item.totalPrice}
                onDelete={onDelete}
            />
        )
    })
}
