import styles from "./navMenu.module.css";
import { appTitleNav } from "../../mock/names";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLinkId } from "../../store/navigationSlice/navSlice";
import { TPropsLink } from "../../types/propsTypes";
import { onKeyEnterDown } from "../../helpers/onEnterClick";

type TProps = {
  menuArr: string[];
} & TPropsLink;

export default function NavMenu({ menuArr, setLink }: TProps) {
  const [goodsInCart] = useState(1);

  const dispatch = useDispatch();

  const menuNames = appTitleNav.filter((el) => {
    return menuArr.includes(el.name);
  });
  const handleLinkClick = (el: string) => {
    dispatch(setLinkId(el));
    setLink(el);
  };
  return (
    <nav className={styles.header__container_nav} aria-label="navigation menu">
      {menuNames.map((el, index) => {
        return (
          <Link
            tabIndex={0}        
            aria-label={`link to ${el.name} page`}
            onKeyDown={(e) => {
              onKeyEnterDown(e, () => handleLinkClick(el.name));
            }}
            onClick={() => {
              handleLinkClick(el.name);
            }}
            key={index}
            className={styles.container__nav_link}
            to={`${el.path.toLowerCase()}`}
          >
            <div  className={styles.container__nav_item}>
              <div tabIndex={el.name!=='Cart'?-1:0}>{el.name}</div>
              {el.icon && <el.icon />}
              {el.name === "Cart" && goodsInCart && (
                <div className={styles.nav__item_active}>{goodsInCart}</div>
              )}
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
