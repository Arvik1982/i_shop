import About from "../../components/About/About";
import styles from "./catalog.module.css";
import Products from "../../components/ListProducts/ListProducts";
import AnswersFaq from "../../components/AnswersFaq/AnswersFaq";
import { TPropsLink } from "../../types/propsTypes";
import { Helmet } from "react-helmet-async";
import { useGetCatalogQuery } from "../../store/catalogApi/catalogApi";
import { TCatalog } from "../../types/commonTypes";
import ErrorPage from "../Error/ErrorPage";
import { useState } from "react";

export default function Catalog({ link, setLink }: TPropsLink) {
  const [skip, setSkip] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  const {
    data: products,
    error,
    isLoading,
  } = useGetCatalogQuery<TCatalog>({ searchInput, skip });

  
  const totalItems = products?.total || 0;
  const handleLoadMore = () => {
    setSkip((prev) => prev + 12);
  };

  const paginateData = {
    totalItems: totalItems,
    handleLoadMore: handleLoadMore,
  };

  return (
    <>
      <Helmet>
        <title>Catalog | Goods4you</title>
        <meta
          name="description"
          content="Any products from famous brands with worldwide delivery"
        />

        {products &&
          products.products.map((product, index) => {
            return (
              <link
                key={index}
                rel="preload"
                href={product.thumbnail}
                as="image"
              />
            );
          })}
      </Helmet>

      <main className={styles.catalog__container}>
        <About setLink={setLink} />
        {error && <ErrorPage errorProp={error.status} />}
        {isLoading && (
          <p className={styles.products__container_box}>Loading...</p>
        )}
        {products && (
          <Products
            products={products}
            setSearchInput={setSearchInput}
            setSkip={setSkip}
            setLink={setLink}
            link={link}
            paginateData={paginateData}
          />
        )}
        <AnswersFaq setLink={setLink} link={link} />
      </main>
    </>
  );
}
