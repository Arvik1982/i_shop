import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/userTypes";

const initialState: Partial<IUser> = {
  id:undefined,
  email: "",
  token: localStorage.getItem("token") || "",
  refreshToken: localStorage.getItem("refresh") || "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload;
    },
    setUserId: (state, action) => {
      state.id = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setRefresh: (state, action) => {
      state.refreshToken = action.payload;
      localStorage.setItem("refresh", action.payload);
    },
    setTokenError: (state) => {
      state.refreshToken = "";
      localStorage.removeItem("token");
    },
  },
});
export const { setUser,setUserId, setToken, setRefresh, setTokenError } = userSlice.actions;

export default userSlice.reducer;
