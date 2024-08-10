import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
  name: "nav",
  initialState: {
    linkId: "",
  },
  reducers: {
    setLinkId(state, action) {
      state.linkId = action.payload;
    },
  },
});
export const { setLinkId } = navSlice.actions;

export default navSlice.reducer;
