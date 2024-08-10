import { useEffect, useRef } from "react";
import { productArr } from "../../mock/products";
import styles from "./listProducts.module.css";
import ProductListItem from "./ListProductsItem";
import { TPropsLink } from "../../types/propsTypes";

export default function Products({ link, setLink }: TPropsLink) {
  const focusOnCatalog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (link === "Catalog") {
      focusOnCatalog.current &&
        focusOnCatalog.current.scrollIntoView({ behavior: "smooth" });
    }

    setLink("");
  }, [link]);

  return (
    <section
      aria-label="products image list"
      className={styles.products__container_box}
    >
      <h1
        ref={focusOnCatalog}
        tabIndex={0}
        className={styles.container__box_title}
      >
        Catalog
      </h1>
      <label title="search" htmlFor="search">
        <input
          id="search"
          aria-label="Search by title"
          placeholder="Search by title"
          className={styles.search}
          type="search"
          autoComplete="on"
        />
      </label>
      <div className={styles.catalog__container_content}>
        <ProductListItem productArr={productArr} />
      </div>
      <div className={styles.container__box_button}>
        <button
          tabIndex={0}
          aria-label="Show more"
          className={styles.box__button}
        >
          Show more
        </button>
      </div>
    </section>
  );
}
