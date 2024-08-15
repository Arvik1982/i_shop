import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import getDataApi from "../../api/getDataApi";
import { CartResponse, CartState } from "../../types/cartTypes";

const initialState: CartState = {
  status: "start",
  error: null,
  cartData: null,
};

export const getCartDataThunk = createAsyncThunk<
  CartResponse,
  string,
  { rejectValue: string | null }
>("cartSlice/getCartDataThunk", async (host, { rejectWithValue }) => {
  try {
    const data = await getDataApi(host);
    return data;
  } catch (error) {
    console.log(error)
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartDataThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCartDataThunk.fulfilled, (state, action) => {
        state.status = "resolved";
        state.cartData = action.payload.carts[0];
      })
      .addCase(getCartDataThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});
export const {} = cartSlice.actions;

export default cartSlice.reducer;
