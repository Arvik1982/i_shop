import { ButtonHTMLAttributes, useState } from "react";
import CardIcon from "../../Icons/CardIcon";
import styles from "./addNewProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../types/storeTypes";
import {
  setUpdateCart,
  updateCartDataThunk,
} from "../../../store/cartSlice/cartSlice";
import { cartsUpdateHost } from "../../../api/hosts";
import { TData, TProduct } from "../../../types/commonTypes";
import CustomButton from "../CustomButton/CustomButton";
import { ICartData } from "../../../types/cartTypes";
import { setCommonError } from "../../../store/userSlice/userSlice";
import { useAddNewProductToCartMutation } from "../../../store/productApi/addNewProductApi";

type TProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  product: TProduct | TData;
} & { myType?: string };

export default function AddNewProduct({ product, myType }: TProps) {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.userSlice.token);
  const [disabled, setDisabled] = useState(false);

  const { error, cartData } = useSelector(
    (state: RootState) => state.cartSlice
  );

  error && console.log(error);

  // const addToCartNewProduct = (
  //   cart: ICartData,
  //   dispatch: AppDispatch,
  //   token: string,
  //   id: number
  // ) => {
  //   setDisabled(true);
  //   const updatedCartData = { ...cart };
  //   const newProducts = [...updatedCartData.products, { id: id, quantity: 1 }];

  //   cartData &&
  //     newProducts &&
  //     token &&
  //     dispatch(
  //       updateCartDataThunk({
  //         host: `${cartsUpdateHost}/${cartData.id}`,
  //         token,
  //         updateData: {
  //           merge: false,
  //           products: newProducts,
  //         },
  //       })
  //     ).finally(() => {
  //       setDisabled(false);
  //     });
  // };

  const cartId = cartData && cartData.id;
  const [addNewProductToCart, { error: updateError }] =
    useAddNewProductToCartMutation();


  const handleAddProductRtk = async (cart: ICartData, id: number) => {
    setDisabled(true) 
    const updatedCartData = { ...cart };
    const newProducts = [...updatedCartData.products, { id: id, quantity: 1 }];

    try {
      
      const result = await addNewProductToCart({
        cartId,
        newProducts,
      }).unwrap().finally(()=>{setDisabled(false)});
      dispatch(setUpdateCart(result));
      console.log("Product added successfully!", result);
    } catch (err) {
      console.error("Failed to add product: ", err);
    }
  };
  
  return (
    <>
      {myType !== "text" && (
        <>
          {updateError && (
            <p
            className={styles.error__output}
            >
              {updateError.error}
            </p>
          )}
          <button
            disabled={disabled}
            aria-label="add to cart"
            className={styles.bottom__right_button}
            onClick={() => {
              token && cartData && handleAddProductRtk(cartData, product.id);
           }}
          >
            <CardIcon />
          </button>
        </>
      )}
      {myType === "text" && (
        <>
          {updateError && (
            <p
            className={styles.error__output}
            >
              {updateError.error}
            </p>
          )}
          <CustomButton
            disabled={disabled}
            onClick={() => {
              token && cartData && handleAddProductRtk(cartData, product.id);
              }}
            buttonname={"Add to card"}
          />
        </>
      )}
    </>
  );
}
