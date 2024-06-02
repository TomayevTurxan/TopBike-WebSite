import { createSlice } from "@reduxjs/toolkit"

const currentWishlist = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : []

const initialState = {
    value: currentWishlist
}

export const WishlistSlice = createSlice({
    name: "wihslist",
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const foundProduct = state.value.find(item => item._id === action.payload._id);
            if (foundProduct) {
                state.value = state.value.filter(item => item._id !== action.payload._id)
                return
            }
            state.value.push(action.payload);
        },
        removeProduct: (state, action) => {
            state.value = state.value.filter(item => item._id !== action.payload._id)
        }
    }
})
export const { addToWishlist, removeProduct } = WishlistSlice.actions
export default WishlistSlice.reducer