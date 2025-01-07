import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import ceoReducer, { CeoState } from './slices/ceo';
import clientReducer,{ ClientState } from './slices/client';

// Define the AuthState interface
export interface AuthState {
  user: { role: string | null; } | null;
  signUpRole: string | null;
}

// Define the RootState interface
export interface RootState {
  auth: AuthState; // Include the auth slice
  ceo: CeoState;
  client: ClientState

  // Add other slices here as needed
}

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  ceo : ceoReducer,
  client : clientReducer
  // Add other reducers here
});



export default rootReducer;
