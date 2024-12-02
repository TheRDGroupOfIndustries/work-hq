import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../rootReducer';

const initialState: AuthState = {
  user: null,
  signUpRole: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ role: string } | null>) {
      state.user = action.payload ? { role: action.payload.role } : null;
    },
    setSignUpRole(state, action: PayloadAction<string | null>) {
      state.signUpRole = action.payload; // This can now be a string or null
    },
  },
});

export const { setUser , setSignUpRole} = authSlice.actions;
export default authSlice.reducer;