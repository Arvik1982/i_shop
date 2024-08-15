import { useState } from "react";
import SignIcon from "../Icons/SignIcopn";
import styles from "./addQuantity.module.css";

interface ICountFunc {
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  action: string;
  currentCount: number;
  func: React.Dispatch<React.SetStateAction<number>>;
}
type TProps = { productCount: number };
export default function AddProductQuantity({ productCount }: TProps) {
  const [count, setCount] = useState<number>(
    productCount !== 0 ? productCount : 1
  );

  const handleCount = (args: ICountFunc): void => {
    args.e.stopPropagation();

    if (args.action === "+") {
      args.currentCount !== null ? args.func((args.currentCount += 1)) : "";
    }
    if (args.action === "-") {
      args.currentCount !== null
        ? args.currentCount > 0 && args.func((args.currentCount -= 1))
        : "";
    }
  };

  return (
    <div className={styles.right__change_box}>
      <button
        aria-label="add to cart"
        onClick={(e) => {
          handleCount({
            e: e,
            action: "-",
            currentCount: count,
            func: setCount,
          });
        }}
        className={`${
          count < 14
            ? styles.bottom__right_button
            : styles.bottom__right_button_large
        }`}
      >
        <SignIcon sign={"-"} />
      </button>
      <span className={styles.change__box_count}>
        {count !== null ? `${count} item` : "0 item"}
      </span>
      <button
        aria-label="add to cart"
        onClick={(e) => {
          handleCount({
            e: e,
            action: "+",
            currentCount: count,
            func: setCount,
          });
        }}
        className={`${
          count < 14
            ? styles.bottom__right_button
            : styles.bottom__right_button_large
        }`}
      >
        <SignIcon sign={"+"} />
      </button>
    </div>
  );
}
