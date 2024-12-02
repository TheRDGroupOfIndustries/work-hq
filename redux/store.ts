import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Import your root reducer

const store = configureStore({
  reducer: rootReducer,
  // Optional: Add middleware, devTools, etc.
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export default store;

