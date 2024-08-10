import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [link, setLink] = useState("");
  return (
    <>
      <Header setLink={setLink} />
      <AppRoutes setLink={setLink} link={link} />
      <Footer setLink={setLink} />
    </>
  );
}

export default App;
