import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';

// Define the AuthState interface
export interface AuthState {
  user: { role: string | null; } | null;
  signUpRole: string | null;
}

// Define the RootState interface
export interface RootState {
  auth: AuthState; // Include the auth slice
  // Add other slices here as needed
}

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here
});

export default rootReducer;
