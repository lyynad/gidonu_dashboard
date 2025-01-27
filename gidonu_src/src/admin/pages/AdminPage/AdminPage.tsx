import { useState, useEffect } from "react";

import users from "../../assets/images/svg/users.svg";
import photo from "../../assets/images/photo.png";
import bell from "../../assets/images/svg/bell.svg";
import usersWhite from "../../assets/images/svg/usersWhite.svg";
import logo from "../../assets/images/logo.png";
import logout from '../../assets/images/svg/logout.svg';
import user from '../../assets/images/svg/user.svg';
import "../../assets/css/AdminPage.css";
import "./AdminPage.css";
import UserMain from "../UserMain/UserMain";
import UsersPage from "../UsersPage/UsersPage";
import GnFeedBack from "../Feedback/GnFeedBack";
import Building from "../Buildings/Building";
import FacultiesPage from "../FacultiesPage/FacultiesPage";
import BuildingsPage from "../BuildingsPage/BuildingsPage";
import LogsPage from "../LogsPage/LogsPage";
import SvgSprite from "../../../gn-components/sprite/SvgSprite";
import { IUserProfile } from "../../helpers/interfaces";
import { getUser } from "../../helpers/helper";

export default function AdminPage() {
  const [userProfile, setUserProfile] = useState<IUserProfile>();
  const [userRequiresUpdate, setUserRequiresUpdate] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const id = 40;
        const currentUser = await getUser(id);
        setUserProfile(currentUser[0]);

        setAdminActiveTab(+localStorage.getItem("adminActiveTab")!,);
      } catch(error) {
        console.log(error);
      }
    };

      if(userRequiresUpdate){
        fetchData();
        setUserRequiresUpdate(false);
      }
  }, [userRequiresUpdate]);

  const handleUserRequiresUpdate = () => {
    setUserRequiresUpdate(true);
  }

  const [adminActiveTab, setAdminActiveTab] = useState<number>();
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
    "Факультети",
    "Історія"
  ];

  const icons: string[] = [
    "users",
    "feedback",
    "buildings",
    "departments",
    "departmentTypes",
    "faculties",
    "logs",
  ];

  function toUsers() {
    changeAdminActiveTab(0);
  };
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
        <>
          <UserMain userProfile={userProfile} handleUserRequiresUpdate={handleUserRequiresUpdate} />
          <div className="top-line h-[86px] absolute top-0 bg-[white] w-full ">
            <div className="line-user">
              <div className="txt">Вітаємо в особистому кабінеті</div>
              <div className="right-btns">
                <img className="btn-right" src={user}/>
                <img className="btn-right" src={logout}/>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="right flex items-center justify-center">
          <div className="top-line h-[86px] absolute top-0 bg-[white] w-full ">
            <div className="h-full w-[calc(100%-220px)] bg-[#fff] flex justify-between items-center pr-[50px] ">
              <div className="flex gap-[8px] cursor-pointer">
                <img src={photo} className="h-[66px]" onClick={toUsers} />
                <div className="flex flex-col justify-start gap-[5px]">
                  <div className="h-[16px] flex justify-end items-center">
                    <span className={`${userProfile?.isSuper ? "super" : "admin"} admin-flair  text-[16px] px-[1.5vw] rounded-[20px]`} style={{"fontFamily": "Roboto Mono"}}>
                      {userProfile?.isSuper ? "super admin" : "admin"}
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
          {adminActiveTab === 3 && <BuildingsPage />}
          {adminActiveTab === 6 && <FacultiesPage />}
          {adminActiveTab === 7 && <LogsPage />}
        </div>
      )}
    </div>
  );
}
