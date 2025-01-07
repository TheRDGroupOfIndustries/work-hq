
import { PaymentInfoValues } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';

export interface ClientState {


    // Payment
    paymentInfoValues: PaymentInfoValues | null
}







const initialState: ClientState =  {
    // Dashboard Page
    paymentInfoValues: null

};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
  },
});

export const { 

} = clientSlice.actions;
export default clientSlice.reducer;