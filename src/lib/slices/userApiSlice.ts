import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie'; // You'll need to install this package

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dummyjson.com',
        prepareHeaders: (headers) => {
            // Get the token from cookies
            const token = Cookies.get('amh');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getCurrentUser: builder.query<User, void>({
            query: () => 'user/me',
        }),
        // ... other endpoints
    }),
});

export const { useGetCurrentUserQuery } = api;