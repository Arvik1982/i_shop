import { useParams } from "react-router-dom";
import styles from "./product.module.css";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import Rating from "../../components/Raiting/Rating";
import { Helmet } from "react-helmet-async";
import { useGetProductsQuery } from "../../store/productSlice/productSlice";
import { TProduct, TSingleProduct } from "../../types/commonTypes";
import { useEffect, useState } from "react";
import AddProductQuantity from "../../components/AddProductQuantity/AddProductQuantity";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../types/storeTypes";
import { getCartDataThunk } from "../../store/cartSlice/cartSlice";
import { cartsHost } from "../../api/hosts";
import Loader from "../../components/Loader/Loader";
import ErrorPage from "../Error/ErrorPage";
import { imgOnLoad } from "../../helpers/onImgLoad";
import AnimatedLoader from "../../components/Loader/AnimatedLoader/AnimatedLoader";
import { productDiscounted } from "../../helpers/helpers";

export default function Product() {
  const params = useParams();

  const { data, error, isLoading } = useGetProductsQuery<TSingleProduct>(
    params.id
  );
  const [loadingStates, setLoadingStates] = useState(Array(1).fill(true));
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCartDataThunk(cartsHost));
  }, [dispatch]);

  const { cartData } = useSelector((state: RootState) => state.cartSlice);

  const [srcImg, setSrcImg] = useState("");

  const handleImgChange = (data: string[], index: number) => {
    const currentSrc = data[index];
    setSrcImg(currentSrc);
  };

  // const productDiscounted = (price: number, discount: number) => {
  //   return Math.round((price - (price * discount) / 100) * 100) / 100;
  // };

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
            {data && <title> {data.title} | Goods4yo</title>}
            <meta
              name="description"
              content="Any products from famous brands with worldwide delivery"
            />

            <link rel="preload" href={data.images[0]} as="image" />

            {data &&
              data.images.map((image, index) => {
                return (
                  <link key={index} rel="preload" href={image} as="image" />
                );
              })}
          </Helmet>
          <section className={styles.product__container_content}>
            <div className={styles.content__img_box}>
              <picture className={styles.img__box_image}>
                {loadingStates[0] && (
                  <div className={styles.box__image__loader}>
                    <AnimatedLoader />
                  </div>
                )}
                <img
                  style={{ opacity: loadingStates[0] ? 0 : 1 }}
                  className={styles.box__image}
                  src={srcImg ? srcImg : data && data.images[0]}
                  alt={`product ${data && data.title} image`}
                  loading="lazy"
                  onLoad={() => imgOnLoad(0, setLoadingStates)}
                />
              </picture>
              <div className={styles.img__box_list}>
                {data &&
                  data.images.length > 1 &&
                  data.images.map((el, index) => {
                    return (
                      <figure
                        tabIndex={0}
                        key={index}
                        className={styles.box__list_item}
                      >
                        <img
                          onClick={() => {
                            handleImgChange(data.images, index);
                          }}
                          className={styles.box__image}
                          src={el}
                          alt={`product ${data.title} mini image`}
                        />
                      </figure>
                    );
                  })}
              </div>
            </div>
            <article className={styles.content__text_box}>
              <div className={styles.box__title_container}>
                <h1 className={styles.title__container_text}>
                  {data && data.title}
                </h1>
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
              <div className={styles.text__box_amount}>
                <span className={styles.box__amount_text}>
                  {data && data.availabilityStatus}
                </span>
              </div>
              <p className={styles.text__box_description}>
                {data && data.description}
              </p>

              <div className={styles.text__box_other}>
                <span className={styles.text}>
                  {data && data.warrantyInformation}
                </span>
                <span className={styles.text}>
                  {data && data.shippingInformation}
                </span>
              </div>

              <div aria-label="buy" className={styles.text__box_buy}>
                <div className={styles.box__buy_prices}>
                  <div className={styles.buy__prices_price}>
                    <span className={styles.price_current}>
                      $
                      {data &&
                        productDiscounted(data.price, data.discountPercentage)}
                    </span>
                    <span className={styles.price_discount}>
                      ${data && data.price}
                    </span>
                  </div>
                  <span className={styles.box__buy_text}>
                    Your discount:
                    <p className={styles.text__bold}>
                      {data && data.discountPercentage}%
                    </p>
                  </span>
                </div>

                {quantity && quantity > 0 ? (
                  <AddProductQuantity productCount={quantity} />
                ) : (
                  <CustomButton tabIndex={0} buttonname={"Add to cart"} />
                )}
              </div>
            </article>
          </section>
        </main>
      )}
    </>
  );
}
