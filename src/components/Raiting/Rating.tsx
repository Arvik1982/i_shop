import styles from "./rating.module.css";

export type TProps = {
  value: number;
};

export default function Rating({ value }: TProps) {
  const rating = (value: number) => {
    if (value <= 10) {
      return Math.round(value) * 20;
    }
    if (value > 10) {
      return 100;
    }
  };

  return (
    <div className={styles.container__content_rating}>
      <div
        aria-label={`rating of product ${value && rating(value)}% from ten`}
        className={styles.rating__body}
      >
        <div role="progressbar"
          style={{ width: `${Math.round(value) * 20}%` }}
          className={styles.rating__body_active}
        ></div>
        <div className={styles.rating__body_items}>
          <input
            type="radio"
            value={1}
            name="rating"
            className={styles.rating__body_item}
          />
          <input
            type="radio"
            value={2}
            name="rating"
            className={styles.rating__body_item}
          />
          <input
            type="radio"
            value={3}
            name="rating"
            className={styles.rating__body_item}
          />
          <input
            type="radio"
            value={4}
            name="rating"
            className={styles.rating__body_item}
          />
          <input
            type="radio"
            value={5}
            name="rating"
            className={styles.rating__body_item}
          />
        </div>
      </div>
    </div>
  );
}
