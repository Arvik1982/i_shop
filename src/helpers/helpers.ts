import { TProduct } from "../types/commonTypes";

export const productDiscounted = (price: number, discount: number) => {
  if (discount > 100) {
    return 0;
  }
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
export const quantityReturn = (products: TProduct[], id: string | undefined) => {
  const currentProductQuantity = products.find((product) => {
    return product.id === Number(id);
  });

  if (currentProductQuantity) {
    return currentProductQuantity.quantity;
  }
  if (!currentProductQuantity) {
    return 0;
  }
};