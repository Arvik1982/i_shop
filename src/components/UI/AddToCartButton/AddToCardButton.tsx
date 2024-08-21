import { ButtonHTMLAttributes, useEffect, useState } from "react";
import CardIcon from "../../Icons/CardIcon";
import styles from "./addToCartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../types/storeTypes";
import { TProduct } from "../../../types/commonTypes";
import { addRemoveItemCart } from "../../../helpers/addRemoveItemCart";
import CustomButton from "../CustomButton/CustomButton";



type TProps = ButtonHTMLAttributes<HTMLButtonElement> & { product: TProduct }&{myType?:string};
export default function AddToCartButton({ product, myType }: TProps) {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.userSlice.token);

  const { status, error, cartData } = useSelector(
    (state: RootState) => state.cartSlice
  );

  error && console.log(error);
  return (
    <>{myType==='icon'&&<button
      disabled={status === "loadUpdate"}
      aria-label="add to cart"
      className={styles.bottom__right_button}
      onClick={() =>
        cartData &&
        token &&
        addRemoveItemCart(product.id, "add", cartData, dispatch, token)
      }
      
    >
      <CardIcon />
    </button>}

    {myType!=='icon'&&<CustomButton/>}
    </>
  );
}
