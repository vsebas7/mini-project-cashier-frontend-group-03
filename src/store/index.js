import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/auth"
import cashierReducer from "./slices/cashier"
import productReducer from "./slices/product"
import categoryReducer from "./slices/category"
import reportReducer from "./slices/report"
import cartReducer from "./slices/transaction/cart"
import productForTransactionReducer from "./slices/transaction/product-for-transaction"
import transactionReducer from "./slices/transaction/transaction"

const store = configureStore({
    reducer : {
        auth : authReducer,
        cashier : cashierReducer,
        product : productReducer,
        category : categoryReducer,
        report : reportReducer,
        cart: cartReducer,
        productForTransaction: productForTransactionReducer,
        transaction: transactionReducer,
    },
})

export default store