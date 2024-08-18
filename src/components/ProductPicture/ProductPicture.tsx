import { useState } from "react";
import AnimatedLoader from "../Loader/AnimatedLoader/AnimatedLoader";
import styles from "./productPicture.module.css";
import { imgOnLoad } from "../../helpers/onImgLoad";
import { TData } from "../../types/commonTypes";

type TProps = {
  srcImg: string;
  data: TData;
};
export default function ProductPicture({ srcImg, data }: TProps) {
  const [loadingStates, setLoadingStates] = useState(Array(1).fill(true));

  return (
    <picture className={styles.img__box_image}>
      {loadingStates[0] && (
        <div className={styles.box__image__loader}>
          <AnimatedLoader />
        </div>
      )}
      <img
        decoding="async"
        className={`${!loadingStates[0] ? styles.box__image : styles.hidden__image} `}
        src={srcImg ? srcImg : data && data.images[0]}
        alt={`product ${data && data.title} image`}
        loading="lazy"
        onLoad={() => imgOnLoad(0, setLoadingStates)}
      />
    </picture>
  );
}
