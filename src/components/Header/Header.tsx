import { appTitle } from "../../mock/names";
import styles from "./header.module.css";
import NavMenu from "../NavMenu/NavMenu";
import { useNavigate, useParams } from "react-router-dom";
import { TPropsLink } from "../../types/propsTypes";
import { onKeyEnterDown } from "../../helpers/onEnterClick";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../types/storeTypes";
import {
  useGetUserQuery,
  // useSendRefreshMutation,
} from "../../store/authApi/authApi";
import { useEffect, useState } from "react";
import { IUser } from "../../types/userTypes";
import { setTokenError } from "../../store/userSlice/userSlice";

export default function Header({ setLink }: TPropsLink) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.userSlice.token);
  const { data: user } = useGetUserQuery(undefined, { skip: !token });

  //refresh token
  // const [sendRefresh] = useSendRefreshMutation();
  // useEffect(() => {
  //   if (error && "status" in error) {
  //     if (error.status === 401) {
  //       console.log("refreshing token...");
  //       const refreshToken = async () => {
  //         try {
  //           await sendRefresh(undefined).unwrap();
  //         } catch (refreshError) {
  //           console.error("Failed to refresh token:", refreshError);
  //         }
  //       };
  //       refreshToken();
  //     }
  //   }
  // }, [error]);

  const [userNames, setUserNames] = useState<IUser | null>(null);
  const params = useParams();

  useEffect(() => {
    const lsToken = localStorage.getItem("token");
    if (!lsToken) {
      dispatch(setTokenError());
    }
  }, [params]);

  useEffect(() => {
    user && setUserNames(user);
  }, [user]);

  return (
    <header className={styles.header__container}>
      <div className={styles.header__container_box}>
        <div
          tabIndex={0}
          aria-label={"site logo navigate home page"}
          onClick={() => navigate("/")}
          onKeyDown={(e) => {
            onKeyEnterDown(e, navigate("/"));
            setLink("Catalog");
          }}
          className={styles.header__container_logo}
        >
          <a className={styles.container__logo_text}>{appTitle.appName}</a>
        </div>

        {user && token && (
          <NavMenu
            setLink={setLink}
            menuArr={["Catalog", "FAQ", "Cart"]}
            userNames={userNames}
          />
        )}
      </div>
      <div className={styles.header__container_underline}></div>
    </header>
  );
}
