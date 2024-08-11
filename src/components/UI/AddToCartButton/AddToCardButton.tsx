import { ButtonHTMLAttributes } from "react";
import CardIcon from "../../Icons/CardIcon";
import styles from "./addToCartButton.module.css";

type TProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function AddToCartButton({ ...props }: TProps) {
  return (
    <button
      aria-label="add to cart"
      className={styles.bottom__right_button}
      onClick={props.onClick}
    >
      <CardIcon />
    </button>
  );
}
