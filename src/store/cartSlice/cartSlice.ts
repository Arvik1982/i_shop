import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import getDataApi from "../../api/getDataApi";
import { CartResponse, CartState } from "../../types/cartTypes";
import updateDataApi from "../../api/updateDataApi";
import { TUpdateData } from "../../types/commonTypes";
import { RootState } from "../../types/storeTypes";

const initialState: CartState = {
  status: "start",
  error: null,
  cartData: null,
  leftItemsArr: null,
};

export const getCartDataThunk = createAsyncThunk<
  CartResponse,
  string,
  { rejectValue: string | null; state: RootState }
>("cartSlice/getCartDataThunk", async (host, { rejectWithValue, getState }) => {

  try {
    const state = getState();
    const userToken = state.userSlice.token ?? localStorage.getItem("token");

    const data = await getDataApi(host, userToken);
    return data;
    
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});

export const updateCartDataThunk = createAsyncThunk<
  CartResponse,
  { host: string; token: string | null; updateData: TUpdateData },
  { rejectValue: string | null }
>(
  "cartSlice/updateCartDataThunk",
  async ({ host, token, updateData }, { rejectWithValue }) => {
    try {
      const data = await updateDataApi(host, token, updateData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setUpdateCart: (state, action) => {
      state.cartData = action.payload;
    },

    setLeftItemsArr: (state, action) => {
      state.leftItemsArr = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartDataThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCartDataThunk.fulfilled, (state, action) => {
        state.status = "resolved";

        state.cartData = action.payload.carts[0];
        if (action.payload.carts[0]) {
          state.leftItemsArr = action.payload.carts[0].products ?? [];
        } else {
          state.leftItemsArr = [];
        }
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
        state.cartData = action.payload;

        if (
          state.leftItemsArr &&
          state.leftItemsArr?.length <= action.payload.products.length
        ) {
          state.leftItemsArr = action.payload.products;
        } else if (state.leftItemsArr) {
          const incomingIds = action.payload.products.map((item) => {
            return item.id;
          });

          const updatedArray = state.leftItemsArr?.map((item) => {
            if (!incomingIds.includes(item.id)) {
              return { ...item, quantity: 0 };
            }
            if (incomingIds.includes(item.id)) {
              const matchingProduct = action.payload.products.find(
                (product) => product.id === item.id
              );
              return matchingProduct || item;
            }
            return item;
          });

          state.leftItemsArr = updatedArray;
        }
      })
      .addCase(updateCartDataThunk.rejected, (state, action) => {
        state.status = "rejectUpdate";
        state.error = action.payload;
      });
  },
});
export const { setUpdateCart, setLeftItemsArr } = cartSlice.actions;

export default cartSlice.reducer;
