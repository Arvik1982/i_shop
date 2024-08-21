import { Dispatch, SetStateAction } from "react";
import { ICartData } from "../types/cartTypes";
import { TProduct } from "../types/commonTypes";

export const productDiscounted = (price: number, discount: number) => {
  return Math.round((price - (price * discount) / 100) * 100) / 100;
};

export const handleImgChange = (
  data: string[],
  index: number,
  setFunc: React.Dispatch<React.SetStateAction<string>>
) => {
  const currentSrc = data[index];
  setFunc(currentSrc);
};


