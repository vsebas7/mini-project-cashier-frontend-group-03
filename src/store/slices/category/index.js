import { createSlice } from "@reduxjs/toolkit";

import {
    getCategory,
    getCategoryWithParentList,
    deleteCategory,
    getDetailCategory,
    changeDetailCategory,
    addNewCategory,
    defaultCategory
} from "./slices"

const INITIAL_STATE = {
    list : [],
    subcategory : [],
    detail : [],
    isGetCategoryLoading : false,
    isDeleteProductLoading : false,
    isGetDetailCategoryLoading : false,
    isChangeDetailCategoryLoading : false,
    isAddNewCategoryLoading : false,
    isDefault : false
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
                detail :[],
                isAddNewCategoryLoading : false,
                isGetCategoryLoading : false
            })
        },
        [getCategory.rejected] : (state, action) => {
            state.isGetCategoryLoading = false
        },
        [getCategoryWithParentList.pending] : (state, action) => {
            state.isGetCategoryLoading = true
        },
        [getCategoryWithParentList.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                subcategory : action.payload,
                isGetCategoryLoading : false,
            })
        },
        [getCategoryWithParentList.rejected] : (state, action) => {
            state.isGetCategoryLoading = false
        },
        [deleteCategory.pending] : (state, action) => {
            state.isDeleteProductLoading = true
        },
        [deleteCategory.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                subcategory : action.payload,
                isDeleteProductLoading : false
            })
        },
        [deleteCategory.rejected] : (state, action) => {
            state.isDeleteProductLoading = false
        },
        [getDetailCategory.pending] : (state, action) => {
            state.isGetDetailCategoryLoading = true
        },
        [getDetailCategory.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                detail : action.payload,
                isGetDetailCategoryLoading : true
            })
        },
        [getDetailCategory.rejected] : (state, action) => {
            state.isGetDetailCategoryLoading = true
        },
        [changeDetailCategory.pending] : (state, action) => {
            state.isChangeDetailCategoryLoading = true
        },
        [changeDetailCategory.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                detail : [],
                isChangeDetailCategoryLoading : false
            })
        },
        [changeDetailCategory.rejected] : (state, action) => {
            state.isChangeDetailCategoryLoading = false
        },
        [addNewCategory.pending] : (state, action) => {
            state.isAddNewCategoryLoading = true
        },
        [addNewCategory.fulfilled] : (state, action) => {
            state.isAddNewCategoryLoading = false
        },
        [addNewCategory.rejected] : (state, action) => {
            state.isAddNewCategoryLoading = false
        },
        [defaultCategory.pending] : (state, action) => {
            state.isDefault = true
        },
        [defaultCategory.fulfilled] : (state, action) => {
            state = Object.assign(state, INITIAL_STATE)
        },
        [defaultCategory.rejected] : (state, action) => {
            state.isDefault = false
        },
    }
})

export default productSlice.reducer