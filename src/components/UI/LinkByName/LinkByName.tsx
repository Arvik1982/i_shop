import { Link, useNavigate } from "react-router-dom";
import styles from "./linkByName.module.css";
import { onKeyEnterDown } from "../../../helpers/onEnterClick";

interface IProps {
  selectedElId: number;
  currentElId: number;
  navRef: string;
  text: string;
  typography: {
    font: string;
    fSize: string;
    fWeight: string;
    lHeight: string;
  };
}
export default function LinkByName({ ...props }: Partial<IProps>) {
  const navigate = useNavigate();
  return (
    <Link
      style={
        props.typography
          ? {
              fontFamily: `${props.typography.font}`,
              fontSize: `${props.typography.fSize}`,
              fontWeight: `${props.typography.fWeight}`,
              lineHeight: `${props.typography.lHeight}`,
            }
          : undefined
      }
      className={styles.item__title_link}
      aria-label={`link to cart page`}
      to={`${props.navRef}`}
      onKeyDown={(e) => {
        () => onKeyEnterDown(e, () => navigate(`${props.navRef}`));
      }}
    >
      <h3
        className={`${styles.item__title} ${
          props.selectedElId === props.currentElId || props.currentElId === 6
            ? styles.card__active
            : ""
        }`}
      >
        {props.text}
      </h3>
    </Link>
  );
}
