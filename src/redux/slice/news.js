import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {APIs} from '../../constants';

export const fetchNews = createAsyncThunk(
  'fetchNews',
  async (params) => {
    const {category, isSearch, searchQuery} = params;
    console.log(`createAsyncThunk: category: ${category} isSearch: ${isSearch} searchQuery: ${searchQuery}`);
    const categoryParam = (category != undefined && category != '' && category != null) ? `&category=${category}` : ''
    const response = await fetch(
      isSearch == true
        ? APIs.BASE_URL +
            'everything?apiKey=' +
            APIs.API_KEY + '&q=' + searchQuery
        : APIs.BASE_URL +
            'top-headlines?country=in&apiKey=' +
            APIs.API_KEY,
    );
    console.log('Request: ', response.url.toString());
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
    builder.addCase(fetchNews.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchNews.rejected, (state, action) => {
      console.log('Fetch news Error: ', action);
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default newsSlice.reducer;
