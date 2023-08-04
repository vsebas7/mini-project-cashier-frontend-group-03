import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import {
    createNewTransaction
} from "./slices.js"

const INITIAL_STATE = {
    isCreateTransactionLoading : false
}

const transactionSlice = createSlice({
    name : "transaction",
    initialState : INITIAL_STATE,
    reducers : {

    },

    extraReducers : {
        [createNewTransaction.pending] : (state, action) => {
            state.isCreateTransactionLoading = true
        },
        [createNewTransaction.fulfilled] : (state, action) => {
            state.isCreateTransactionLoading = false
        }
    }
})

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: []
    },
    reducers: {
        addItemToCart: (state, action) => {
            // const { id, name, price } = action.payload;
            const itemInCart = state.items.find(
                (item) => item.id === action.payload.id
            )

            if (itemInCart) {
                itemInCart.qty++;
            } else {
                state.items.push({ ...action.payload, qty: 1 });
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.items.find(
                (item) => item.id === action.payload
            )
            item.qty++
        },
        decrementQuantity: (state, action) => {
            const item = state.items.find(
                (item => item.id === action.payload)
            )
            if (item.qty === 1) {
                item.qty = 1
            } else {
                item.qty--
            }
        },
        removeItem: (state, action) => {
            const removeItem = state.items.filter(
                (item) => item.id !== action.payload
            )
            state.items = removeItem
        }
    }
})

const combinedTransactionSlices = {
    cart: cartSlice.reducer,
    transaction: transactionSlice.reducer
}

export const { 
    addItemToCart,
    incrementQuantity,
    decrementQuantity,
    removeItem 
} = cartSlice.actions
export default combinedTransactionSlices

// export const generateInvoice = (transactionId) => {
//     const createdInvoice = moment().format('YYYYMMDD');
//     return `INV-${createdInvoice}${transactionId}`;
// };

// export const createTransaction = createAsyncThunk(
//     "transaction",

//     async (payload, { rejectWithValue }) => {
//         // const transaction = await db.sequelize.transaction();

//         try {
//             const { userId, total_price } = payload;

//             // Create a new transaction
//             const newTransaction = await Transaction.create(
//                 {
//                     invoice: generateInvoice(),
//                     created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
//                     userId: userId,
//                     total_price: total_price,
//                 },
//                 { transaction }
//             );

//             // Generate invoice based on the new transaction's id
//             const invoice = generateInvoice(newTransaction.id);

//             await newTransaction.update(
//                 {
//                     invoice: invoice,
//                 },
//                 { transaction }
//             );

//             await transaction.commit();

//             Toast.success("Transaction created successfully");

//             return newTransaction;
//         } catch (error) {
//             await transaction.rollback();
//             Toast.error(error.message);

//             return rejectWithValue(error.message);
//         }
//     }
// );

// export const addItemToCart = createAsyncThunk(
//     "transaction/cart",

//     async (payload, { rejectWithValue }) => {
//         const transaction = await api.post("transaction", payload)

//         try {
//             const { transactionId, productId, qty } = payload;

//             const productExists = await Product.findOne({
//                 where: {
//                     id: productId,
//                     status: 1,
//                 },
//             });

//             if (!productExists) {
//                 throw {
//                     type: "error",
//                     status: errorMiddleware.BAD_REQUEST_STATUS,
//                     message: "Produk tidak dapat ditemukan atau tidak tersedia",
//                 };
//             }

//             const total_price = productExists.price * qty;

//             await Items.create(
//                 {
//                     created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
//                     transactionId: transactionId,
//                     productId: productId,
//                     qty: qty,
//                     total_price: total_price,
//                 },
//                 { transaction }
//             );

//             await transaction.commit();

//             Toast.success(`${productExists.name} berhasil ditambahkan`);

//             return data;
//         } catch (error) {
//             Toast.error(error.message);

//             return rejectWithValue(error.message);
//         }
//     }
// );

// export const removeItemFromCart = createAsyncThunk(
//     "transaction/cart",

//     async (itemId, { rejectWithValue }) => {
//         const transaction = await db.sequelize.transaction();

//         try {
//             const cartItem = await Items.findByPk(itemId);

//             if (!cartItem) {
//                 throw {
//                     type: "error",
//                     status: errorMiddleware.NOT_FOUND_STATUS,
//                     message: "Produk tidak ditemukan",
//                 };
//             }

//             await cartItem.destroy({ transaction });

//             await transaction.commit();

//             Toast.success("Produk berhasil dihapus");
//         } catch (error) {
//             await transaction.rollback();
//             Toast.error(error.message);

//             return rejectWithValue(error.message);
//         }
//     }
// );

// export const updateItemInCart = createAsyncThunk(
//     "transaction/cart",

//     async ({ itemId, productId, qty }, { rejectWithValue }) => {
//         const transaction = await db.sequelize.transaction();

//         try {
//             const cartItem = await Items.findByPk(itemId);

//             if (!cartItem) {
//                 throw {
//                     type: "error",
//                     status: errorMiddleware.NOT_FOUND_STATUS,
//                     message: "Maaf, produk di keranjang tidak dapat ditemukan",
//                 };
//             }

//             const product = await Product.findByPk(productId);

//             if (!product) {
//                 throw {
//                     type: "error",
//                     status: errorMiddleware.BAD_REQUEST_STATUS,
//                     message: "Maaf, produk yang terkait sudah tidak ada",
//                 };
//             }

//             const total_price = product.price * qty;

//             await cartItem.update(
//                 {
//                     qty: qty,
//                     total_price: total_price,
//                 },
//                 { transaction }
//             );

//             await transaction.commit();

//             Toast.success("Keranjang berhasil diupdate");
//         } catch (error) {
//             await transaction.rollback();
//             Toast.error(error.message);

//             return rejectWithValue(error.message);
//         }
//     }
// );
