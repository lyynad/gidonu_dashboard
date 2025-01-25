import { getAllAdmins, updateUser } from "../../helpers/helper";
import { useState, useEffect } from "react";
import CheckBox from "../Components/CheckBox";
import GnProfileChange from '../Components/GnProfileChange';
import BackgroundBlur from "../Components/BackgroundBlur";

import './UsersPage.css';
import search from "../../assets/images/search.png";

const UsersPage = () => {
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [switchStates, setSwitchStates] = useState({});
  const [searchInput, setSearchInput] = useState("");

  const [selectedUser, setSelectedUser] = useState(0);
  const [userProfile, setUserProfile] = useState({});
  const [showUserCard, setShowUserCard] = useState(false);


  const handleUserCardClose = () => {
    setShowUserCard(false);
    setSelectedUser("0");
  };


  useEffect(() => {
    getAllAdmins(setAdmins, setLoading);

    document.addEventListener("mousedown", handleUserCardClose);

    return () => {
        document.removeEventListener("mousedown", handleUserCardClose);
    }
  }, []);
  
  const renderDate = (dateStr) => {
    const date = new Date(dateStr);
    const locale = "uk-UA";
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString(locale, options);
    const finalFormattedDate = formattedDate.replace(/,/g, "");
    return finalFormattedDate;
  };
  const handleSwitchChange = (childId, newSwitchState) => {
    setSwitchStates((prevSwitchStates) => ({
      ...prevSwitchStates,
      [childId]: newSwitchState,
    }));
  };
  useEffect(() => {
    if (admins) {
      setFilteredAdmins(admins);
    }
  }, [admins]);

  useEffect(() => {
    if (searchInput) {
      setFilteredAdmins(
        admins.filter(
          (admin) =>
            admin?.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
            admin?.email?.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    } else {
      setFilteredAdmins(admins);
    }
  }, [searchInput]);

  useEffect(() => {
    if(selectedUser !== 0){
      let profile = filteredAdmins.find((user) => user.id === selectedUser);
      
      if (profile){
        let sortedProfile = {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          userStatus: (profile.isActive === 0) ? "Inactive" : "Active",
          dataRegistration: renderDate(profile.dataRegistration),
          lastChangesDate: '20 квіт. 2024р.',
          applicationDate: '20 квіт. 2024р.',
          lastActivityDate: '20 квіт. 2024р.',
          telegram: '@temporary',
          isAdmin: profile.isAdmin,
          isSuper: profile.isSuper
        }

        setUserProfile(sortedProfile); 
        setShowUserCard(true);
      }
    }
  }, [selectedUser]);

  const handleUserCardShow = (id) => {
    setSelectedUser(id);
  };

  const handleProfileChange = async (newProfile) => {
    await updateUser(newProfile.id, newProfile.name, newProfile.email, newProfile.isAdmin, newProfile.isSuper);
    await getAllAdmins(setAdmins, setLoading);
  }

  return (
    <>
      {showUserCard &&
        <div 
          className="user-card user-card-maximized"
          style={{"zIndex": "2"}} 
          onMouseDown={(event) => {
            event.stopPropagation();
          }}
        >
          <GnProfileChange
            close={handleUserCardClose}
            userProfile={userProfile}
            handleProfileChange={handleProfileChange}
            isOwn={false}
          />
        </div>
      }
      {!showUserCard &&
        <div className="users-main">
          <div className="w-full px-[12px] flex items-center justify-between mb-[30px]">
            <div className="relative">
              <img src={search} className="absolute top-[12px] right-[30px]"/>
              <input
                placeholder={"Пошук"}
                onChange={(e) => {
                  setSearchInput(e?.target?.value);
                }}
                className="w-[300px] outline-none bg-[#D3D3D3] text-[#292929] pl-[25px] h-[43px] rounded-[10px] pr-[50px]"
              />
            </div>
            <button></button>
          </div>
          <div className="users-cont">
            <div className=" flex text-[22px]  h-[48px] border border-b-[#B1B1B1] bg-[#D9D9D9] shadow-[0_3px_1px_rgba(0,0,0,0.3)]">
              <div className="w-[50px] h-full border border-r-[#B1B1B1] flex items-center justify-center">
                <p>№</p>
              </div>

              <div className="w-[200px] text-center h-full border border-r-[#B1B1B1] flex items-center pl-[15px]">
                <p className=" ">Користувачі</p>
              </div>
              <div className="w-[280px] text-center h-full border border-r-[#B1B1B1] flex items-center pl-[15px]">
                <p className=" ">Email</p>
              </div>
              <div className="w-[215px] text-center h-full border border-r-[#B1B1B1] flex items-center pl-[15px]">
                <p className=" "> Дата реєстраціі</p>
              </div>
              <div className="w-[210px] text-center h-full border border-r-[#B1B1B1] flex items-center pl-[15px]">
                <p className=" ">Статус заявки</p>
              </div>
              <div className="w-[210px] h-full flex items-center pl-[15px]">
                <p className="">Роль</p>
              </div>
            </div>
            <div className="flex flex-col max-h-<75vh>">
              {filteredAdmins?.map((elem, i) => {
                return (
                  <div
                    key={i}
                    className={`h-[60px] border border-b-[#B1B1B1] flex cursor-pointer ${
                      switchStates[i] ? "bg-[#E1E4E7]" : "bg-[#E8E8E8]"
                    }`}
                    onClick={() => handleUserCardShow(elem.id)}
                  >
                    <div className="h-full w-[50px] flex items-center justify-center border border-r-[#B1B1B1]">
                      <p>{i + 1}</p>
                    </div>
                    <div className="h-full w-[200px] flex items-center border border-r-[#B1B1B1] pl-[15px]">
                      <p>{elem?.name}</p>
                    </div>
                    <div
                      className="h-full w-[280px] flex items-center border border-r-[#B1B1B1] overflow-hidden pl-[15px]">
                      <p>{elem?.email}</p>
                    </div>
                    <div className="h-full w-[215px] flex items-center border border-r-[#B1B1B1] pl-[15px]">
                      <p className="bg-[#5294a64d] rounded-lg pl-[15px] pr-[15px]">{renderDate(elem?.dataRegistration)}</p>
                    </div>
                    <div className="h-full w-[210px] flex items-center border border-r-[#B1B1B1] pl-[15px]">
                      <p className="bg-[rgba(150,214,179,0.45)] rounded-lg pl-[10px] pr-[10px]">Прийнята</p>
                    </div>
                    <div className="h-full w-[210px] flex items-center pl-[15px]">
                      <p>{elem.isAdmin ? "Адмін" : "Супер"}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      }
    </>

  );
};

export default UsersPage;
