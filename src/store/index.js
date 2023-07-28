import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/auth"
import cashierReducer from "./slices/cashier"
import productReducer from "./slices/product"
import categoryReducer from "./slices/category"

const store = configureStore({
    reducer : {
        auth : authReducer,
        cashier : cashierReducer,
        product : productReducer,
        category : categoryReducer
    },
})

export default store