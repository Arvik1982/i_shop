import styles from "./navMenu.module.css";
import { appTitleNav } from "../../mock/names";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TPropsLink } from "../../types/propsTypes";
import { onKeyEnterDown } from "../../helpers/onEnterClick";
import { AppDispatch, RootState } from "../../types/storeTypes";
import { useDispatch, useSelector } from "react-redux";
import { getCartDataThunk } from "../../store/cartSlice/cartSlice";
import { cartsHost } from "../../api/hosts";
import { useGetUserQuery } from "../../store/authApi/authApi";
import { setTokenError } from "../../store/userSlice/userSlice";
import { IUser } from "../../types/userTypes";

type TProps = {
  menuArr: string[];
  userNames?: IUser | null;
} & TPropsLink;

export default function NavMenu({ menuArr, setLink, userNames }: TProps) {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.userSlice.token);
  const {
    data: user,
    error,
    isLoading,
  } = useGetUserQuery(undefined, { skip: !token });
  const { cartData } = useSelector((state: RootState) => state.cartSlice);
  const [goodsInCart, setGoodsInCart] = useState<number | null>(null);

  const menuNames = appTitleNav.filter((el) => {
    return menuArr.includes(el.name);
  });

  const handleLinkClick = (el: string) => {
    setLink(el);
  };

  const userId = user?.id;

  useEffect(() => {
    if (!isLoading && userId && token) {
      const cartApiUrl = `${cartsHost}/user/${userId}`;

      dispatch(getCartDataThunk(`${cartApiUrl}`));
    }

    if (error && "status" in error) {

      error.status === 401 && dispatch(setTokenError());
    }
  }, [dispatch, userId, isLoading]);

  useEffect(() => {
    token && setGoodsInCart(cartData?.totalQuantity ?? 0);
  }, [cartData]);

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
            <div className={styles.container__nav_item}>
              <span tabIndex={el.name !== "Cart" ? -1 : 0}>{el.name}</span>
              {el.icon && <el.icon />}
              {el.name === "Cart" && goodsInCart && cartData && (
                <div className={styles.nav__item_active}>{goodsInCart}</div>
              )}
            </div>
          </Link>
        );
      })}
      {userNames && (
        <p className={styles.container__nav_names}>
          <span>{userNames.firstName}</span> <span>{userNames.lastName}</span>
        </p>
      )}
    </nav>
  );
}
