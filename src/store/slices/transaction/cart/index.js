import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import {
    addToCart,
    createNewTransaction
} from "../../transaction/transaction/slices.js"

const INITIAL_STATE = {
    isCreateTransactionLoading : false,
    isAddToCartLoading : false
}

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: []
    },
    reducers: {
        addItemToCart: (state, action) => {
            const { id, name, price, qty } = state.payload;
            const itemInCart = action.cart.find(
                (item) => item.id === action.payload.id
            )

            if (itemInCart) {
                itemInCart.qty += qty;
            } else {
                state.cart.push({ id, name, price, qty });
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.cart.find(
                (item) => item.id === action.payload
            )
            item.qty++
        },
        decrementQuantity: (state, action) => {
            const item = state.cart.find(
                (item => item.id === action.payload)
            )
            if (item.qty === 1) {
                item.qty = 1
            } else {
                item.qty--
            }
        },
        removeItem: (state, action) => {
            const removeItem = state.cart.filter(
                (item) => item.id !== action.payload
            )
            state.cart = removeItem
        }
    },
    extraReducers : {
        [addToCart.pending] : (state, action) => {
            state.isAddToCartLoading = true
        },
        [addToCart.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                list_cart : action.payload,
                isAddToCartLoading : false
            })
        },
        [addToCart.rejected] : (state, action) => {
            state.isAddToCartLoading = false
        }
    }
})

export const { 
    addItemToCart,
    incrementQuantity,
    decrementQuantity,
    removeItem 
} = cartSlice.actions

export default cartSlice.reducer
