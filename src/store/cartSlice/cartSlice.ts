import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import getDataApi from "../../api/getDataApi";
import { CartResponse, CartState } from "../../types/cartTypes";
import updateDataApi from "../../api/updateDataApi";

const initialState: CartState = {
  status: "start",
  error: null,
  cartData: null,
  
};
const token = localStorage.getItem('token')
export const getCartDataThunk = createAsyncThunk<
  CartResponse,
  string,
  { rejectValue: string | null }
>("cartSlice/getCartDataThunk", async (host, { rejectWithValue }) => {
  try {
    const data = await getDataApi(host,token);
    return data;
  } catch (error) {

    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});



// Новый thunk для обновления данных корзины
export const updateCartDataThunk = createAsyncThunk<
  CartResponse,
  { host: string; token: string | null; updateData: object }, // Принимаем URL, токен и данные для обновления
  { rejectValue: string | null }
>("cartSlice/updateCartDataThunk", async ({ host, token, updateData }, { rejectWithValue }) => {
  try {
    console.log('thunk')
    const data = await updateDataApi(host, token, updateData); // Используем getDataApi для отправки PATCH запроса
    return data;
  } catch (error) {
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
      })


      .addCase(updateCartDataThunk.pending, (state) => {
        state.status = "loadUpdate";
        state.error = null;
      })
      .addCase(updateCartDataThunk.fulfilled, (state, action) => {
        state.status = "resolved";
        console.log(action.payload)
        state.cartData = action.payload; 
      })
      .addCase(updateCartDataThunk.rejected, (state, action) => {
        state.status = "rejectUpdate";
        state.error = action.payload;
      });



  },
});
export const {} = cartSlice.actions;

export default cartSlice.reducer;
