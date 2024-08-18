import { useParams } from "react-router-dom";
import styles from "./product.module.css";
import Rating from "../../components/Raiting/Rating";
import { Helmet } from "react-helmet-async";
import { useGetProductsQuery } from "../../store/productSlice/productSlice";
import { TProduct, TSingleProduct } from "../../types/commonTypes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../types/storeTypes";
import { getCartDataThunk } from "../../store/cartSlice/cartSlice";
import { cartsHost } from "../../api/hosts";
import Loader from "../../components/Loader/Loader";
import ErrorPage from "../Error/ErrorPage";
import ProductPicture from "../../components/ProductPicture/ProductPicture";
import PictureFeed from "../../components/PictureFeed/PictureFeed";
import BuyProduct from "../../components/BuyProduct/BuyProduct";

export default function Product() {
  const params = useParams();

  const { data, error, isLoading } = useGetProductsQuery<TSingleProduct>(
    params.id
  );
  const dispatch = useDispatch<AppDispatch>();
  const [srcImg, setSrcImg] = useState("");
  useEffect(() => {
    dispatch(getCartDataThunk(cartsHost));
  }, [dispatch]);

  const { cartData } = useSelector((state: RootState) => state.cartSlice);

  const quantityReturn = (products: TProduct[], id: string | undefined) => {
    const currentProductQuantity = products.find((product) => {
      return product.id === Number(id);
    });

    if (currentProductQuantity) {
      return currentProductQuantity.quantity;
    }
    if (!currentProductQuantity) {
      return 0;
    }
  };

  const quantity = cartData?.products
    ? quantityReturn(cartData.products, params.id)
    : 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <>
          {error.status === 404 ? <ErrorPage /> : <p>{error.data.message}</p>}
        </>
      ) : (
        <main className={styles.product__container}>
          <Helmet>
            {data && <title> {data.title} | Goods4you</title>}
            <meta
              name="description"
              content="Any products from famous brands with worldwide delivery"
            />
            <link rel="preload" href={data.images[0]} as="image" />
          </Helmet>
          <section className={styles.product__container_content}>
            <article className={styles.content__img_box}>
              <ProductPicture data={data} srcImg={srcImg} />
              <PictureFeed data={data} setSrcImg={setSrcImg} />
            </article>
            <article className={styles.content__text_box}>
              <div className={styles.box__title_container}>
                <h1 className={styles.title__container_text}>
                  {data && data.title}
                </h1>
                <div className={styles.container__text_full}>
                  {data && data.title}
                </div>
                <div className={styles.title__container_rating}>
                  <div className={styles.rating__stars}>
                    <Rating value={data && data.rating} />
                  </div>
                  <p
                    className={`${styles.other__text} ${styles.other__text_gap}`}
                  >
                    {data &&
                      data.tags.map((text, index) => {
                        return <span key={index}>{text}</span>;
                      })}
                  </p>
                </div>
              </div>
              <p className={styles.text__box_amount}>
                <span className={styles.box__amount_text}>
                  {data && data.availabilityStatus}
                </span>
              </p>
              <p className={styles.text__box_description}>
                {data && data.description}
              </p>

              <p className={styles.text__box_other}>
                <span className={styles.text}>
                  {data && data.warrantyInformation}
                </span>
                <span className={styles.text}>
                  {data && data.shippingInformation}
                </span>
              </p>
              <BuyProduct data={data} quantity={quantity} />
            </article>
          </section>
        </main>
      )}
    </>
  );
}
