import {
  ButtonHTMLAttributes,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import CardIcon from "../../Icons/CardIcon";
import styles from "./addNewProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../types/storeTypes";
import { updateCartDataThunk } from "../../../store/cartSlice/cartSlice";
import { cartsUpdateHost } from "../../../api/hosts";
import { TProduct } from "../../../types/commonTypes";

type TProps = ButtonHTMLAttributes<HTMLButtonElement>&{product:TProduct};

export default function AddNewProduct({ product }: TProps) {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.userSlice.token);

  const { status, error, cartData } = useSelector(
    (state: RootState) => state.cartSlice
  );

  error && console.log(error);

  const [newCart, setNewCart] = useState(null);

  

  const addToCart = () => {
   
    const updatedCartData = { ...cartData };

    const newProducts = [...updatedCartData.products, {id: product.id, quantity: 1}]


    updatedCartData &&
      setNewCart({
        ...newCart,

        merge: false,

        products: newProducts,
      });
  };

  useEffect(() => {
    newCart &&
      dispatch(
        updateCartDataThunk({
          host: cartsUpdateHost,
          token,
          updateData: newCart,
        })
      );
  }, [newCart]);

  return (
    <button
      disabled={status === "loadUpdate"}
      aria-label="add to cart"
      className={styles.bottom__right_button}
      onClick={addToCart}
    >
      <CardIcon />
    </button>
  );
}
