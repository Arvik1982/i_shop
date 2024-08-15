import { useState } from "react";
import AddProductQuantity from "../AddProductQuantity/AddProductQuantity";
import styles from "./productInLine.module.css";
import { Link } from "react-router-dom";
import AddToCartButton from "../UI/AddToCartButton/AddToCardButton";
import { TProduct } from "../../types/commonTypes";

type TProps = {
  item: TProduct;
};
export default function ProductInLine({ item }: TProps) {
  const [toDelete, setToDelete] = useState<number[]>([4]);

  const handleDeleteItem = (
    itemId: number,
    e: React.MouseEvent<
      HTMLDivElement | HTMLButtonElement | HTMLAnchorElement,
      MouseEvent
    >
  ): void => {
    e.stopPropagation();

    if (!toDelete.includes(itemId)) {
      setToDelete([...toDelete, itemId]);
    }
    if (toDelete.includes(itemId)) {
      setToDelete(
        toDelete.filter((el) => {
          return el !== itemId;
        })
      );
    }
  };
  const isDeleted = (itemId: number) => {
    return toDelete.includes(itemId);
  };
  const discountedPriceItem = (price: number, discount: number) => {
    return Math.round((price - (price * discount) / 100) * 100) / 100;
  };
  return (
    <article className={`${styles.content__left_item}`}>
      <div
        style={isDeleted(item.id) ? { opacity: "0.6" } : {}}
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
            {discountedPriceItem(item.price, item.discountPercentage)}
          </span>
        </div>
      </div>

      <div className={styles.item__actions}>
        {!isDeleted(item.id) && (
          <AddProductQuantity productCount={item.quantity} />
        )}
        {!isDeleted(item.id) && (
          <button
            onClick={(e) => {
              handleDeleteItem(item.id, e);
            }}
            className={styles.item__actions_del}
          >
            Delete
          </button>
        )}
        {isDeleted(item.id) && (
          <AddToCartButton
            onClick={(e) => {
              handleDeleteItem(item.id, e);
            }}
          />
        )}
      </div>
    </article>
  );
}
