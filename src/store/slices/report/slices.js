import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../utils/api.instance"
import Toast from "react-hot-toast"

export const getReport = createAsyncThunk(
    "report/list",

    async (payload, {rejectWithValue}) => {
        try {
            const { page, startFrom, endFrom } = payload
            
            const pagination = `?page=${page ? page : 1 }`
            
            const filter_date = `&startFrom=${startFrom}&endFrom=${endFrom}`

            const PARAMETER = pagination + `${startFrom ? filter_date : ""}`

            const { data } = await api.get("report" + encodeURI(PARAMETER))

            if(page > 1 || startFrom || endFrom){
                window.history.replaceState({}, null, ("http://localhost:3000/report" + PARAMETER));
            }else{
                window.history.replaceState({}, null, ("http://localhost:3000/report"))
            }

            Toast.success(data.message)

            return data.report
        } catch (error) {
            Toast.error(error.response.data.message)

            return rejectWithValue(error.response.data.message)
        }
    }
)

export const getAllReport = createAsyncThunk(
    "report/all",

    async (payload, {rejectWithValue}) => {
        try {
            const { startFrom, endFrom } = payload

            const PARAMETER = `?startFrom=${startFrom}&endFrom=${endFrom}`

            const { data } = await api.get("report/all" + encodeURI(PARAMETER))

            Toast.success(data.message)

            return data.report
        } catch (error) {
            Toast.error(error.response.data.message)

            return rejectWithValue(error.response.data.message)
        }
    }
)

export const getReportDetail = createAsyncThunk(
    "report/detail",

    async (payload, {rejectWithValue}) => {
        try {
            const { data } = await api.get("report/" + encodeURI(payload) )

            Toast.success(data.message)

            return data.detail
        } catch (error) {
            Toast.error(error.response.data.message)

            return rejectWithValue(error.response.data.message)
        }
    }
)