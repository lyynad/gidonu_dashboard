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
  const [parameterPage, setParameterPage] = useState<string | null>();

  useEffect(() => {
    const getQueryParams = () => {
      const searchParams = new URLSearchParams(window.location.search);
      return searchParams.get('page');
    };

    const originalPushState = window.history.pushState;

    window.history.pushState = (...args) => {
      originalPushState.apply(window.history, args);
      setParameterPage(getQueryParams());
    };
    
    setParameterPage(getQueryParams());

    const handlePopState = () => {
      setParameterPage(getQueryParams());
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const id = 40;
        const currentUser = await getUser(id);
        setUserProfile(currentUser[0]);
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

  return (
    <div className="size-full flex items-center justify-center" style={{"containerType": "inline-size", "width": "100%", "height": "100%"}}>
      {userProfile && (
        <>
          {parameterPage === null && <UserMain userProfile={userProfile} handleUserRequiresUpdate={handleUserRequiresUpdate} />}
          {parameterPage === "users" && <UsersPage />}
          {parameterPage === "feedback" && <GnFeedBack />}
          {parameterPage === "corps" && <BuildingsPage />}
          {parameterPage === "faculties" && <FacultiesPage />}
          {parameterPage === "history" && <LogsPage />}
        </>
      )}
    </div>
  );
}