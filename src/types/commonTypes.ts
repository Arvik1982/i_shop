export type TProduct = {
  discountPercentage: number;
  discountedTotal: number;
  id: number;
  price: number;
  quantity: number;
  thumbnail: string;
  title: string;
  total: number;
};

export type TSingleProduct = {
 data: {
  availabilityStatus: string;
  brand: string;
  category: string;
  description: string;
  dimensions: object;
  discountPercentage: number;
  id: number;
  images: string[];
  meta: object;
  minimumOrderQuantity: 9;
  price: number;
  rating: number;
  returnPolicy: string;
  reviews: Array<{}>;
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: Array<string>;
  thumbnail: string;
  title: string;
  warrantyInformation: string;
  weight: number;
}
isLoading: boolean
error: {
  data: { message: string };
  status: number;
};

};
