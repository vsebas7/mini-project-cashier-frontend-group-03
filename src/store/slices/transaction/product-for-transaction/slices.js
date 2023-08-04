import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../../utils/api.instance"
import Toast from "react-hot-toast"

export const getProduct = createAsyncThunk(
    "product/list",

    async (payload, {rejectWithValue}) => {
        try {
            const { page, product_name, id_cat, sort_price, sort_name} = payload

            const PARAMETER = `?page=${page}&product_name=${product_name}&id_cat=${id_cat}&sort_price=${sort_price}&sort_name=${sort_name}`

            const { data } = await api.get("product" + encodeURI(PARAMETER))

            if(page > 1 || product_name || id_cat || sort_price || sort_name){
                window.history.replaceState({}, null, ("http://localhost:3000/transaction/" + `?page=${page}&product_name=${product_name}&id_cat=${id_cat}&sort_price=${sort_price}&sort_name=${sort_name}`));
            }else{
                window.history.replaceState({}, null, ("http://localhost:3000/transaction/"))
            }

            Toast.success(data.message)

            return data.product
        } catch (error) {
            Toast.error(error.response.data.message)

            return rejectWithValue(error.response.data.message)
        }
    }
)

export const getProductDetail = createAsyncThunk(
    "product/detail",

    async (payload, {rejectWithValue}) => {
        try {
            const {data} = await api.get("product/" + encodeURI(payload))

            return data.product
        } catch (error) {
            Toast.error(error.response.data.message)
            
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const addProduct = createAsyncThunk(
    "product/addProduct",

    async (payload, {rejectWithValue}) => {
        try {
            const {data} = await api.post("product",payload)

            Toast.success(data.message)

            return data
        } catch (error) {
            Toast.error(error.response.data.message)
            
            return rejectWithValue(error.response.data.message)
        }
    }
)

