// import { ICartData } from "../types/cartTypes";

// export const handleAddProductRtk = async (

//     const cartId = cartData && cartData.id;
//     const [addNewProductToCart, { isLoading, error: addError }] =
//     useAddNewProductToCartMutation();
//     token &&cartData &&handleAddProductRtq(cartData, product.id)


//     cart: ICartData,
//     id: number
//   ) => {
//     const updatedCartData = { ...cart };
//     const newProducts = [...updatedCartData.products, { id: id, quantity: 1 }];

//     try {
//       console.log(id, updatedCartData, newProducts);
//       const result = await addNewProductToCart({
//         cartId,
//         newProducts,
//       }).unwrap();

//       console.log("Product added successfully!", result);
//     } catch (err) {
//       console.error("Failed to add product: ", err);
//     }
//   };