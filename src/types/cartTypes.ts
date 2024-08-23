import { TProduct } from "./commonTypes";

export interface ICartData {
  discountedTotal?: number|undefined;
  id?: number|undefined;
  products?: Array<TProduct>;
  total?: number|undefined;
  totalProducts?: number|undefined;
  totalQuantity?: number|undefined;
  userId?: number|undefined;
}

export interface CartResponse {
  carts: ICartData[];
  error:{
    status:number
  }
  discountedTotal: number;
  id: number;
  products: Array<TProduct>;
  total: number;
  totalProducts: number;
  totalQuantity: number;
  userId: number;
}

export interface CartState {
  status: "start" | "loading" | "resolved" | "rejected"|"loadUpdate" | "resolveUpdate" | "rejectUpdate"
  error: string | null | undefined
  cartData: ICartData | null;
  leftItemsArr:TProduct[] | null;
}
