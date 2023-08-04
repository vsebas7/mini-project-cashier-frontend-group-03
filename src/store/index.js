import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/auth"
import cashierReducer from "./slices/cashier"
import productReducer from "./slices/product"
import categoryReducer from "./slices/category"
import reportReducer from "./slices/report"
import cartReducer from "./slices/transaction"
import transactionReducer from "./slices/transaction"
import combinedTransactionReducer from "./slices/transaction"
import productForTransactionReducer from "./slices/transaction/product-for-transaction"

const store = configureStore({
    reducer : {
        auth : authReducer,
        cashier : cashierReducer,
        product : productReducer,
        category : categoryReducer,
        report : reportReducer,
        cart: cartReducer,
        transaction: transactionReducer,
        combinedTransaction: combinedTransactionReducer,
        productForTransaction: productForTransactionReducer
    },
})

export default store