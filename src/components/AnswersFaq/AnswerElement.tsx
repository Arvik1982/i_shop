import styles from "./answers.module.css";
import { faq } from "../../mock/faq";
import PlusIcon from "../Icons/PlusIcon";
import { useEffect, useState } from "react";

type TProps = {
  openAnswerArr: number[];
  handleAnswerShow: Function;
} & React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;
export default function AnswerElement({
  openAnswerArr,
  handleAnswerShow,
}: TProps) {
  const [faqData, setFaqData] = useState<typeof faq>([]);

  const rotateStyle = {
    transform: "rotate(90deg)",
    transition: "0.3s",
    WebkitTransform: "rotate(90deg)",
    MozTransform: "rotate(90deg)",
    OTransform: "rotate(90deg)",
    msTransform: "rotate(90deg)",
    WebkitTransition: "0.3s",
    MozTransition: "0.3s",
    OTransition: "0.3s",
    msTransition: "0.3s",
  };

  useEffect(() => {
    faq ? setFaqData(faq) : "";
  }, [faq]);

  return (
    <>
      {faqData?.map((el, index) => {
        return (
          <label
            tabIndex={0}
            key={index}
            aria-label="click to open or close question answer"
            className={styles.faq__item_container}
            onKeyDown={() => {
              el && handleAnswerShow(openAnswerArr, el.id);
            }}
            onClick={() => {
              el && handleAnswerShow(openAnswerArr, el.id);
            }}
            htmlFor="faq"
          >
            <div
              id="faq"
              key={index}
              className={`${styles.faq__item_container} 
              ${
                el && openAnswerArr.includes(el.id)
                  ? styles.faq__item_container_open
                  : {}
              }
              
              `}
            >
              <div className={styles.bottom__faq_item}>
                <h3 className={styles.faq__item_h3}>{el && el.question}</h3>
                <div
                  style={el && openAnswerArr.includes(el.id) ? rotateStyle : {}}
                  className={styles.faq__item_show}
                >
                  <PlusIcon />
                </div>
              </div>
              {el && openAnswerArr.includes(el.id) && (
                <p
                  className={`${
                    el && openAnswerArr.includes(el.id)
                      ? styles.faq__item_answer
                      : styles.faq__item_answer_hide
                  }`}
                >
                  {el.answer}
                </p>
              )}
              {!(el && openAnswerArr.includes(el.id)) && (
                <p className={`${styles.faq__item_answer_hide}`}>
                  {el && el.answer}
                </p>
              )}
            </div>
          </label>
        );
      })}
    </>
  );
}
