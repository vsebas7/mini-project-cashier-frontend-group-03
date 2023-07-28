import { createSlice } from "@reduxjs/toolkit";

import {
    getCategory,
    // getProductDetail,
    // addProduct,
    // deleteProduct
} from "./slices"

const INITIAL_STATE = {
    list : [],
    subcategory : [],
    isGetCategoryLoading : false
}

const productSlice = createSlice({
    name : "category",
    initialState : INITIAL_STATE,
    reducers : {

    },
    extraReducers : {
        [getCategory.pending] : (state, action) => {
            state.isGetCategoryLoading = true
        },
        [getCategory.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                list : action.payload,
                subcategory : [],
                isGetCategoryLoading : false
            })
        },
        [getCategory.rejected] : (state, action) => {
            state.isGetCategoryLoading = false
        },
        // [getProductDetail.pending] : (state, action) => {
        //     state.isGetiDetailProductLoading = true
        // },
        // [getProductDetail.fulfilled] : (state, action) => {
        //     state = Object.assign(state, {
        //         detail : action.payload,
        //         isGetiDetailProductLoading : false
        //     })
        // },
        // [getProductDetail.rejected] : (state, action) => {
        //     state.isGetiDetailProductLoading = false
        // },
        // [addProduct.pending] : (state, action) => {
        //     state.isAddProductLoading = true
        // },
        // [addProduct.fulfilled] : (state, action) => {
        //     state.isAddProductLoading = false
        // },
        // [addProduct.rejected] : (state, action) => {
        //     state.isAddProductLoading = false
        // },
        // [deleteProduct.pending] : (state, action) => {
        //     state.isDeleteProductLoading = true
        // },
        // [deleteProduct.fulfilled] : (state, action) => {
        //     state.isDeleteProductLoading = false
        // },
        // [deleteProduct.rejected] : (state, action) => {
        //     state.isDeleteProductLoading = false
        // },
    }
})

export default productSlice.reducer