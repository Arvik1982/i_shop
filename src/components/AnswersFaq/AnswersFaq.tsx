import { useEffect, useRef, useState } from "react";
import styles from "./answers.module.css";
import AnswerElement from "./AnswerElement";
import { TPropsLink } from "../../types/propsTypes";

export default function AnswersFaq({ link, setLink }: TPropsLink) {
  const [openAnswerArr, setOpenAnswerArr] = useState<Array<number>>([]);
  const focusOnFAQ = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (link === "FAQ") {
      focusOnFAQ.current &&
        focusOnFAQ.current.scrollIntoView({ behavior: "smooth" });
    }

    setLink("");
  }, [link]);
  const handleAnswerShow = (
    openedArr: Array<number>,
    currentItem: number
  ): void => {
    openedArr.includes(currentItem)
      ? setOpenAnswerArr(
          openAnswerArr.filter((el) => {
            return el !== currentItem;
          })
        )
      : setOpenAnswerArr([...openedArr, currentItem]);
  };

  return (
    <section
      tabIndex={0}
      aria-label="questions ahd answers"
      className={styles.catalog__container_bottom}
    >
      <article className={styles.container__bottom_faq}>
        <h2 tabIndex={0} ref={focusOnFAQ} className={styles.bottom__faq_title}>
          FAQ
        </h2>
        <AnswerElement
          openAnswerArr={openAnswerArr}
          handleAnswerShow={handleAnswerShow}
        />
      </article>
    </section>
  );
}
