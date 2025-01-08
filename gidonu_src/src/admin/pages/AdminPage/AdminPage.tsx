import { useState } from "react";

import users from "../../assets/images/svg/users.svg";
import photo from "../../assets/images/photo.png";
import bell from "../../assets/images/svg/bell.svg";
import usersWhite from "../../assets/images/svg/usersWhite.svg";
import logo from "../../assets/images/logo.png";
import "../../assets/css/AdminPage.css";
import "./AdminPage.css";
import UserMain from "../UserMain/UserMain";
import UsersPage from "../UsersPage/UsersPage";
import GnFeedBack from "../Feedback/GnFeedBack";
import Building from "../Buildings/Building";
import SvgSprite from "../../../gn-components/sprite/SvgSprite";
export default function AdminPage() {
  const [adminActiveTab, setAdminActiveTab] = useState<number>(
    +localStorage.getItem("adminActiveTab")!,
  );
  const changeAdminActiveTab = (num: number) => {
    setAdminActiveTab(num);
    localStorage.setItem("adminActiveTab", num.toString());
  };

  const menuElements: string[] = [
    "Користувачі",
    "Зворотній зв'язок",
    "Корпуси",
    "Відділи",
    "Типи відділів",
  ];

  const icons: string[] = [
    "users",
    "feedback",
    "buildings",
    "departments",
    "departmentTypes",
  ];

  function toUsers() {
    changeAdminActiveTab(0);
  }
  return (
    <div className="size-full flex flex-row">
      <div className="admin-main h-full relative w-max">
        <div className="line left-0 h-full bg-[#5294A6] flex flex-col rounded-r-[40px] w-[270px]">
          <a className="logo" href="/gidonu_web">
            <img src={logo} className="logotype" />
            ОНУ
          </a>
          <div className="h-full flex flex-col items-end justify-center">
            <div className="">
              <div className="w-full flex flex-col gap-4 justify-center">
                {menuElements.map((elem, index) => (
                  <div
                    key={`Menu_${index}`}
                    className={`w-64 cursor-pointer flex ${
                      adminActiveTab === index + 1
                        ? "bg-[#fff] rounded-l-[30px]"
                        : ""
                    } tab-elem justify-start pl-[20px] items-center gap-6`}
                    onClick={() => {
                      changeAdminActiveTab(index + 1);
                    }}
                  >
                    <SvgSprite
                      name={icons[index]}
                      className={
                        adminActiveTab === index + 1
                          ? "text-black w-8 h-8"
                          : "text-white w-8 h-8"
                      }
                    />
                    <p
                      className={`text-[20px] ${
                        adminActiveTab === index + 1
                          ? "text-[black]"
                          : "text-[white]"
                      }`}
                    >
                      {elem}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {adminActiveTab === 0 ? (
        <UserMain />
      ) : (
        <div className="right flex items-center justify-center">
          <div className="top-line h-[86px] absolute top-0 bg-[white] w-full ">
            <div className="h-full w-[calc(100%-220px)] bg-[#fff] flex justify-between items-center pr-[50px] ">
              <div className="flex gap-[8px] cursor-pointer">
                <img src={photo} className="h-[66px]" onClick={toUsers} />
                <div className="flex flex-col justify-start gap-[5px]">
                  <div className="h-[16px] flex justify-end items-center">
                    <span className="  text-[16px] bg-[#F5E2E2] px-[10px] rounded-[20px] ">
                      super admin
                    </span>
                  </div>
                  <p className="text-[20px] font-[500]">Admin</p>
                </div>
              </div>
              <img src={bell} />
            </div>
          </div>
          {adminActiveTab === 1 && <UsersPage />}
          {adminActiveTab === 2 && <GnFeedBack />}
          {adminActiveTab === 3 && <Building />}
        </div>
      )}
    </div>
  );
}
