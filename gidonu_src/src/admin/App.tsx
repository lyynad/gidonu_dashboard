import { useState, useEffect } from "react";
import { getBuildings } from "./helpers/helper";
import useLoadingState from "./helpers/state/buildingsLoading";
import AdminPage from "./pages/AdminPage/AdminPage";
import LoginForm from "./pages/Components/LoginForm";

import "./App.css";
import porfile from "./assets/images/profile.png";

function App() {
  const [buildingsArr, setBuildingsArr] = useState([]);
  const { loading, setLoading } = useLoadingState();
  const [loginFormShow, setLoginFormShow] = useState(false);
  const [path, setPath] = useState("");

  useEffect(() => {
    getBuildings(setBuildingsArr, setLoading);
    setPath(window.location.pathname);
  }, []);
  useEffect(() => {
    window.localStorage.setItem("adminActiveTab", JSON.stringify(0));
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden relative bg-[#E8E8E8]">
      {path === "/gidonu_web/admin" && (
        <div
          className="flex flex-col items-center profile absolute  z-1 right-[10px] top-[10px] cursor-pointer"
          onClick={() => {
            setLoginFormShow(true);
          }}
        >
          <img src={porfile} alt="Profile" className="w-[22px] h-[22px]" />
          <p className="text-[13px]">Увійти</p>
        </div>
      )}

      {loginFormShow && <LoginForm setLoginFormShow={setLoginFormShow} />}
      <AdminPage />
    </div>
  );
}

export default App;
