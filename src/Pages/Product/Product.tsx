// import { useParams } from "react-router-dom";
import styles from "./product.module.css";
import { productArr } from "../../mock/products";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import Rating from "../../components/Raiting/Rating";
import { Helmet } from "react-helmet-async";

export default function Product() {
  // const params = useParams();
  const img = productArr[0].img;
  const mockArr = [
    { id: 1, img: img },
    { id: 2, img: img },
    { id: 3, img: img },
    { id: 4, img: img },
    { id: 5, img: img },
    { id: 6, img: img },
  ];

  return (
    <main className={styles.product__container}>
      <Helmet>
        <title> Essence Mascara Lash Princess | Goods4yo</title>
        <meta
          name="description"
          content="Any products from famous brands with worldwide delivery"
        />
      </Helmet>
      <section className={styles.product__container_content}>
        <div className={styles.content__img_box}>
          <picture className={styles.img__box_image}>
            <img
              className={styles.box__image}
              src={img}
              alt={`product ${productArr[0].name} image`}
              loading="lazy"
            />
          </picture>
          <div className={styles.img__box_list}>
            {mockArr.map((el, index) => {
              return (
                <div tabIndex={0} key={index} className={styles.box__list_item}>
                  <img
                    className={styles.box__image}
                    src={el.img}
                    alt={`product ${productArr[0].name} mini image`}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <article className={styles.content__text_box}>
          <div className={styles.box__title_container}>
            <h1 className={styles.title__container_text}>
              Essence Mascara Lash Princess
            </h1>
            <div className={styles.title__container_rating}>
              <div className={styles.rating__stars}>
                <Rating />
              </div>

              <span className={styles.other__text}>
                electronics, selfie accessories
              </span>
            </div>
          </div>
          <div className={styles.text__box_amount}>
            <span className={styles.box__amount_text}>
              In Stock - Only 5 left!
            </span>
          </div>
          <p className={styles.text__box_description}>
            The Essence Mascara Lash Princess is a popular mascara known for its
            volumizing and lengthening effects. Achieve dramatic lashes with
            this long-lasting and cruelty-free formula.
          </p>

          <div className={styles.text__box_other}>
            <span className={styles.text}>1 month warranty</span>
            <span className={styles.text}>Ships in 1 month</span>
          </div>

          <div aria-label="buy" className={styles.text__box_buy}>
            <div className={styles.box__buy_prices}>
              <div className={styles.buy__prices_price}>
                <span className={styles.price_current}>$7.17</span>
                <span className={styles.price_discount}>$9.99</span>
              </div>
              <span className={styles.box__buy_text}>
                Your discount:<p className={styles.text__bold}>14%</p>
              </span>
            </div>
            <CustomButton tabIndex={0} buttonname={"Add to cart"} />
          </div>
        </article>
      </section>
    </main>
  );
}
