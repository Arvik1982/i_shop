import { ButtonHTMLAttributes, useEffect, useState } from "react";
import CardIcon from "../../Icons/CardIcon";
import styles from "./addToCartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../types/storeTypes";
import { TData, TProduct } from "../../../types/commonTypes";
import { addRemoveItemCart } from "../../../helpers/addRemoveItemCart";
import CustomButton from "../CustomButton/CustomButton";

type TProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  product: TProduct | TData;
} & { myType?: string };

export default function AddToCartButton({ product, myType }: TProps) {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.userSlice.token);
  console.log("add to cart button", product);
  const[disabled, setDisabled]=useState(false)
  const { error, cartData } = useSelector(
    (state: RootState) => state.cartSlice
  );

  error && console.log(error);
  
  return (
    <>
      {myType === "icon" && (<>
        <button
        disabled={disabled}
          aria-label="add to cart"
          className={styles.bottom__right_button}
          onClick={() =>
            cartData &&
            token &&
            addRemoveItemCart(product.id, "add", cartData, dispatch, token,setDisabled)
          }
        >
          <CardIcon />
        </button>
        
      </>
      )}

      {myType !== "icon" && (
        <>
          <CustomButton
          disabled={disabled}
            buttonname={"Add to cart"}
            onClick={() => {
              cartData &&
                token &&
                addRemoveItemCart(product.id, "add", cartData, dispatch, token, setDisabled);
            }}
          />
           {error&&<span style={{color:'red', position:'absolute', bottom:'10px'}}>{error}</span>
          }
        </>
      )}
    </>
  );
}
