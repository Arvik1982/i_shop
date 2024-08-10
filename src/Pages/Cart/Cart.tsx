import { Helmet } from "react-helmet-async";
import ProductInLine from "../../components/ProductInLine/ProductInLine";
import { productArr } from "../../mock/products";
import styles from "./cart.module.css";

export default function Cart() {
  const img = productArr[0].img;

  const mockArr = [
    { id: 1, img: img },
    { id: 2, img: img },
    { id: 3, img: img },
    { id: 4, img: img },
  ];

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
      <main className={styles.cart__container_content}>
        <section className={styles.container__content_left}>
          {mockArr.map((el, index) => {
            return (
              <article className={styles.left__product_box} key={index}>
                {" "}
                <ProductInLine key={el.id} item={el} />
              </article>
            );
          })}
        </section>
        <section className={styles.container__content_right}>
          <div className={styles.content__right_common}>
            <div className={styles.right__common_item}>
              <span className={styles.common__item_title}>Total count</span>
              <span className={styles.common__item_value}>3 items</span>
            </div>
            <div className={styles.right__common_item}>
              <span className={styles.common__discount_title}>
                Price without discount
              </span>
              <span className={styles.common__discount_value}>$700</span>
            </div>
          </div>
          <div className={styles.content__right_total}>
            <span className={styles.right__total_title}>Total price</span>
            <span className={styles.right__total_value}>$590</span>
          </div>
        </section>
      </main>
    </div>
  );
}
