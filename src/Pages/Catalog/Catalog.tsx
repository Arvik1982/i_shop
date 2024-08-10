import About from "../../components/About/About";
import styles from "./catalog.module.css";
import Products from "../../components/Products/Products";
import AnswersFaq from "../../components/AnswersFaq/AnswersFaq";
import { TPropsLink } from "../../types/propsTypes";
import { Helmet } from "react-helmet-async";

export default function Catalog({ link, setLink }: TPropsLink) {
  return (
    <>
      <Helmet>
        <title>Catalog | Goods4you</title>
        <meta
          name="description"
          content="Any products from famous brands with worldwide delivery"
        />
      </Helmet>

      <main className={styles.catalog__container}>
        <About setLink={setLink} />
        <Products setLink={setLink} link={link} />
        <AnswersFaq setLink={setLink} link={link} />
      </main>
    </>
  );
}
