import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice/cartSlice";
import { getProductDataRtq } from "./productApi/productApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { getCatalogDataRtq } from "./catalogApi/catalogApi";
import { getAuthRtq } from "./authApi/authApi";
import userSlice from "./userSlice/userSlice";
import { addNewProductToCartRtq } from "./productApi/addNewProductApi";

const store = configureStore({
  reducer: {
    cartSlice: cartSlice,
    userSlice: userSlice,
    [getProductDataRtq.reducerPath]: getProductDataRtq.reducer,
    [getCatalogDataRtq.reducerPath]: getCatalogDataRtq.reducer,
    [getAuthRtq.reducerPath]: getAuthRtq.reducer,
    [addNewProductToCartRtq.reducerPath]: addNewProductToCartRtq.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare()
      .concat(getProductDataRtq.middleware)
      .concat(getCatalogDataRtq.middleware)
      .concat(getAuthRtq.middleware)
      .concat(addNewProductToCartRtq.middleware),
});
setupListeners(store.dispatch);

export default store;
