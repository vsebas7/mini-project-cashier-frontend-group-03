import { createSlice } from "@reduxjs/toolkit";

import {
    getCashier,
    getCashierDetail,
    registerCashier,
    deactiveCashier
} from "./slices"

const INITIAL_STATE = {
    list: [],
    detail : [],
    isGetCashierLoading : false,
    isGetCashierDetailLoading : false,
    isRegisterCashierLoading : false,
    isDeactiveCashierLoading : false
}

const cashierSlice = createSlice({
    name : "cashier",
    initialState : INITIAL_STATE,
    reducers : {

    },
    extraReducers : {
        [getCashier.pending] : (state, action) => {
            state.isGetCashierLoading = true
        },
        [getCashier.fulfilled] : (state, action)=> {
            state = Object.assign(state, {
                list : action.payload,
                detail : [],
                isGetCashierLoading : false
            })
        },
        [getCashier.rejected] : (state, action) => {
            state.isGetCashierLoading = false
        }, 
        [getCashierDetail.pending] : (state, action) => {
            state.isGetCashierDetailLoading = true
        },
        [getCashierDetail.fulfilled] : (state, action)=> {
            state = Object.assign(state, {
                detail : action.payload,
                isGetCashierDetailLoading : false
            })
        },
        [getCashierDetail.rejected] : (state, action) => {
            state.isGetCashierDetailLoading = false
        }, 
        [registerCashier.pending] : (state, action) => {
            state.isRegisterCashierLoading = true
        },
        [registerCashier.fulfilled] : (state, action)=> {
            state.isRegisterCashierLoading = false
        },
        [registerCashier.rejected] : (state, action) => {
            state.isRegisterCashierLoading = false
        }, 
        [deactiveCashier.pending] : (state, action) => {
            state.isDeactiveCashierLoading = true
        },
        [deactiveCashier.fulfilled] : (state, action)=> {
            state.isDeactiveCashierLoading = false
        },
        [deactiveCashier.rejected] : (state, action) => {
            state.isDeactiveCashierLoading = false
        }
    }
})

export default cashierSlice.reducer