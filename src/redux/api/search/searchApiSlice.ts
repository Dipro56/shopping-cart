// src/services/apiSlice.ts
import { baseUrl } from '@/utils/config/baseUrl';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the API slice
export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    searchedProducts: builder.query({
      query: ({ query, order }) => {
        // Construct the query parameters
        let url = '/products/search?limit=200';

        if (query && !order) {
          url += `&q=${query}`;
        } else if (!query && order) {
          url += `&sortBy=price&order=${order}`;
        } else if (query && order) {
          url += `&q=${query}&sortBy=price&order=${order}`;
        } else {
          url += `&sortBy=price`;
        }

        return url;
      },
    }),
  }),
});

export const { useSearchedProductsQuery } = searchApi;
