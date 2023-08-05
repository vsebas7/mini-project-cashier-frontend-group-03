import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { getProductFromLocalStorage } from "../../../pages/transaction/get-product-from-local/productUtils";

function ProductListForTransaction ({
    id = "",
    name = "",
    price = "",
    image = "",
    desc = "",
    onAdd = ()=>{}
}) {
    const dispatch = useDispatch()
    const [selectedProduct, setSelectedProduct] = useState(null)
    
    const addToCartIcon = <FontAwesomeIcon icon="fa-solid fa-cart-plus" />

    // const onButtonAdd = () => {
    //     const productToAdd = {
    //         id: id,
    //         name: name,
    //         price: price,
    //         qty: 1       
    //     }
    //     dispatch(addItemToCart(productToAdd))
    //     setSelectedProduct(productToAdd)
    //     onAdd(productToAdd)
    // }

    const onButtonAdd = () => {
        const productToAdd = {
            id: id,
            name: name,
            price: price,
            qty: 1       
        }

        // const productExists = JSON.parse(localStorage.getItem('products')) || [];
        // const updatedProducts = [...productExists, productToAdd];
        const updatedProducts = [...getProductFromLocalStorage(), productToAdd]
        localStorage.setItem('products', JSON.stringify(updatedProducts))

        setSelectedProduct(productToAdd)
        onAdd(productToAdd)
    }

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
                onClick={onButtonAdd}
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
                id= {productList.id}
                image= {productList.image}
                name= {productList.name}
                price= {productList.price}
                desc= {productList.description}
                onAdd= {onAdd}
            />
        )
    })
}

// export function getProductFromLocalStorage() {
//     const productExists = JSON.parse(localStorage.getItem('products')) || [];
//     return productExists;
//   }