import { useState, useEffect } from "react";
import { getBuildings } from "./helpers/helper";
import useLoadingState from "./helpers/state/buildingsLoading";
import AdminPage from "./pages/AdminPage/AdminPage";
import LoginForm from "./components/LoginForm";

import "./App.css";
import porfile from "./assets/images/profile.png";

function App() {
  const [loginFormShow, setLoginFormShow] = useState(false);
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  return (
    <AdminPage />
  );
}

export default App;
