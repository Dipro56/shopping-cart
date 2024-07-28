import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './api/user/userApiSlice'; // Import userApi instead of api
import { searchApi } from './api/search/searchApiSlice'; // Import searchApi
import cartReducer from './features/cart/cartSlice';

// Configure the Redux store
export const makeStore = () => {
  return configureStore({
    reducer: {
      [userApi.reducerPath]: userApi.reducer, // Use userApi.reducerPath
      [searchApi.reducerPath]: searchApi.reducer, // Use searchApi.reducerPath
      cart: cartReducer,
      // ... any other reducers you might have
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(userApi.middleware) // Use userApi.middleware
        .concat(searchApi.middleware), // Use searchApi.middleware
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
