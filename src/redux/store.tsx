import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { apiSlice } from "./apiSlice"; // RTK Query API Slice

export const store = configureStore({
  reducer: {
    auth: authReducer, // Auth state
    [apiSlice.reducerPath]: apiSlice.reducer, // RTK Query API reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Prevent errors with non-serializable values
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools only in dev mode
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
