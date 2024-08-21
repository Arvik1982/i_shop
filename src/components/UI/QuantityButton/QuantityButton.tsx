import SignIcon from "../../Icons/SignIcopn";
import styles from "./quantityButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../types/storeTypes";
import { handleChangeQuantityFunction } from "../../../helpers/changeQuantityFunction";

type TProps = {
  idProduct: number;
  action: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export default function QuantityButton({ idProduct, action }: TProps) {
  const { cartData } = useSelector((state: RootState) => state.cartSlice);
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.userSlice.token);

  return (
    <button
      aria-label="add to cart"
      onClick={(e) => {
        e.stopPropagation();
        cartData&&token&&handleChangeQuantityFunction(
          idProduct,
          action,
          cartData,
          dispatch,
          token
        );
      }}
      className={`${
        1 < 14 ? styles.bottom__right_button : styles.bottom__right_button_large
      }`}
    >
      {action === "+" && <SignIcon sign={"+"} />}
      {action === "-" && <SignIcon sign={"-"} />}
    </button>
  );
}
