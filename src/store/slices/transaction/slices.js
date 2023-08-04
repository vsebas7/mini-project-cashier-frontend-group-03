import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../utils/api.instance"
import Toast from "react-hot-toast"
import product from "../product"

export const createNewTransaction = createAsyncThunk(
    "/transaction",

    async (payload, {rejectWithValue}) => {
        try {
            const {data} = await api.post("transaction", payload)

            Toast.success(data.message)

            return data
        } catch (error) {
            Toast.error(error.response.data.message)

            return rejectWithValue(error.response.data.message)
        }
    }
)

