import styles from "./footer.module.css";

import { appTitle } from "../../mock/names";

import NavMenu from "../NavMenu/NavMenu";
import { TPropsLink } from "../../types/propsTypes";
import { useNavigate } from "react-router-dom";

export default function Footer({ setLink }: TPropsLink) {
  const navigate = useNavigate();
  return (
    <footer className={styles.footer__container}>
      <div className={styles.footer__container_box}>
        <div
          className={styles.footer__container_logo}
          aria-label="site logo"
          onClick={() => navigate("/")}
        >
          <span className={styles.container__logo_text}>
            {appTitle.appName}
          </span>
        </div>
        <NavMenu setLink={setLink} menuArr={["Catalog", "FAQ"]} />
      </div>
    </footer>
  );
}
