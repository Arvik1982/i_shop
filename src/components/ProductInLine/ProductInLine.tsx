import { useState } from "react";
import AddProductQuantity from "../AddProductQuantity/AddProductQuantity";
import styles from "./productInLine.module.css";
import CardIcon from "../Icons/CardIcon";
import { Link } from "react-router-dom";

type TProps = {
  item: { id: number; img: string };
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

  return (
    <div className={`${styles.content__left_item}`}>
      <div
        style={isDeleted(item.id) ? { opacity: "0.6" } : {}}
        className={styles.left__item_description}
      >
        <div className={styles.img__container}>
          <img className={styles.img} src={item.img} alt="product image" />
        </div>
        <div className={styles.item__description_content}>
          <Link aria-label={`link to product page`} to={`/product/${item.id}`}>
            <h2 className={styles.item__title}>
              Essence Mascara Lash Princess
            </h2>
          </Link>
          <span aria-label="price" className={styles.item__price}>
            $110
          </span>
        </div>
      </div>

      <div className={styles.item__actions}>
        {!isDeleted(item.id) && <AddProductQuantity />}
        {!isDeleted(item.id) && (
          <a
            onClick={(e) => {
              handleDeleteItem(item.id, e);
            }}
            className={styles.item__actions_del}
          >
            Delete
          </a>
        )}
        {isDeleted(item.id) && (
          <button
            onClick={(e) => {
              handleDeleteItem(item.id, e);
            }}
            className={styles.item__actions_add}
          >
            <CardIcon />
          </button>
        )}
      </div>
    </div>
  );
}
