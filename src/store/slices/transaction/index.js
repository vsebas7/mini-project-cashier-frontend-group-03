// import { createSlice } from "@reduxjs/toolkit"

// import {} from "./slices"

// const INITIAL_STATE = {
//     cartItems : []
// }

// const addItemToCartSlice = createSlice({
//     name: "addItemToCart",
//     initialState: INITIAL_STATE,
//     reducers: {
//         addItemToCart: (state, action) => {
//             const {id, name, price } = action.payload

//             const itemExists = state.cartItems.find(item => item.id === id)

//             if (itemExists) {
//                 itemExists.qty += 1
//             } else {
//                 state.cartItems.push({
//                     id,
//                     name,
//                     price,
//                     qty: 1
//                 })
//             }
//         }
//     },

    
// })

// export const { addItemToCart } = addItemToCartSlice.actions
// export default addItemToCartSlice.reducer