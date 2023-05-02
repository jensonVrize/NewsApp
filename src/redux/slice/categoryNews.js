import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {APIs} from '../../constants';

export const fetchCategoryNews = createAsyncThunk(
  'fetchCategoryNews',
  async (params) => {
    const {category} = params;
    console.log(`createAsyncThunk: category: ${category}`);
    const categoryParam = (category != undefined && category != '' && category != null) ? `&category=${category}` : ''
    const response = await fetch(
        APIs.BASE_URL +
        'top-headlines?country=us&apiKey=' +
        APIs.API_KEY + categoryParam
    );
    console.log('fetchCategoryNews Request: ', response.url.toString());
    return response.json();
  },
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: builder => {
    builder.addCase(fetchCategoryNews.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategoryNews.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCategoryNews.rejected, (state, action) => {
      console.log('fetchCategoryNews Error: ', action);
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default newsSlice.reducer;
