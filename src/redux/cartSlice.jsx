import { createSlice } from '@reduxjs/toolkit'

const savedCart = localStorage.getItem('cart');
const initialState = savedCart ? JSON.parse(savedCart) : [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.push(action.payload)
        },
        deleteFromCart(state, action) {
            return state.filter(item => item.id != action.payload.id);
        },
        clearCart: () => {
            return [];
        }
    }
})

export const { addToCart, deleteFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer;