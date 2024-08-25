import { Route, Routes } from "react-router-dom";
import Catalog from "../Pages/Catalog/Catalog";
import ErrorPage from "../Pages/Error/ErrorPage";
import Cart from "../Pages/Cart/Cart";
import { TPropsLink } from "../types/propsTypes";
import Product from "../Pages/Product/Product";
import { ProtectedRoute } from "./ProtectedRoute";
import Authorization from "../Pages/Authorization/Auth";
import { LoginRedirect } from "./LoginRedirect";
import { useGetUserQuery } from "../store/authApi/authApi";

export default function AppRoutes({ link, setLink }: TPropsLink) {




  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Catalog link={link} setLink={setLink} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />
      </Route>
      <Route element={<LoginRedirect />}>
        <Route path="/login" element={<Authorization />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
