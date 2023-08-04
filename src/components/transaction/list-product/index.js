import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { addItemToCart } from "../../../store/slices/transaction/index"
import { getProductDetail } from "../../../store/slices/transaction/product-for-transaction/slices"

function ProductListForTransaction ({
    id = "",
    name = "",
    price = "",
    image = "",
    desc = "",
    onAdd = ()=>{}
}) {
    const dispatch = useDispatch()

    

    const [transaction, setTransaction] = useState([])
    

    const addToCartIcon = <FontAwesomeIcon icon="fa-solid fa-cart-plus" />

    // const onButtonAdd = ()=>{
    //     dispatch(
    //         getProductDetail(id, name, price),
    //     )
    //     onAdd()
    // }
    
    const navigate = useNavigate()
    // const onButtonAdd = () => {
    //     const product = {
    //         id: id,
    //         name: name,
    //         price: price
    //     };
    //     dispatch(addItemToCart(product));
    //     onAdd();
    // };

    // navigate("/transaction/")

    return (
        <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td className="px-6 py-4">
            <img 
                class="rounded-t-lg w-10 h-10" 
                src={"https://res.cloudinary.com/dpgk4f2eu/image/upload/f_auto,q_auto/v1/" + image} 
                alt="" 
            />
          </td>
          <td className="px-6 py-4">{name}</td>
          <td className="px-6 py-4">{price}</td>
          <td className="px-6 py-4">{desc}</td>
          <td className="px-6 py-4 text-right">            
            <a
                onClick={() =>
                    dispatch(addItemToCart({id, image, price}))
                }
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                {addToCartIcon}
                Add
            </a>
          </td>
        </tr>
    )
}

export default function RenderProductListForTransaction ({
    productList = [],
    onAdd = ()=>{}
}) {
    return productList.map((productList, index) => {
        return (
            <ProductListForTransaction key={productList.id}
                id={productList.id}
                image={productList.image}
                name={productList.name}
                price = {productList.price}
                desc = {productList.description}
                onAdd={onAdd}
            />
        )
    })
}