import { createSlice } from "@reduxjs/toolkit";

import { 
    getProduct, 
    getProductDetail, 
    addProduct 
} from "./slices.js"

const INITIAL_STATE = {
    list : [],
    detail : [],
    currentPage : "",
    totalPage : "",
    isGetProductLoading : false,
    isGetiDetailProductLoading : false,
    isAddProductLoading : false,
}

const productForTransactionSlice = createSlice({
    name : "product",
    initialState : INITIAL_STATE,
    reducers : {

    },
    extraReducers : {
        [getProduct.pending] : (state, action) => {
            state.isGetProductLoading = true
        },
        [getProduct.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                list : action.payload.list,
                detail : [],
                currentPage : action.payload.current_page,
                totalPage : action.payload.total_pages,
                isGetProductLoading : false
            })
        },
        [getProduct.rejected] : (state, action) => {
            state.isGetProductLoading = false
        },
        [getProductDetail.pending] : (state, action) => {
            state.isGetiDetailProductLoading = true
        },
        [getProductDetail.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                detail : action.payload,
                isGetiDetailProductLoading : false
            })
        },
        [getProductDetail.rejected] : (state, action) => {
            state.isGetiDetailProductLoading = false
        },
        [addProduct.pending] : (state, action) => {
            state.isAddProductLoading = true
        },
        [addProduct.fulfilled] : (state, action) => {
            state.isAddProductLoading = false
        },
        [addProduct.rejected] : (state, action) => {
            state.isAddProductLoading = false
        },
    }
})

export default productForTransactionSlice.reducer