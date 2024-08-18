import { handleImgChange } from "../../helpers/helpers";
import { TData } from "../../types/commonTypes";
import styles from "./pictureFeed.module.css";
type TProps = {
  setSrcImg: React.Dispatch<React.SetStateAction<string>>;
  data: TData;
};
export default function PictureFeed({ data, setSrcImg }: TProps) {
  return (
    <div className={styles.img__box_list}>
      {data &&
        data.images.length > 1 &&
        data.images.map((el, index) => {
          return (
            <picture tabIndex={0} key={index} className={styles.box__list_item}>
              <img
                loading="lazy"
                decoding="async"
                onClick={() => {
                  handleImgChange(data.images, index, setSrcImg);
                }}
                className={styles.box__image}
                src={el}
                alt={`product ${data.title} mini image`}
              />
            </picture>
          );
        })}
    </div>
  );
}
