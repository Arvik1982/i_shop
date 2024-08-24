import { MouseEventHandler, useEffect, useRef, useState } from "react";
import styles from "./listProducts.module.css";
import ProductListItem from "./ListProductsItem";
import { TPropsLink } from "../../types/propsTypes";
import { TProducts } from "../../types/commonTypes";
import DebouncedSearch from "../DebounsedSearch/debounsedSearch";
import { useSelector } from "react-redux";
import { RootState } from "../../types/storeTypes";

type TPropsProducts<T> = TPropsLink & {
  products: T;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  paginateData: {
    totalItems: number;
    handleLoadMore: MouseEventHandler<HTMLButtonElement>;
  };
};

export default function Products({
  products,
  setSearchInput,
  setSkip,
  link,
  setLink,
  paginateData,
}: TPropsProducts<TProducts>) {
  const focusOnCatalog = useRef<HTMLDivElement>(null);
  const { error: updateError } = useSelector(
    (state: RootState) => state.cartSlice
  );
  const [localError, setLocalError] = useState(false);
  const errorRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    updateError && setLocalError(true);
  }, [updateError]);
  useEffect(() => {
    if (updateError && localError && errorRef.current) {
      errorRef.current.focus();
    }
  }, [updateError, localError]);

  useEffect(() => {
    if (link === "Catalog") {
      focusOnCatalog.current &&
        focusOnCatalog.current.scrollIntoView({ behavior: "smooth" });
    }

    setLink("");
  }, [link]);

  const handleShowMoreClick = (paginateData: {
    handleLoadMore: Function;
  }): void => {
    paginateData.handleLoadMore();
    setLink("Catalog");
  };
  return (
    <section
      aria-label="products image list"
      className={styles.products__container_box}
    >
      <h2
        ref={focusOnCatalog}
        tabIndex={0}
        className={styles.container__box_title}
      >
        Catalog
      </h2>
      <DebouncedSearch setSearchInput={setSearchInput} setSkip={setSkip} />

      {products.products.length > 0 ? (
        <div
          style={{ position: "relative" }}
          className={styles.catalog__container_content}
        >
          <ProductListItem productArr={products.products} />

          {updateError && localError && (
            <span
              ref={errorRef}
              tabIndex={0}
              onKeyUp={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setLocalError(false);
                }
              }}
              onClick={() => {
                setLocalError(false);
              }}
              className={styles.error__output}
            >
              {updateError}
            </span>
          )}
        </div>
      ) : (
        <p>no items</p>
      )}
      <div className={styles.container__box_button}>
        {products.products.length > 0 &&
          products.products.length < paginateData.totalItems && (
            <button
              onClick={() => {
                handleShowMoreClick(paginateData);
              }}
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
