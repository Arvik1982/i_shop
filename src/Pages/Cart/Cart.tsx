import { Helmet } from "react-helmet-async";
import ProductInLine from "../../components/ProductInLine/ProductInLine";
import styles from "./cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCartDataThunk } from "../../store/cartSlice/cartSlice";
import { ICartData } from "../../types/cartTypes";
import { TProduct } from "../../types/commonTypes";
import { cartsHost } from "../../api/hosts";
import { AppDispatch, RootState } from "../../types/storeTypes";

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();

  const { status, error, cartData } = useSelector(
    (state: RootState) => state.cartSlice
  );

  useEffect(() => {
    dispatch(getCartDataThunk(cartsHost));
  }, [dispatch]);

  const totalPriceWithoutDiscount = (cartData: ICartData): number => {
    let result = 0;
    cartData.products.forEach((product: TProduct) => {
      result += product.price * product.quantity;
    });
    return Math.round(result * 100) / 100;
  };

  const totalDiscountedPrice = (cartData: ICartData): number => {
    let result = 0;
    cartData.products.forEach((product: TProduct) => {
      result +=
        product.price * product.quantity -
        ((product.price * product.discountPercentage) / 100) * product.quantity;
    });
    return Math.round(result * 100) / 100;
  };

  return (
    <div className={styles.cart__container}>
      <Helmet>
        <title> My cart | Goods4you</title>
        <meta
          name="description"
          content="Any products from famous brands with worldwide delivery"
        />
      </Helmet>
      <div className={styles.cart__container_title}>
        <h1 className={styles.container__title_text}>My cart</h1>
      </div>
      {status === "loading" && (
        <div className={styles.cart__container_content}>
          {" "}
          <p className={styles.common__discount_title}>Loading...</p>
        </div>
      )}
      {status === "rejected" && (
        <div className={styles.cart__container_content}>
          <p className={styles.common__discount_title}>{error && error}</p>
        </div>
      )}
      {status === "resolved" && cartData ? (
        <main className={styles.cart__container_content}>
          <section className={styles.container__content_left}>
            {cartData?.products.map((product, index) => {
              return (
                <article className={styles.left__product_box} key={index}>
                  {" "}
                  <ProductInLine key={index} item={product} />
                </article>
              );
            })}
          </section>
          <section className={styles.container__content_right}>
            <div className={styles.content__right_common}>
              <div className={styles.right__common_item}>
                <span className={styles.common__item_title}>Total count</span>
                <span className={styles.common__item_value}>
                  {cartData?.totalProducts} items
                </span>
              </div>
              <div className={styles.right__common_item}>
                <span className={styles.common__discount_title}>
                  Price without discount
                </span>
                <span className={styles.common__discount_value}>
                  {cartData ? totalPriceWithoutDiscount(cartData) : ""}
                </span>
              </div>
            </div>
            <div className={styles.content__right_total}>
              <span className={styles.right__total_title}>Total price</span>
              <span className={styles.right__total_value}>
                {cartData ? totalDiscountedPrice(cartData) : ""}
              </span>
            </div>
          </section>
        </main>
      ) : (
        <div
          style={{ justifyContent: "center" }}
          className={styles.cart__container_content}
        >
          {" "}
          <p className={styles.common__discount_title}>No items</p>
        </div>
      )}
    </div>
  );
}
