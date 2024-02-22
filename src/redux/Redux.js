import { createSlice } from '@reduxjs/toolkit';
import { useAuth } from '../context/auth';

export const initialState = {
    searchdata: [],
    isSearching: false,
    cartCount: localStorage.getItem('cartCount') || 0
};

export const productSearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchData: (state, action) => {
            state.searchdata = action.payload;
        },
        setIsSearching: (state, action) => {
            state.isSearching = action.payload;
        },
        setIncrementCartCount: (state, action) => {
            state.cartCount = action.payload;
        },

    },
});

export const PathAction = productSearchSlice.actions;
export const selectIsSearching = (state) => state.search.isSearching;
export const selectSearchData = (state) => state.search.searchdata;
export const selectCartCount = (state) => state.search.cartCount;

export default productSearchSlice.reducer;
