import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    isLoading: false,
    reviews: [],
};

export const addReview = createAsyncThunk(
    '/review/addReview',
    async(formdata) => {
        const response = await axios.post('http://localhost:5000/api/shop/review/add', formdata);
        return response.data;
    }
)

export const getReviews = createAsyncThunk(
    '/review/getReviews',
    async(id) => {
        const response = await axios.get(`http://localhost:5000/api/shop/review/${id}`);
        return response.data;
    }
)

const reviewSlice = createSlice({
    name: 'shopReviewSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getReviews.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getReviews.fulfilled, (state, action) => {
            state.isLoading = false;
            state.reviews = action.payload.data;
        })
        .addCase(getReviews.rejected, (state) => {
            state.isLoading = false;
            state.reviews = [];
        })
    }
})

export default reviewSlice.reducer;