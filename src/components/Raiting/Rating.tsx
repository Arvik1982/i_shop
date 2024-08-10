import styles from "./rating.module.css";

export default function Rating() {
  const rating = 8;

  return (
    <div className={styles.container__content_rating}>
      <div
        aria-label={`rating of product ${rating} from ten`}
        className={styles.rating__body}
      >
        <div
          style={{ width: `${70}%` }}
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
