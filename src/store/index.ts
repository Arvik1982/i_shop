import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice/cartSlice";
import { getProductDataRtq } from "./productSlice/productSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    cartSlice: cartSlice,
    [getProductDataRtq.reducerPath]:getProductDataRtq.reducer
  },
  middleware:(getDefaultMiddleWare)=>getDefaultMiddleWare().concat(getProductDataRtq.middleware)
});
setupListeners(store.dispatch)

export default store;