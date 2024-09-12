import styles from "./quantityNumber.module.css";

type TProps = { count: number };
export default function QuantityNumber({ count }: TProps) {
  return (
    <span className={styles.change__box_count}>
      {count !== null ? `${count} item` : "0 item"}
    </span>
  );
}
