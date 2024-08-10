import { configureStore } from "@reduxjs/toolkit";
import navSlice from "./navigationSlice/navSlice";

export default configureStore({
  reducer: {
    navSlice: navSlice,
  },
});
