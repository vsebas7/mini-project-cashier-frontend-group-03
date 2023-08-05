// export const calculateTotalPrice = (cartItems) => {
//     const totalPrice = cartItems.reduce((total, item) => {
//         return total + item.price * item.qty;
//     }, 0);
  
//     return totalPrice;
// };

// tidak dipakai
import { useState } from "react";
import RenderProductListForTransaction from "path/to/RenderProductListForTransaction";
import RenderProcessingTransaction from "path/to/RenderProcessingTransaction";

function YourTransactionPage() {
    const [cartItems, setCartItems] = useState([]);

    const handleAddToCart = (product) => {
        setCartItems((prevCartItems) => [...prevCartItems, product]);
    };

    return (
        <div>
        <RenderProductListForTransaction
            productList={yourProductListData} 
            onAdd={handleAddToCart}
        />

        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total Price</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <RenderProcessingTransaction cart={cartItems} />
            </tbody>
        </table>
        </div>
    );
}
