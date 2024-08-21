import { appTitle } from "../../mock/names";
import styles from "./header.module.css";
import NavMenu from "../NavMenu/NavMenu";
import { useNavigate } from "react-router-dom";
import { TPropsLink } from "../../types/propsTypes";
import { onKeyEnterDown } from "../../helpers/onEnterClick";
import { useSelector } from "react-redux";
import { RootState } from "../../types/storeTypes";

export default function Header({ setLink }: TPropsLink) {
  const navigate = useNavigate();
  const token = useSelector((state:RootState) => state.userSlice.token)
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

        {token&&<NavMenu
          setLink={setLink}
          menuArr={["Catalog", "FAQ", "Cart", "Johnson Smith"]}
        />}
      </div>
      <div className={styles.header__container_underline}></div>
    </header>
  );
}
