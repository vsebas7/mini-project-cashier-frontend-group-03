import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../utils/api.instance"
import Toast from "react-hot-toast"

export const getCategory = createAsyncThunk(
    "category/list",

    async (payload, {rejectWithValue}) => {
        try {
            const { data } = await api.get("category/")
            
            Toast.success(data.message)

            return data.category
        } catch (error) {
            Toast.error(error.response.data.message)

            return rejectWithValue(error.response.data.message)
        }
    }
)