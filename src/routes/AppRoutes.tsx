import { Route, Routes } from "react-router-dom";
import Catalog from "../Pages/Catalog/Catalog";
import ErrorPage from "../Pages/Error/ErrorPage";
import Cart from "../Pages/Cart/Cart";
import { TPropsLink } from "../types/propsTypes";
import Product from "../Pages/Product/Product";

export default function AppRoutes({ link, setLink }: TPropsLink) {
  return (
    <Routes>
      <Route path="/" element={<Catalog link={link} setLink={setLink} />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
