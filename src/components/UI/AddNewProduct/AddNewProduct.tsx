import { ButtonHTMLAttributes, useState } from "react";
import CardIcon from "../../Icons/CardIcon";
import styles from "./addNewProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../types/storeTypes";
import {
  setLeftItemsArr,
  setUpdateCart,
} from "../../../store/cartSlice/cartSlice";
import { TData, TProduct } from "../../../types/commonTypes";
import CustomButton from "../CustomButton/CustomButton";
import { ICartData } from "../../../types/cartTypes";
import { useAddNewProductToCartMutation } from "../../../store/productApi/addNewProductApi";

type TProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  product: TProduct | TData;
} & { myType?: string };

export default function AddNewProduct({ product, myType }: TProps) {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.userSlice.token);
  const [disabled, setDisabled] = useState(false);

  const { error, cartData, leftItemsArr } = useSelector(
    (state: RootState) => state.cartSlice
  );
  error && console.log(error);

  const cartId = cartData && cartData.id;

  const [addNewProductToCart, { error: updateError }] =
    useAddNewProductToCartMutation();

  const handleAddProductRtk = async (cart: ICartData, id: number) => {
    setDisabled(true);

    const updatedCartData = { ...cart };
    const newProducts = [
      ...(updatedCartData.products ?? []),
      { id: id, quantity: 1 },
    ];

    try {
      await addNewProductToCart({
        cartId,
        newProducts,
      })
        .unwrap()
        .then((result) => {
          const newProductsArr = result.products || [];
          const newLeftArr = [...(leftItemsArr || [])];

          const existUpdateArr = newLeftArr.map((leftProduct) => {
            const existProductIndex = newProductsArr.findIndex(
              (item: TProduct) => item.id === leftProduct.id
            );

            if (existProductIndex !== -1) {
              // Если продукт существует, увеличиваем его quantity на 1
              if (
                leftProduct.quantity === 0 &&
                leftProduct.id === newProductsArr[existProductIndex].id
              ) {
                // Если quantity равен 0, устанавливаем его в 1
                return {
                  ...leftProduct,
                  quantity: 1,
                };
              }
              // Если quantity не равен 0, возвращаем продукт
              return leftProduct;
            }
            // Если продукт не существует, возвращаем оригинальный продукт leftProduct
            return leftProduct;
          });

          const upd = [...existUpdateArr];

          newProductsArr.forEach((newProduct: TProduct) => {
            let isUnique = true;
            newLeftArr.forEach((leftProduct) => {
              if (newProduct.id === leftProduct.id) {
                isUnique = false;
              }
            });
            if (isUnique) {
              upd.push(newProduct);
            }
          });

          dispatch(setLeftItemsArr(upd));

          dispatch(setUpdateCart(result));
        })
        .finally(() => {
          setDisabled(false);
        });
    } catch (err) {
      console.error("Failed to add product: ", err);
    }
  };

  return (
    <>
      {myType !== "text" && (
        <>
          {updateError &&
            typeof updateError === "object" &&
            "error" in updateError && (
              <p className={styles.error__output}>{updateError.error}</p>
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
          {updateError &&
            typeof updateError === "object" &&
            "error" in updateError && (
              <p className={styles.error__output}>{updateError.error}</p>
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
