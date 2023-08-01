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

            console.log(filter_date)
            
            const PARAMETER = pagination + `${startFrom ? filter_date : ""}`

            const { data } = await api.get("report" + encodeURI(PARAMETER))

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