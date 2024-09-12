import styles from "./animated.module.css";

export default function AnimatedLoader() {
  return (
    <div className={styles.loader__container}>
      <div className={styles.loader}></div>
      <p>Loading...</p>
    </div>
  );
}
