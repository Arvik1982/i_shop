import { useState } from "react";
import styles from "./addQuantity.module.css";
import QuantityButton from "../UI/QuantityButton/QuantityButton";
import QuantityNumber from "../QuantityNumber/QuantityNumber";
import { useSelector } from "react-redux";
import { RootState } from "../../types/storeTypes";
import { TProduct } from "../../types/commonTypes";

type TProps = {
  product: TProduct;
  args?: { productCount?: number };
  productCount?: number;
};

export default function AddProductQuantity({ product }: TProps) {
  const { status, error } = useSelector((state: RootState) => state.cartSlice);

  error && console.log(error);
  const [loading] = useState(status === "loadUpdate");

  return (
    <>
      {product && (
        <div
          className={`${styles.right__change_box} ${loading ? styles.disabled : ""}`}
        >
          <QuantityButton idProduct={product.id} action="-" />
          <QuantityNumber count={product && product.quantity} />
          <QuantityButton idProduct={product.id} action="+" />
        </div>
      )}
    </>
  );
}
