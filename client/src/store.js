import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./reduxSlice/basketSlice";
import wishlistReducer from "./reduxSlice/wishlistSlice";

export const store = configureStore({
    reducer: {
        basket: basketReducer,
        wishlist: wishlistReducer
    }
})