import { createSlice } from "@reduxjs/toolkit";

import {
    getProduct,
    getProductDetail,
    addProduct,
    deleteProduct,
    editProductDetail,
    editProductImage
} from "./slices"

const INITIAL_STATE = {
    list : [],
    detail : [],
    currentPage : "",
    totalPage : "",
    isGetProductLoading : false,
    isGetiDetailProductLoading : false,
    isAddProductLoading : false,
    isDeleteProductLoading : false,
    isEditProductLoading : false,
    isEditImageLoading : false
}

const productSlice = createSlice({
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
        [deleteProduct.pending] : (state, action) => {
            state.isDeleteProductLoading = true
        },
        [deleteProduct.fulfilled] : (state, action) => {
            state.isDeleteProductLoading = false
        },
        [deleteProduct.rejected] : (state, action) => {
            state.isDeleteProductLoading = false
        },
        [editProductDetail.pending] : (state, action) => {
            state.isEditProductLoading = true
        },
        [editProductDetail.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                list : action.payload.product.list,
                isEditProductLoading : false
            })
        },
        [editProductDetail.rejected] : (state, action) => {
            state.isEditProductLoading = false
        },        
        [editProductImage.pending] : (state, action) => {
            state.isEditImageLoading = true
        },
        [editProductImage.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                list : action.payload.newResponseData.data.product.list,
                isEditImageLoading : false
            })
        },
        [editProductImage.rejected] : (state, action) => {
            state.isEditImageLoading = false
        },
    }
})

export default productSlice.reducer