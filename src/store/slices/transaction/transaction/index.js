import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import {
    addToCart,
    createNewTransaction
} from "./slices.js"

const INITIAL_STATE = {
    isCreateTransactionLoading : false,
    isAddToCartLoading : false
}

const transactionSlice = createSlice({
    name : "transaction",
    initialState : INITIAL_STATE,
    reducers : {

    },

    extraReducers : {
        [createNewTransaction.pending] : (state, action) => {
            state.isCreateTransactionLoading = true
        },
        [createNewTransaction.fulfilled] : (state, action) => {
            state.isCreateTransactionLoading = false
        }
    }
})

export default transactionSlice.reducer