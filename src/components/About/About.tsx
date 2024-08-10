import { appTitle } from "../../mock/names";
import { TPropsLink } from "../../types/propsTypes";
import styles from "./about.module.css";

export default function About({ setLink }: TPropsLink) {
  const handleButtonClick = (): void => {
    setLink("Catalog");
  };
  return (
    <section aria-label="About us" className={styles.catalog__container_top}>
      <div className={styles.container__top_box}>
        <article className={styles.top__box_content}>
          <h1 className={styles.box__content_h1}>
            Any products from famous brands with worldwide delivery
          </h1>
          <p className={styles.box__content_h2}>
            We sell smartphones, laptops, clothes, shoes and many other products
            at low prices
          </p>
          <button
            tabIndex={0}
            onClick={handleButtonClick}
            aria-label="Go to shopping"
            className={styles.box__content_button}
          >
            Go to shopping
          </button>
        </article>
        <h2 className={styles.top__background_text}>{appTitle.appName}</h2>
      </div>
    </section>
  );
}
