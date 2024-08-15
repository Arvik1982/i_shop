import { MouseEventHandler, useEffect, useRef } from "react";
import styles from "./listProducts.module.css";
import ProductListItem from "./ListProductsItem";
import { TPropsLink } from "../../types/propsTypes";
import { TProducts } from "../../types/commonTypes";
import DebouncedSearch from "../DebounsedSearch/debounsedSearch";

type TPropsProducts<T> = TPropsLink & {
  products: T;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  paginateData: {
    totalItems: number;
    handleLoadMore: MouseEventHandler<HTMLButtonElement>;
  };
};

export default function Products({
  products,
  setSearchInput,
  link,
  setLink,
  paginateData,
}: TPropsProducts<TProducts>) {
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
      <DebouncedSearch setSearchInput={setSearchInput} />
      {products.products.length > 0 ? (
        <div className={styles.catalog__container_content}>
          <ProductListItem productArr={products.products} />
        </div>
      ) : (
        <p>no items</p>
      )}
      <div className={styles.container__box_button}>
        {products.products.length > 0 &&
          products.products.length < paginateData.totalItems && (
            <button
              onClick={paginateData.handleLoadMore}
              tabIndex={0}
              aria-label="Show more"
              className={styles.box__button}
            >
              Show more
            </button>
          )}
      </div>
    </section>
  );
}
