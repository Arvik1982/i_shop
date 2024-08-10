import { useState } from "react";
import CardIcon from "../Icons/CardIcon";
import styles from "./products.module.css";
import { Link, useNavigate } from "react-router-dom";
import AddProductQuantity from "../AddProductQuantity/AddProductQuantity";
import { onKeyEnterDown } from "../../helpers/onEnterClick";
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
  const navigate=useNavigate()
  const handleProductCartAdd = (id: number) => {
    setCartProduct(id);
  };

  return (
    <>
      {productArr.map((el, index) => {
        return (
          <article
            onMouseLeave={() => setActive(null)}
            aria-label={`product ${el.name}`}
            tabIndex={0}
            key={index}
            className={styles.container__content_item}
          >
            <div className={styles.content__item_img}>
              
              <img
                onMouseEnter={() => {
                  setActive(index);
                }}
                className={styles.content__item_img}
                src={el.img}
                alt="product image"
                loading="lazy"
              />
              
              {active === index && (
                <Link
               onKeyDown={(e)=>{()=>onKeyEnterDown(e,navigate(`/product/${el.id}`))}}
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
            </div>

            <div className={styles.content__item_bottom}>
              <div className={styles.item__bottom_left}>
                <Link onMouseEnter={() => {
                  setActive(index);
                }}
                  className={`${styles.item__title_link} ${
                    active === index ? styles.hover : ""
                  }`}
                  aria-label={`link to cart page`}
                  to={`/product/${el.id}`}
                  onKeyDown={(e)=>{()=>onKeyEnterDown(e,navigate(`/product/${el.id}`))}}
                >
                  <h3
                    className={`${styles.item__title} ${
                      cartProduct === el.id||el.id===6 ? styles.card__active : ""
                    }`}
                  >
                    Essence Mascara Lash Princess
                  </h3>
                </Link>
                <span aria-label="price" className={styles.item__price}>
                  $110
                </span>
              </div>
              <div className={styles.item__bottom_right}>
                {cartProduct !== el.id&&el.id!==6 && (
                  <button
                    aria-label="add to cart"
                    onClick={() => {
                      handleProductCartAdd(el.id);
                    }}
                    className={styles.bottom__right_button}
                  >
                    <CardIcon />
                  </button>
                )}
                {el.id===6 && <AddProductQuantity />}
                {cartProduct === el.id&&el.id!==6 && <AddProductQuantity />}
              </div>
            </div>
          </article>
        );
      })}
    </>
  );
}
