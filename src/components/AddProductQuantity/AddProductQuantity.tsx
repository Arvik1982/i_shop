import { useState } from "react";
import styles from "./addQuantity.module.css";
import QuantityButton from "../UI/QuantityButton/QuantityButton";
import QuantityNumber from "../QuantityNumber/QuantityNumber";

type TProps = { productCount: number };
export default function AddProductQuantity({ productCount }: TProps) {
  const [count, setCount] = useState<number>(
    productCount !== 0 ? productCount : 1
  );

  return (
    <div className={styles.right__change_box}>
      <QuantityButton count={count} setCount={setCount} action="-" />
      <QuantityNumber count={count} />
      <QuantityButton count={count} setCount={setCount} action="+" />
    </div>
  );
}
