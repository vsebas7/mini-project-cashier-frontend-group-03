import { combineReducers } from "redux";
import cartSlice from "./cartSlice";
import transactionSlice from "./transactionSlice";

const rootReducer = combineReducers({
    cart: cartSlice.reducer,
    transaction: transactionSlice.reducer,
});

export default rootReducer;
