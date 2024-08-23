import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/userTypes";

const initialState: Partial<IUser> = {
  id: undefined,
  email: "",
  token: localStorage.getItem("token") ?? "",
  refreshToken: localStorage.getItem("refresh") ?? "",
  commonError: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.id = action.payload;
    },
    setToken: (state, action) => {
      console.log(state.token);
      state.token = action.payload;
    },
    setRefresh: (state, action) => {
      state.refreshToken = action.payload;
      localStorage.setItem("refresh", action.payload);
    },
    setTokenError: (state) => {
      state.refreshToken = "";
      localStorage.removeItem("token");
    },
    setCommonError: (state, action) => {
      state.commonError = action.payload;
    },
  },
});
export const {
  setUserId,
  setToken,
  setRefresh,
  setTokenError,
  setCommonError,
} = userSlice.actions;

export default userSlice.reducer;
