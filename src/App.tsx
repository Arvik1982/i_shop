import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AppRoutes from "./routes/AppRoutes";
import AnimatedLoader from "./components/Loader/AnimatedLoader/AnimatedLoader";
import { useGetUserQuery } from "./store/authApi/authApi";
import { RootState } from "./types/storeTypes";
import { useSelector } from "react-redux";

function App() {
  const [link, setLink] = useState("");
  const token = useSelector((state: RootState) => state.userSlice.token);
  const { error, isLoading } = useGetUserQuery(undefined, { skip: !token });

  return (
    <>
      <Header setLink={setLink} />
      {!isLoading && <AppRoutes setLink={setLink} link={link} />}
      {isLoading && (
        <>
          {" "}
          <AnimatedLoader /> <p>checking credentials...</p>
        </>
      )}
      {error && "status" in error && (
        <>
          <p>error:{error.status}</p>
        </>
      )}
      {token && <Footer setLink={setLink} />}
    </>
  );
}

export default App;
