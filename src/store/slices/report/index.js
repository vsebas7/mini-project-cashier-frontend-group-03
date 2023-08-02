import { createSlice } from "@reduxjs/toolkit";

import {
    getReport,
    getReportDetail,
    getAllReport
} from "./slices"

const INITIAL_STATE = {
    list : [],
    detail : [],
    all : [],
    isGetReportLoading : false,
    isGetReportDetailLoading : false,
}

const reportSlice = createSlice({
    name : "report",
    initialState : INITIAL_STATE,
    reducers : {

    },
    extraReducers : {
        [getReport.pending] : (state, action) => {
            state.isGetReportLoading = true
        },
        [getReport.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                list : action.payload,
                isGetReportLoading : false
            })
        },
        [getReport.rejected] : (state, action) => {
            state.isGetReportLoading = false
        },
        [getAllReport.pending] : (state, action) => {
            state.isGetReportLoading = true
        },
        [getAllReport.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                all : action.payload,
                isGetReportLoading : false
            })
        },
        [getAllReport.rejected] : (state, action) => {
            state.isGetReportLoading = false
        },
        [getReportDetail.pending] : (state, action) => {
            state.isGetReportDetailLoading = true
        },
        [getReportDetail.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                detail : action.payload,
                isGetReportDetailLoading : false
            })
        },
        [getReportDetail.rejected] : (state, action) => {
            state.isGetReportDetailLoading = false
        },
    }
})

export default reportSlice.reducer