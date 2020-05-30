import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  hasErrors: false,
  posts: [],
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (thunkAPI) => {
    const response = await fetch(
      'https://api.github.com/search/repositories?q=language:javascript+sort:stars'
    );
    const data = await response.json();
    return data.items;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.loading = true;
    },
    [fetchPosts.fulfilled]: (state, { payload }) => {
      state.posts = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    [fetchPosts.rejected]: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const postsSelector = (state) => state.posts;
export default postsSlice.reducer;
