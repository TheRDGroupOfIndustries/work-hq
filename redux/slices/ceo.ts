import { Ticket } from '@/components/reusables/components/HelpDeskTicketsListTable';
import { CustomUser, ProjectValues } from '@/lib/types';
import { PayrollHistory } from '@/types';
import { createSlice } from '@reduxjs/toolkit';



export interface CeoState {
    employeesList: CustomUser[] | []
    clientAndVendorList: CustomUser[] | []
    allProjectsList: ProjectValues[] | []
    helpdeskTicketsList: Ticket[] | []
    payrollHistoryList: PayrollHistory[] | []
}





const initialState: CeoState = {
    employeesList: [],
    clientAndVendorList: [],
    allProjectsList: [],
    helpdeskTicketsList: [],
    payrollHistoryList: []
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
    }
  },
});

export const { 
    setEmployeesList,
    setClientAndVendorList,
    setAllProjectsList,
    setHelpdeskTicketsList,
    setPayrollHistoryList
} = ceoSlice.actions;
export default ceoSlice.reducer;