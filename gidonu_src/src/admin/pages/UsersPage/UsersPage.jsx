import { getAllAdmins, } from "../../helpers/helper";
import { useState, useEffect } from "react";

import UserCard from '../Components/UserCard';
import PaginationTable from "../Components/PaginationTable";

import './UsersPage.css';
import '../Components/UserCard.css';

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

  useEffect(() => {
    getAllAdmins(setAdmins, setLoading);
  }, []);
  
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
        setUserProfile(profile); 
        setShowUserCard(true);
      }
    }
  }, [selectedUser]);

  const handleUserCardShow = (id) => {
    setSelectedUser(id);
  };
  const handleUserCardClose = () => {
    setShowUserCard(false);
    setSelectedUser("0");
  };

  const handleProfileChange = async () => {
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
          <UserCard
            close={handleUserCardClose}
            userProfile={userProfile}
            updateData={handleProfileChange}
            isOwn={false}
          />
        </div>
      }
      {!showUserCard &&
        <div className="users-main">
          <div className="w-full px-[12px] flex items-center justify-between mb-[20px]">
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
          
          {filteredAdmins.length > 0 &&
            <PaginationTable 
              headers={["№ користувача", "Email", "Дата реєстрації", "Статус заявки", "Роль"]}
              body={filteredAdmins}
              onclick={handleUserCardShow}
            />
          }
      </div>
      }
    </>
  );
};

export default UsersPage;
