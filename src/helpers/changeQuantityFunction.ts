import { cartsUpdateHost } from "../api/hosts";
import { updateCartDataThunk } from "../store/cartSlice/cartSlice";
import { ICartData } from "../types/cartTypes";
import { AppDispatch } from "../types/storeTypes";

export const handleChangeQuantityFunction = (
  id: number,
  action: string,
  cart: ICartData,
  dispatch: AppDispatch,
  token: string
) => {
  const newCart = { ...cart };
  const current = newCart.products.map((el) => {
    if (el.id === id) {
      return {
        ...el,
        quantity: action === "+"?el.quantity + 1:el.quantity>0?el.quantity - 1:'',
      };
    }
    return el;
  });

  current &&
    dispatch(
      updateCartDataThunk({
        host: cartsUpdateHost,
        token,
        updateData: {
          merge: false,

          products: current,
        },
      })
    );
};
