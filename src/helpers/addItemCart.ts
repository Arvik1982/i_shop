import { cartsUpdateHost } from "../api/hosts";
import { updateCartDataThunk } from "../store/cartSlice/cartSlice";
import { ICartData } from "../types/cartTypes";
import { TData, TProduct } from "../types/commonTypes";
import { AppDispatch } from "../types/storeTypes";

export const addItemCart = (
  product: TProduct|TData,
  id: number,
  action: string,
  cart: ICartData,
  dispatch: AppDispatch,
  token: string,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const cartId = cart.products?.map((el) => {
    return el.id;
  });

  setDisabled(true);

  const newCart = { ...cart };

  if (cartId?.includes(id)) {
    const current = newCart.products?.map((el) => {
      if (el.id === id) {
        return { ...el, quantity: action === "del" ? 0 : 1 };
      }
      return el;
    });

    cart &&
      current &&
      dispatch(
        updateCartDataThunk({
          host: `${cartsUpdateHost}/${cart.id}`,
          token,
          updateData: {
            merge: false,
            products: current,
          },
        })
      ).finally(() => {
        setDisabled(false);
      });
  } else {
    const current = [...(newCart.products ?? []), product];

    cart &&
      current &&
      dispatch(
        updateCartDataThunk({
          host: `${cartsUpdateHost}/${cart.id}`,
          token,
          updateData: {
            merge: false,
            products: current,
          },
        })
      ).finally(() => {
        setDisabled(false);
      });
  }
};
