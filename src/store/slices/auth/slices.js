import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance"
import Toast from "react-hot-toast";

export const login = createAsyncThunk(
    "auth/admin/login",
     
    async (payload, { rejectWithValue }) => {
        try {
            const response = await api.post("auth/login", payload)

            const {data} = response

            const token = response.headers.authorization.split(" ")[1]

            localStorage.setItem("token", token)

            Toast.success("Login Sucess")

            return data
        } catch (error) {
            Toast.error(error.response?.data?.message)

            return rejectWithValue(error.response?.data?.message)
        }
    }
)

export const logout = createAsyncThunk(
    "",
    async (payload, { rejectWithValue }) => {
        try {
            localStorage.removeItem("token")

            Toast.success("Logout Sucess")
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error)
        }
    }
)

export const keepLogin = createAsyncThunk (
    "auth/admin/keep-login",

    async (payload, { rejectWithValue }) =>{
        try {
            const {data} = await api.get("/auth/keep-login")

            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const forgotPassword = createAsyncThunk (
    "auth/admin/forgot-password",

    async (payload, {rejectWithValue}) => {
        try {
            const {data} = await api.put("auth/forgot-password", payload)

            Toast.success(data.message)
            
            return data
        } catch (error) {
            Toast.error(error.response.data.message)
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const resetPassword = createAsyncThunk (
    "auth/admin/reset-password",
    
    async (payload, {rejectWithValue}) => {
        try {
            const token = window.location.pathname.toString().replace('/reset-password/',"")
            
            localStorage.setItem("token", token)

            const {data} = await api.patch("auth/reset-password",payload)

            Toast.success(data.message)

        } catch (error) {
            Toast.error(error.response.data.message)
            return rejectWithValue(error.response.data.message)
        }
    }
)