import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {APIs} from '../../constants';
import Globals from '../../helpers/Globals';

export const fetchCategoryNews = createAsyncThunk(
  'fetchCategoryNews',
  async params => {
    const {category} = params;
    console.log(`createAsyncThunk: category: ${category}`);
    const categoryParam =
      category != undefined && category != '' && category != null
        ? `&category=${category}`
        : '';
    const response = await fetch(
      APIs.BASE_URL +
        'top-headlines?country=' +
        Globals.NEWS_SOURCE_COUNTRY.code +
        '&apiKey=' +
        APIs.API_KEY +
        categoryParam,
    );
    console.log('fetchCategoryNews Request: ', response.url.toString());
    return response.json();
  },
);

const newsSlice = createSlice({
  name: 'CategoryNews',
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
