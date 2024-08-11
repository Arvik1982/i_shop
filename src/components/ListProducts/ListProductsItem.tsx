import { useState } from "react";
import styles from "./listProducts.module.css";
import { Link, useNavigate } from "react-router-dom";
import AddProductQuantity from "../AddProductQuantity/AddProductQuantity";
import { onKeyEnterDown } from "../../helpers/onEnterClick";
import AddToCartButton from "../UI/AddToCartButton/AddToCardButton";
import LinkByName from "../UI/LinkByName/LinkByName";
type TProps = {
  productArr: {
    id: number;
    name: string;
    img: string;
  }[];
};

export default function ProductListItem({ productArr }: TProps) {
  const [active, setActive] = useState<number | null>(null);
  const [cartProduct, setCartProduct] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleProductCartAdd = (id: number) => {
    setCartProduct(id);
  };

  return (
    <>
      {productArr.map((el, index) => {
        return (
          <article
            onMouseLeave={() => setActive(null)}
            onMouseEnter={() => {
              setActive(index);
            }}
            aria-label={`product ${el.name}`}
            tabIndex={0}
            key={index}
            className={styles.container__content_item}
          >
            <figure className={styles.content__item_img}>
              <img
                className={styles.content__item_img}
                src={el.img}
                alt="product image"
                loading="lazy"
              />

              {active === index && (
                <Link
                  onKeyDown={(e) => {
                    () => onKeyEnterDown(e, navigate(`/product/${el.id}`));
                  }}
                  aria-label={`link to about product`}
                  to={`/product/${el.id}`}
                >
                  <div className={styles.item__img_overlay}>
                    <span className={styles.img__overlay_text}>
                      Show details
                    </span>
                  </div>
                </Link>
              )}
            </figure>

            <div className={styles.content__item_bottom}>
              <div className={styles.item__bottom_left}>
                <LinkByName
                  text="Essence Mascara Lash Princess"
                  selectedElId={cartProduct ? cartProduct : undefined}
                  currentElId={el.id}
                  navRef={`/product/${el.id}`}
                />
                <span aria-label="price" className={styles.item__price}>
                  $110
                </span>
              </div>
              <div className={styles.item__bottom_right}>
                {cartProduct !== el.id && el.id !== 6 && (
                  <AddToCartButton
                    onClick={() => {
                      handleProductCartAdd(el.id);
                    }}
                  />
                )}
                {el.id === 6 && <AddProductQuantity />}
                {cartProduct === el.id && el.id !== 6 && <AddProductQuantity />}
              </div>
            </div>
          </article>
        );
      })}
    </>
  );
}
