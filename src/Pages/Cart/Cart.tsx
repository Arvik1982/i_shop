import { Helmet } from "react-helmet-async";
import ProductInLine from "../../components/ProductInLine/ProductInLine";
import styles from "./cart.module.css";
import { useSelector } from "react-redux";
import { TProduct } from "../../types/commonTypes";
import { RootState } from "../../types/storeTypes";

export default function Cart() {
  const {
    status,
    error,
    cartData: cart,
    leftItemsArr,
  } = useSelector((state: RootState) => state.cartSlice);

  const cartData = {
    ...cart,
    products: leftItemsArr || [],
  };

  const totalPriceWithoutDiscount = (cartData: {
    products: TProduct[];
  }): number => {
    let result = 0;
    cartData.products?.forEach((product: TProduct) => {
      result += product.price * product.quantity;
    });
    return Math.round(result * 100) / 100;
  };

  const totalDiscountedPrice = (cartData: { products: TProduct[] }): number => {
    let result = 0;
    cartData.products?.forEach((product: TProduct) => {
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
        {cartData &&
          cartData.products?.map((product, index) => {
            return (
              <link
                key={index}
                rel="prefetch"
                href={`https://dummyjson.com/products/${product.id}`}
                as="fetch"
              />
            );
          })}
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
      {cartData ? (
        <main className={styles.cart__container_content}>
          <section className={styles.container__content_left}>
            {cartData?.products?.map((product, index) => {
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
                  {cartData.totalProducts}
                  items
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
          {error && <span className={styles.error__output}>{error}</span>}
        </main>
      ) : (
        <main
          style={{ justifyContent: "center" }}
          className={styles.cart__container_content}
        >
          {" "}
          <p className={styles.common__discount_title}>No items</p>
        </main>
      )}
    </div>
  );
}
