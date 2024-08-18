import { productDiscounted } from "../../helpers/helpers";
import { TData } from "../../types/commonTypes";
import AddProductQuantity from "../AddProductQuantity/AddProductQuantity";
import CustomButton from "../UI/CustomButton/CustomButton";
import styles from "./buyProduct.module.css";

type TProps = {
  quantity?: number;
  data: TData;
};

export default function BuyProduct({ data, quantity }: TProps) {
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

      {quantity && quantity > 0 ? (
        <AddProductQuantity productCount={quantity} />
      ) : (
        <CustomButton tabIndex={0} buttonname={"Add to cart"} />
      )}
    </article>
  );
}
