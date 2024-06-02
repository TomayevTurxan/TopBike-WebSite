import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: '',
    isModalOpen: false,
    isOpen: false,
}


export const BasketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isModalOpen = action.payload
        },
        addId: (state, action) => {
            state.id = action.payload
        },
        openBasket: (state, action) => {
            state.isOpen = action.payload
        }
    }
})
export const { openBasket, openModal, addId } = BasketSlice.actions
export default BasketSlice.reducer