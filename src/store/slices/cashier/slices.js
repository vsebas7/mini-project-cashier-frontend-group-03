import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance"
import Toast from "react-hot-toast";

export const getCashier = createAsyncThunk (
    "auth/admin/cashier",
    
    async (payload, {rejectWithValue}) => {
        try {
            const {data} = await api.get("auth/admin/cashier",payload)

            Toast.success(data.message)

            return data.cashier
        } catch (error) {
            Toast.error(error.response.data.message)

            return rejectWithValue(error.response.data.message)
        }
    }
)

export const getCashierDetail = createAsyncThunk (
    "auth/admin/cashier/detail",
    
    async (payload, {rejectWithValue}) => {
        try {
            const {data} = await api.get("auth/admin/cashier/" + encodeURI(payload))

            return data.cashier
        } catch (error) {
            Toast.error(error.response.data.message)

            return rejectWithValue(error.response.data.message)
        }
    }
)

export const registerCashier = createAsyncThunk (
    "auth/admin/cashier/register",
    
    async (payload, {rejectWithValue}) => {
        try {
            const {data} = await api.post("auth/admin/cashier/register",payload)

            Toast.success(data.message)

            return data
        } catch (error) {
            Toast.error(error.response?.data?.message)

            return rejectWithValue(error.response?.data?.message)
        }
    }
)

export const deactiveCashier = createAsyncThunk (
    "",
    
    async (payload, {rejectWithValue}) => {
        try {
            const {data} = await api.patch("auth/admin/cashier",payload)

            Toast.success(data.message)

        } catch (error) {
            Toast.error(error.response?.data?.message)
            return rejectWithValue(error.response?.data?.message)
        }
    }
)