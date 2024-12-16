import { Ticket } from '@/components/reusables/components/HelpDeskTicketsListTable';
import { CustomUser, ProjectValues } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';
export interface CeoState {
    employeesList: CustomUser[] | []
    clientAndVendorList: CustomUser[] | []
    allProjectsList: ProjectValues[] | []
    helpdeskTicketsList: Ticket[] | []
}





const initialState: CeoState = {
    employeesList: [],
    clientAndVendorList: [],
    allProjectsList: [],
    helpdeskTicketsList: [],
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
  },
});

export const { 
    setEmployeesList,
    setClientAndVendorList,
    setAllProjectsList,
    setHelpdeskTicketsList,
} = ceoSlice.actions;
export default ceoSlice.reducer;