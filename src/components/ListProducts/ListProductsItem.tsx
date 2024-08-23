import { useEffect, useState } from "react";
import styles from "./listProducts.module.css";
import { Link, useNavigate } from "react-router-dom";
import { onKeyEnterDown } from "../../helpers/onEnterClick";
import LinkByName from "../UI/LinkByName/LinkByName";
import { TData } from "../../types/commonTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../types/storeTypes";
import { ICartData } from "../../types/cartTypes";
import AnimatedLoader from "../Loader/AnimatedLoader/AnimatedLoader";
import { imgOnError, imgOnLoad } from "../../helpers/onImgLoad";
import { productDiscounted } from "../../helpers/helpers";
import QuantityButton from "../UI/QuantityButton/QuantityButton";
import AddToCartButton from "../UI/AddToCartButton/AddToCardButton";

type TProps<T> = {
  productArr: T[];
};

export default function ProductListItem({ productArr }: TProps<TData>) {
  const [active, setActive] = useState<number | null>(null);
  const { cartData: cart, leftItemsArr } = useSelector(
    (state: RootState) => state.cartSlice
  );

  const cartData = {
    ...cart,
    products: leftItemsArr || [],
  };

  const navigate = useNavigate();
  const [incomingProducts, setIncomingProducts] = useState<TData[]>([]);
  const [loadingStates, setLoadingStates] = useState(
    Array(productArr.length).fill(true)
  );

  useEffect(() => {
    setIncomingProducts(productArr);
  }, [productArr]);

  useEffect(() => {
    setLoadingStates(Array(incomingProducts.length).fill(true));
  }, [incomingProducts]);

  const isInCart = (cart: ICartData, id: number) => {
    const quantity = cart.products?.find((el) => {
      return el.id === id;
    })?.quantity;

    return quantity && quantity !== 0 ? true : false;
  };

  return (
    <>
      {incomingProducts &&
        incomingProducts.map((el, index) => {
          return (
            <article
              onMouseLeave={() => setActive(null)}
              onMouseEnter={() => {
                setActive(index);
              }}
              aria-label={`product ${el.title}`}
              tabIndex={0}
              key={index}
              className={styles.container__content_item}
            >
              <picture className={styles.content__item_img}>
                {loadingStates[index] && (
                  <div className={styles.item__img_placeholder}>
                    <AnimatedLoader />
                  </div>
                )}
                <img
                  style={{ opacity: loadingStates[index] ? 0 : 1 }}
                  className={styles.content__item_img}
                  src={el.thumbnail}
                  alt="product image"
                  loading="lazy"
                  onLoad={() => {
                    imgOnLoad(index, setLoadingStates);
                  }}
                  onError={() => {
                    imgOnError(index, setLoadingStates);
                  }}
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
              </picture>

              <div className={styles.content__item_bottom}>
                <div className={styles.item__bottom_left}>
                  <div className={styles.hover__text}>{el.title}</div>
                  <LinkByName
                    text={el.title}
                    selectedElId={undefined}
                    currentElId={el.id}
                    navRef={`/product/${el.id}`}
                  />
                  <span aria-label="price" className={styles.item__price}>
                    {productDiscounted(el.price, el.discountPercentage)}
                  </span>
                </div>

                <div
                  onMouseEnter={() => {
                    setActive(index);
                  }}
                  className={styles.item__bottom_right}
                >
                  {cartData && !isInCart(cartData, el.id) && (
                    <AddToCartButton myType="icon" product={el} />
                  )}
                  {cartData && isInCart(cartData, el.id) && (
                    <div className={styles.change__box}>
                      <QuantityButton idProduct={el.id} action="-" />
                      {
                        <p>
                          {
                            cartData?.products.find((elm) => elm.id === el.id)
                              ?.quantity
                          }
                        </p>
                      }

                      <QuantityButton
                        blockMe={
                          el.stock ===
                          cartData?.products.find((elm) => elm.id === el.id)
                            ?.quantity
                        }
                        idProduct={el.id}
                        action="+"
                      />
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
    </>
  );
}
