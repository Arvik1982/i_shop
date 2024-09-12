import AddProductQuantity from "../AddProductQuantity/AddProductQuantity";
import styles from "./productInLine.module.css";
import { Link } from "react-router-dom";
import AddToCartButton from "../UI/AddToCartButton/AddToCardButton";
import { TProduct } from "../../types/commonTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../types/storeTypes";
import { useState } from "react";
import { removeItemCart } from "../../helpers/removeItemCart";

type TProps = {
  item: TProduct;
};
export default function ProductInLine({ item }: TProps) {
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.userSlice.token);

  const { error, cartData } = useSelector(
    (state: RootState) => state.cartSlice
  );

  error && console.log(error);

  const isDeleted = (item: { quantity: number }) => {
    return item.quantity === 0;
  };

  const discountedPriceItem = (price: number, discount: number) => {
    return Math.round((price - (price * discount) / 100) * 100) / 100;
  };
  return (
    <article className={`${styles.content__left_item}`}>
      <div
        style={isDeleted(item) ? { opacity: "0.6" } : {}}
        className={styles.left__item_description}
      >
        <figure className={styles.img__container}>
          <img
            className={styles.img}
            src={item.thumbnail}
            alt="product image"
          />
        </figure>
        <div className={styles.item__description_content}>
          <Link aria-label={`link to product page`} to={`/product/${item.id}`}>
            <h2 className={styles.item__title}>{item.title}</h2>
          </Link>
          <span aria-label="price" className={styles.item__price}>
            {discountedPriceItem(item.price, item.discountPercentage)}$
          </span>
        </div>
      </div>

      <div className={styles.item__actions}>
        {!(item.quantity === 0) && <AddProductQuantity product={item} />}
        {!(item.quantity === 0) && (
          <button
            disabled={disabled}
            onClick={() =>
              cartData &&
              token &&
              removeItemCart(
                item.id,
                "del",
                cartData,
                dispatch,
                token,
                setDisabled
              )
            }
            className={styles.item__actions_del}
          >
            Delete
          </button>
        )}
        {item.quantity === 0 && (
          <AddToCartButton myType="icon" product={item} />
        )}
      </div>
    </article>
  );
}
