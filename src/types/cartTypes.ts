import { TProduct } from "./commonTypes";

export interface ICartData  {
 
    discountedTotal: number;
    id: number;
    products: Array<TProduct>;
    total: number;
    totalProducts: number;
    totalQuantity: number;
    userId: number;
  }

  export interface CartResponse {
    carts: ICartData[]; 
  }
  
  export interface CartState {
    status: "start" | "loading" | "resolved" | "rejected";
    error: string | null | undefined;
    cartData: ICartData | null;
  }