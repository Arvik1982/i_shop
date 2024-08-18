import SignIcon from "../../Icons/SignIcopn";
import styles from "./quantityButton.module.css";
interface ICountFunc {
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  action: string;
  currentCount: number;
  func: React.Dispatch<React.SetStateAction<number>>;
}
type TProps = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  action: string;
};
export default function QuantityButton({ count, setCount, action }: TProps) {
  const handleCount = (args: ICountFunc): void => {
    args.e.stopPropagation();

    if (args.action === "+") {
      args.currentCount !== null ? args.func((args.currentCount += 1)) : "";
    }
    if (args.action === "-") {
      args.currentCount !== null
        ? args.currentCount > 0 && args.func((args.currentCount -= 1))
        : "";
    }
  };

  return (
    <button
      aria-label="add to cart"
      onClick={(e) => {
        handleCount({
          e: e,
          action: `${action}`,
          currentCount: count,
          func: setCount,
        });
      }}
      className={`${
        count < 14
          ? styles.bottom__right_button
          : styles.bottom__right_button_large
      }`}
    >
      {action === "+" && <SignIcon sign={"+"} />}
      {action === "-" && <SignIcon sign={"-"} />}
    </button>
  );
}
