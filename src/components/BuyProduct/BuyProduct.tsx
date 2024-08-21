import { useSelector } from "react-redux";
import { productDiscounted } from "../../helpers/helpers";
import { TData } from "../../types/commonTypes";
import { RootState } from "../../types/storeTypes";
import AddProductQuantity from "../AddProductQuantity/AddProductQuantity";
import AddToCartButton from "../UI/AddToCartButton/AddToCardButton";
import CustomButton from "../UI/CustomButton/CustomButton";
import styles from "./buyProduct.module.css";

type TProps = {
  quantity?: number;
  data: TData;
};

export default function BuyProduct({ data }: TProps) {

  const { error, cartData } = useSelector(
    (state: RootState) => state.cartSlice
  );


  return (
    <article aria-label="buy" className={styles.text__box_buy}>
      <section className={styles.box__buy_prices}>
        <div className={styles.buy__prices_price}>
          <span className={styles.price_current}>
            ${data && productDiscounted(data.price, data.discountPercentage)}
          </span>
          <span className={styles.price_discount}>${data && data.price}</span>
        </div>
        <p className={styles.box__buy_text}>
          Your discount:
          <span className={styles.text__bold}>
            {data && data.discountPercentage}%
          </span>
        </p>
      </section>
      <AddToCartButton myType='text' product={data} />
      {/* {quantity && quantity > 0 ? (
        <AddProductQuantity productCount={quantity} />
      ) : (
        <CustomButton tabIndex={0} buttonname={"Add to cart"} />
      )} */}
    </article>
  );
}
