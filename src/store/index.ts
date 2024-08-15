import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice/cartSlice";
import { getProductDataRtq } from "./productSlice/productSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { getCatalogDataRtq } from "./catalogSlice/catalogSlice";

const store = configureStore({
  reducer: {
    cartSlice: cartSlice,
    [getProductDataRtq.reducerPath]: getProductDataRtq.reducer,
    [getCatalogDataRtq.reducerPath]: getCatalogDataRtq.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare()
      .concat(getProductDataRtq.middleware)
      .concat(getCatalogDataRtq.middleware),
});
setupListeners(store.dispatch);

export default store;
