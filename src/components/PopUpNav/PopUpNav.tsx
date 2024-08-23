// import styles from "./popUpNav.module.css";
// import { appTitleNav } from "../../mock/names";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { TPropsLink } from "../../types/propsTypes";
// import { onKeyEnterDown } from "../../helpers/onEnterClick";
// import { AppDispatch, RootState } from "../../types/storeTypes";
// import { useDispatch, useSelector } from "react-redux";
// import { getCartDataThunk } from "../../store/cartSlice/cartSlice";
// import { cartsHost } from "../../api/hosts";

// type TProps = {
//   menuArr: string[];
// } & TPropsLink;

// export default function PopUpNav({ menuArr, setLink }: TProps) {
//   const dispatch = useDispatch<AppDispatch>();
//   const { cartData } = useSelector((state: RootState) => state.cartSlice);
//   const [goodsInCart, setGoodsInCart] = useState<number | null>(null);

//   const menuNames = appTitleNav.filter((el) => {
//     return menuArr.includes(el.name);
//   });

//   const handleLinkClick = (el: string) => {
//     setLink(el);
//   };

//   useEffect(() => {
//     dispatch(getCartDataThunk(cartsHost));
//   }, [dispatch]);

//   useEffect(() => {
//     setGoodsInCart(cartData ? cartData.totalQuantity : null);
//   }, [cartData]);

//   return (
//     <nav className={styles.header__container_nav} aria-label="navigation menu">
//       {menuNames.map((el, index) => {
//         return (
//           <Link
//             tabIndex={0}
//             aria-label={`link to ${el.name} page`}
//             onKeyDown={(e) => {
//               onKeyEnterDown(e, () => handleLinkClick(el.name));
//             }}
//             onClick={() => {
//               handleLinkClick(el.name);
//             }}
//             key={index}
//             className={styles.container__nav_link}
//             to={`${el.path.toLowerCase()}`}
//           >
//             <div className={styles.container__nav_item}>
//               <span tabIndex={el.name !== "Cart" ? -1 : 0}>{el.name}</span>
//               {el.icon && <el.icon />}
//               {el.name === "Cart" && goodsInCart && cartData && (
//                 <div className={styles.nav__item_active}>{goodsInCart}</div>
//               )}
//             </div>
//           </Link>
//         );
//       })}
//     </nav>
//   );
// }
