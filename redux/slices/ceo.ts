import { CustomUser, PaymentInfoValues, ProjectValues, TicketValues } from '@/lib/types';
import { PayrollHistory } from '@/types';
import { createSlice } from '@reduxjs/toolkit';



export interface CeoState {
    // Dashboard Page
    employeesList: CustomUser[] | []
    clientAndVendorList: CustomUser[] | []
    allProjectsList: ProjectValues[] | []
    helpdeskTicketsList: TicketValues[] | []
    payrollHistoryList: PayrollHistory[] | []

    // Payment
    paymentInfoValues: PaymentInfoValues | null
}





const initialState: CeoState = {
    // Dashboard Page
    employeesList: [],
    clientAndVendorList: [],
    allProjectsList: [],
    helpdeskTicketsList: [],
    payrollHistoryList: [],

    // Payment
    paymentInfoValues: null

};

const ceoSlice = createSlice({
  name: 'ceo',
  initialState,
  reducers: {
    setEmployeesList: (state, action) => {
      state.employeesList = action.payload;
    },
    setClientAndVendorList: (state, action) => {
      state.clientAndVendorList = action.payload;
    },
    setAllProjectsList: (state, action) => {
      state.allProjectsList = action.payload;
    },
    setHelpdeskTicketsList: (state, action) => {
      state.helpdeskTicketsList = action.payload;
    },
    setPayrollHistoryList: (state, action) => {
      state.payrollHistoryList = action.payload;
    },
    setPaymentInfoValues: (state, action) => {
      state.paymentInfoValues = action.payload;
    }
  },
});

export const { 
    setEmployeesList,
    setClientAndVendorList,
    setAllProjectsList,
    setHelpdeskTicketsList,
    setPayrollHistoryList,
    setPaymentInfoValues
} = ceoSlice.actions;
export default ceoSlice.reducer;