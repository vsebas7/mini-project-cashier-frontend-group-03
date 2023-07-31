import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../utils/api.instance"
import Toast from "react-hot-toast"

export const getCategory = createAsyncThunk(
    "category/list",

    async (payload, {rejectWithValue}) => {
        try {
            const { data } = await api.get("category/")

            return data.category
        } catch (error) {
            Toast.error(error.response.data.message)

            return rejectWithValue(error.response.data.message)
        }
    }
)

export const getCategoryWithParentList = createAsyncThunk(
    "category/with-parent-list",

    async (payload, {rejectWithValue}) => {
        try {
            const { data } = await api.get("category/all-with-parent-list")
            
            if(window.location.pathname !== "/category") {
                Toast.success(data.message)
            }

            return data.category
        } catch (error) {
            Toast.error(error.response.data.message)

            return rejectWithValue(error.response.data.message)
        }
    }
)

export const deleteCategory = createAsyncThunk(
    "category/delete",

    async (payload, {rejectWithValue}) => {
        try {
            const response = await api.patch("category/"+ encodeURI(payload))

            const {data} = await api.get("category/all-with-parent-list")
            
            Toast.success(response.data.message)

            return data.category
        } catch (error) {
            Toast.error(error.response.data.message)

            return rejectWithValue(error.response.data.message)
        }
    }
)

export const getDetailCategory = createAsyncThunk(
    "category/detail",

    async(payload, {rejectWithValue}) =>{
        try {
            const {data} = await api.get("category/subcategory?categoryId="+ encodeURI(payload))

            if(window.location.pathname !== "/category") {
                Toast.success(data.message)
            }

            return data.category
        } catch (error){
            if(window.location.pathname !== "/category") {
                Toast.error(error.response.data.message)
            }

            return rejectWithValue(error.response.data.message)
        }
    }
)

export const changeDetailCategory = createAsyncThunk(
    "category/change-detail",

    async(payload, {rejectWithValue}) =>{
        try {
            const {data} = await api.patch("category/change-category-details/"+ encodeURI(payload.category_id), payload.data)

            Toast.success(data.message)

            return data.category
        } catch (error){
            Toast.error(error.response.data.message)

            return rejectWithValue(error.response.data.message)
        }
    }
)

export const addNewCategory = createAsyncThunk (
    "category/add-new",

    async(payload, {rejectWithValue}) => {
        try {
            const {data} = await api.post("category/",payload)
            
            Toast.success(data.message)

            return data
        } catch (error) {
            Toast.error(error.response.data.message)

            return rejectWithValue(error.response.data.message)
        }
    }
)


export const defaultCategory = createAsyncThunk (
    "category/default",

    async(payload, {rejectWithValue}) => {
        try {
            
        } catch (error) {
            
        }
    }
)