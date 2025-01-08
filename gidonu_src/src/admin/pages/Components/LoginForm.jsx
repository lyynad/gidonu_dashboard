import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import BackgroundBlur from "./BackgroundBlur";
import { createUser } from "../../helpers/helper";
import { jwtDecode } from "jwt-decode";
import useAuth from "../../auth/useAuth";
import { getAllAdmins } from "../../helpers/helper";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/images/onuLogo.png";
import check from "../../assets/images/checkBlack.png";
import close from "../../assets/images/close.png";
import "../../assets/css/LoginForm.css";
import axios from "axios";

const LoginForm = ({ setLoginFormShow }) => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getAllAdmins(setAdmins, setLoading);
  }, []);
  return (
    <div className="">
      <BackgroundBlur>
        <div className="relative">
          <div className="w-[1140px] h-[700px] flex  font-sans">
            <div className="w-[50%] h-full flex flex-col p-[50px] rounded-l-[16px] justify-between bg-[#5294A6]">
              <p className="text-[24px] text-[#fff]">Вітаємо!</p>
              <div className="flex items center gap-[38px] pt-[24px] items-center justify-center">
                <p className="text-[72px] font-bold text-[#fff]">ОНУ</p>
                <img src={logo} className="w-[105px] h-[105px]" />
              </div>
              <p></p>
            </div>
            <div className="w-[50%] h-full flex flex-col justify-between p-[50px] rounded-r-[16px] bg-white">
              <div className="flex flex-col gap-[120px] h-full items-center">
                <p className="text-[48px] text-[#8BAEB6] font-bold text-center">
                  Авторизуватися за поштою
                </p>
                <LoginButton
                  setLoginFormShow={setLoginFormShow}
                  admins={admins}
                />
              </div>
            </div>
          </div>
          <buttonn
            className="w-[40px] h-[40px] flex items-center justify-center cursor-pointer rounded-[8px] bg-[#5294A6] fixed top-[20px] right-[50px]"
            onClick={() => {
              setLoginFormShow(false);
            }}
          >
            <img className="w-[16px] h-[16px]" src={close} />
          </buttonn>
        </div>
      </BackgroundBlur>
    </div>
  );
};

export const CheckBox = () => {
  const [active, setActive] = useState(false);
  const onShowCheck = () => {
    setActive(!active);
  };

  return (
    <div className={`checkBox-border-active`} onClick={onShowCheck}>
      <div className={`checkBox-body-active`} onClick={onShowCheck}>
        <img
          src={check}
          onClick={onShowCheck}
          className={`w-[12px] h-[12px] ${active ? "visible" : "invisible"}`}
        />
      </div>
    </div>
  );
};

export default LoginForm;

export const LoginButton = ({ setLoginFormShow, admins }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();
  let data;
  const formatDate = (date) => {
    const padZero = (num) => String(num).padStart(2, "0");

    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  const now = new Date();
  const formattedDate = formatDate(now);
  let { from } = location.state || { from: { pathname: "/" } };
  const Login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${credentialResponse.access_token}`
        );
        data = res.data;
        setLoginFormShow(false);
      } catch (err) {
        console.log(err);
      } finally {
        const filteredArray = admins?.filter(
          (elem) => elem?.googleKey === data.sub
        );
        console.log();
        if (filteredArray.length > 0) {
          auth?.signin({
            name: data.name,
            email: data.email,
            dataRegistration: formattedDate,
            googleKey: data.sub,
            isTelegram: false,
            telegramId: "",
            isActive: true,
            isAdmin: false,
            isSuper: false,
          });
        } else {
          createUser(
            {
              name: data.name,
              email: data.email,
              dataRegistration: formattedDate,
              googleKey: data.sub,
              isTelegram: false,
              telegramId: "",
              isActive: true,
              isAdmin: false,
              isSuper: false,
            },
            setLoading
          );
          auth?.signin({
            name: data.name,
            email: data.email,
            dataRegistration: formattedDate,
            googleKey: data.sub,
            isTelegram: false,
            telegramId: "",
            isActive: true,
            isAdmin: false,
            isSuper: false,
          });
        }
        localStorage.setItem(
          "authData",
          JSON.stringify({
            name: data.name,
            email: data.email,
            dataRegistration: formattedDate,
            googleKey: data.sub,
            isTelegram: false,
            telegramId: "",
            isActive: true,
            isAdmin: false,
            isSuper: false,
          })
        );
        navigate("/");
      }
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  return (
    <>
      <button
        className="networksBtn flex justify-center gap-[8px] items-center "
        onClick={() => {
          Login();
        }}
      >
        <span className="text-[48px] font-bold leading-[25px] mb-[3px] text-[#4D8997]">
          G
        </span>
        <p className="text-[24px] text-[#4D8997]">Google</p>
      </button>
    </>
  );
};
