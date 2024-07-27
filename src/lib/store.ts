import { configureStore } from '@reduxjs/toolkit'
import { api } from './slices/userApiSlice'
import cartReducer from './slices/./cartSlice'
// Make sure to import your API slice

export const makeStore = () => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      cart: cartReducer,
      // ... any other reducers you might have
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']