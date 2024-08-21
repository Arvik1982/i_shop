import { Helmet } from "react-helmet-async";
import ProductInLine from "../../components/ProductInLine/ProductInLine";
import styles from "./cart.module.css";
import { useSelector } from "react-redux";
import { ICartData } from "../../types/cartTypes";
import { TProduct } from "../../types/commonTypes";
import { RootState } from "../../types/storeTypes";


export default function Cart() {
  // const dispatch = useDispatch<AppDispatch>();
  const { status, error, cartData } = useSelector(
    (state: RootState) => state.cartSlice

   
  );

  console.log('cart', cartData)
  // const token = useSelector((state: RootState) => state.userSlice.token);

  // const [toDelete, setToDelete] = useState<number[]>([]);


  // const [newCart, setNewCart] = useState(null);

  

  // const quantityProductsArr = cartData?.products.map((el) => ({
  //   id: el.id,
  //   quantity: toDelete.includes(el.id) ? 0 : el.quantity,
  // }));



  // useEffect(() => {
  //   console.log(quantityProductsArr);

  //   quantityProductsArr &&
  //     setNewCart({
  //       ...newCart,

  //       merge: false,

  //       products: quantityProductsArr,
  //     });
  // }, [toDelete]);

  // useEffect(() => {
  //   if (newCart) {
  //     dispatch(
  //       updateCartDataThunk({
  //         host: cartsUpdateHost,
  //         token,
  //         updateData: newCart,
  //       })
  //     );
  //   }
  // }, [newCart]);

  
  const toDeleteNumber = cartData?.products.filter((el)=>{return el.quantity===0}).length

  


  const totalPriceWithoutDiscount = (cartData: ICartData): number => {
    let result = 0;
    cartData.products.forEach((product: TProduct) => {
      result += product.price * product.quantity;
    });
    return Math.round(result * 100) / 100;
  };

  const totalDiscountedPrice = (cartData: ICartData): number => {
    let result = 0;
    cartData.products.forEach((product: TProduct) => {
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
          cartData.products.map((product, index) => {
            return (
              <link
                key={index}
                rel="preload"
                href={product.thumbnail}
                as="image"
              />
            );
          })}

        {cartData &&
          cartData.products.map((product, index) => {
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
            {cartData?.products.map((product, index) => {
              return (
                <article className={styles.left__product_box} key={index}>
                  {" "}
                  <ProductInLine
                    key={index}
                    item={product}
                  />
                </article>
              );
            })}
          </section>
          <section className={styles.container__content_right}>
            <div className={styles.content__right_common}>
              <div className={styles.right__common_item}>
                <span className={styles.common__item_title}>Total count</span>
                <span className={styles.common__item_value}>
                  {cartData?.totalProducts-(toDeleteNumber&&toDeleteNumber||0)} items
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
