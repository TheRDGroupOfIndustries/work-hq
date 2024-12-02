import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInterface {
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  createdAt: string;
  avatar: {
    publicId: string;
    url: string;
  };
}
export interface Notication {
  _id: string;
  sender: {
    _id: string;
    fullName: string;
    userName: string;
  };
  receiver: {
    _id: string;
    fullName: string;
    userName: string;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface AuthSlice {
  forMobile: boolean;
  userStatus: boolean;
  userData: UserInterface | null;
  userNotification: Notication[];
}

const initialState: AuthSlice = {
  userStatus: false,
  userData: null,
  userNotification: [],
  forMobile: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user: UserInterface; notification: [] }>
    ) => {
      state.userStatus = true;
      state.userData = action.payload.user;
      state.userNotification = action.payload.notification;
    },

    setNotification: (
      state,
      action: PayloadAction<{ notification: Notication }>
    ) => {
      state.userNotification = [
        ...state.userNotification,
        action.payload.notification,
      ];
    },

    removeNotification: (state, action: PayloadAction<string>) => {
      state.userNotification = state.userNotification.filter(
        (item) => item._id !== action.payload
      );
    },
    logout: (state) => {
      state.userStatus = false;
      state.userData = null;
    },
    setForMobile: (state, action: PayloadAction<boolean>) => {
      state.forMobile = action.payload;
    },
  },
});

export const { login, logout, setForMobile, setNotification, removeNotification } =
  authSlice.actions;
export default authSlice.reducer;
