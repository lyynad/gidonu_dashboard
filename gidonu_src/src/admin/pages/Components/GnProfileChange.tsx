import "./GnProfileChange.css";

import { useEffect, useState } from "react";
import { updateUser, deleteUser } from "../../helpers/helper";
import { IUserProfile } from "../../helpers/interfaces";

import GnInput from "./GnInput";
import GeneralConfirmWindow from "./GeneralConfirmWindow";

import avatar from "../../assets/images/svg/photo-b.svg";
import avatarEdit from "../../assets/images/svg/avatar-edit.svg";
import tick from "../../assets/images/tick.svg";
import cross from "../../assets/images/cross.svg";
import dottedMenu from "../../assets/images/svg/dot-menu.svg";
import edit from '../../assets/images/svg/edit-b.svg';
import deleteImg from '../../assets/images/svg/delete-b.svg';
import blockedImg from "../../assets/images/svg/image-blocked.svg";
import deletedImg from "../../assets/images/svg/image-deleted.svg";
import GnSwitch from "../../../gn-components/switch/GnSwitch";

interface GnProfileChangeProps {
  close: () => void,
  userProfile: IUserProfile,
  updateData: () => void,
  isOwn: boolean
}

export default function GnProfileChange({close, userProfile, updateData, isOwn}: GnProfileChangeProps) {
  const [name, setName] = useState<string>(userProfile.name);
  const [email, setEmail] = useState<string>(userProfile.email);
  const [lastChangesDate, setLastChangesDate] = useState<string>(userProfile.lastChangesDate);
  const [isAdmin, setIsAdmin] = useState<boolean>(userProfile.isAdmin);
  const [isSuper, setIsSuper] = useState<boolean>(userProfile.isSuper);
  const [isTelegram, setIsTelegram] = useState<boolean>(userProfile.isTelegram);
  const [isActive, setIsActive] = useState<boolean>(userProfile.isActive);


  const [isBeingDeleted, setIsBeingDeleted] = useState<boolean>(false);

  const [showMenu, setShowMenu] = useState<boolean>(false);
  
  const [showConfirmWindow, setShowConfirmWindow] = useState<boolean>(false);
  const [isActionEdit, setIsActionEdit] = useState<boolean>(false);
  const [isActionBlock, setIsActionBlock] = useState<boolean>(false);
  const [isActionDelete, setIsActionDelete] = useState<boolean>(false);

  const [newProfile, setNewProfile] = useState<IUserProfile>(userProfile); 

  useEffect(() => {
    const handleHideMenu = () => {
      setShowMenu(false);
    };

    document.querySelector(".user-card")?.addEventListener("mousedown", handleHideMenu);
    document.querySelector(".user-card-menu")?.addEventListener("mousedown", (e) => {
      e.stopPropagation();
    });

    return () => {
      document.querySelector(".user-card")?.removeEventListener("mousedown", handleHideMenu);
    }
  }, []);

  useEffect(() => {
    if (name !== userProfile.name || email !== userProfile.email || isAdmin !== userProfile.isAdmin || isSuper !== userProfile.isSuper || isTelegram !== userProfile.isTelegram || isActive !== userProfile.isActive){
    const newData: IUserProfile = {
      ...userProfile,
      name: name,
      email: email,
      isAdmin: isAdmin,
      isSuper: isSuper,
      isTelegram: isTelegram,
      isActive: isActive
    };

      setIsActionEdit(true);
      setNewProfile(newData);
    }
    else
      setIsActionEdit(false);
  }, [name, email, isAdmin, isSuper, isTelegram, isActive]);

  useEffect(() => {
    document.addEventListener("mousedown", handleAcceptClose.closeMain);

    return () => {
      document.removeEventListener("mousedown", handleAcceptClose.closeMain);
    }
  }, [newProfile, isBeingDeleted]);

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  };

  const handleUserStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    //setUserStatus(event.target.value)
  };

  const handleLastChangesDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastChangesDate(event.target.value)
  };

  const handleAcceptClick = () => {
    setShowConfirmWindow(true);
  };

  const handleAcceptClose = {
    closeMain: async () => {
      if(isActionBlock)
        setIsActive(false);
      else if (newProfile && !isBeingDeleted && !isActionDelete){
        await updateUser(newProfile.id, newProfile.name, newProfile.email, newProfile.isAdmin, newProfile.isSuper, newProfile.isTelegram, newProfile.isActive);
        updateData();
        close();
      }

      if(isActionDelete)
        setIsBeingDeleted(true);
      else if (newProfile && isBeingDeleted){
        await deleteUser(newProfile.id);
        updateData();
        close();
      }
    },
    closeCurrent: () => {
      setShowConfirmWindow(false);
      setIsActionEdit(false);
      setIsActionBlock(false);
      setIsActionDelete(false);
    }
  }

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  }

  const renderDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const locale = "uk-UA";
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString(locale, options);
    const finalFormattedDate = formattedDate.replace(/,/g, "");
    return finalFormattedDate;
  };

  return (
    <div>
      {showConfirmWindow && isActionEdit && <GeneralConfirmWindow entity={newProfile!}  text="Ви дійсно бажаєте зберегти зміни?" onClose={handleAcceptClose} confirmType="edit" />}
      {showConfirmWindow && isActionBlock && <GeneralConfirmWindow entity={newProfile!}  text="Заблокувати даного користувача?" onClose={handleAcceptClose} confirmType="edit" />}
      {showConfirmWindow && isActionDelete && <GeneralConfirmWindow entity={newProfile!}  text="Видалити даного користувача?" onClose={handleAcceptClose} confirmType="edit" />}


      {!isOwn ? (
          <>
            {!isActive && !showConfirmWindow &&
              <div className="absolute top-[0] left-[0] flex items-center justify-center w-[100%] h-[100%] bg-[#eaeaeab3] rounded-[1vh] z-[2]" onClick={() => {setIsActive(true)}}>
                <img className="w-[18cqw]" src={blockedImg} />
              </div>
            }
            {isBeingDeleted && !showConfirmWindow &&
              <div className="absolute top-[0] left-[0] flex items-center justify-center w-[100%] h-[100%] bg-[#eaeaeab3] rounded-[1vh] z-[2]" onClick={() => {setIsBeingDeleted(false)}}>
                <img className="w-[18cqw]" src={deletedImg} />
              </div>
            }
            <div className="relative"> 
              <img className="dotted-menu-icon ml-[97cqw] mt-[2cqw] cursor-pointer" src={dottedMenu} onClick={handleShowMenu}></img>
              <ul className={`user-card-menu absolute right-[1cqw] top-[1cqw] bg-[#F6F6F6] z-[1] rounded-[1cqw] rounded-tr-[0] shadow-[0_0.8cqw_0.8cqw_rgba(0,0,0,0.25)] ${!showMenu ? "hidden" : ""}`}>
                <li className="flex items-center justify-center w-[14cqw] h-[3.7cqw] font-light text-[1.8cqw] tracking-wide cursor-pointer" onClick={() => {setShowMenu(false); setIsActionBlock(true); setShowConfirmWindow(true);}}>Заблокувати</li>
                <div className="absolute w-[80%] h-[0.1cqw] bg-[#3D3D3D] left-[9%]"></div>
                <li className="flex items-center justify-center w-[14cqw] h-[3.7cqw] font-light text-[1.8cqw] tracking-wide cursor-pointer" onClick={() => {setShowMenu(false); setIsActionDelete(true); setShowConfirmWindow(true);}}>Видалити</li>
              </ul>
            </div>
          </>
        )
        : (
          <div className="header">
            <div className={`text-[1.9cqw] px-[3cqw] ${userProfile.isSuper ? "super" : "admin"} text`} style={{"fontFamily": "Roboto Mono"}}>{userProfile.isSuper ? "super admin" : "admin"}</div>
            <div className="buttons">
              <img 
              className="card-btn cursor-pointer w-[2.2cqw] h-[2.2cqw]" 
              src={edit} 
              onClick={
                () => {
                  if (isActionEdit)
                    close();
                  else
                    handleAcceptClick();
                }}/>
              <img className="card-btn w-[2.2cqw] h-[2.2cqw]" src={deleteImg}/>
            </div>
          </div>
        )
      }
      <div className="flex justify-between">
        <div className="p-4 flex flex-row gap-[2cqw]">
          <div className="avatar relative p-[0]">
            <div className="darkened">
              <img className="avatar-img darkened-child cursor-pointer w-[16cqw]" src={avatar}/>
              <img className="avatar-edit-img darkened-child absolute top-[67%] right-[12%] w-[2.8cqw] cursor-pointer" src={avatarEdit}/>
            </div>
            <div className="user-status gap-[1cqw] mr-[1.2cqw]">
              <div className="user-status-dot w-[1cqw] h-[1cqw]"></div>
              <span className="user-status-text text-[1.5cqw]">В мережі</span>
            </div>
          </div>
          <div className="flex flex-col gap-[3cqw] h-full">
            <div className="flex w-full gap-[2cqw]">
              <div className="flex flex-col items-center gap-2">
                <div className="px-[2.5cqw] rounded-[30cqw] bg-[#BCDCE4] text-[1.6cqh]" style={{"fontFamily": "Roboto Mono"}}>admin</div>
                <GnSwitch switched={isAdmin} colorProp="bg-gn-light-blue" onSwitch={() => setIsAdmin(!isAdmin)}/>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="px-5 rounded-[30cqw] bg-[#F8E5E5] text-[1.6cqh]" style={{"fontFamily": "Roboto Mono"}}>super</div>
                <GnSwitch switched={isSuper} colorProp="bg-gn-beige" onSwitch={() => setIsSuper(!isSuper)}/>
              </div>
            </div>
            <div className="relative">
              <GnInput className="!w-[20cqw]" name={'Telegram'} readonly={!isTelegram} value={userProfile.telegramId}/>
              <div className="scale-[0.8] max-w-fit absolute right-[4cqw] bottom-[0.7cqw]">
                <GnSwitch switched={isTelegram} colorProp="bg-black" onSwitch={() => setIsTelegram(!isTelegram)}/>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-[2cqw] flex-col">
          <GnInput readonly={true} name={'Статус заявки'} value={userProfile.isActive ? "Прийнята" : "Відхилена"} handleChange={handleUserStatus}/>
          <GnInput readonly={true} name={'Остання активність'} value={userProfile.lastActivityDate}/>
        </div>
      </div>
      <div className="flex mt-[1cqw] gap-[25cqw] mb-[2cqw]">
        <div className="flex gap-[2cqw] flex-col">
          <GnInput readonly={true} name={'ID Користувача'} value={userProfile.id}/>
          <GnInput name={'Ім\'я користувача'} value={name} handleChange={handleName}/>
          <GnInput name={'Email'} value={email} handleChange={handleEmail}/>
        </div>
        <div className="flex gap-[2cqw] flex-col">
          <GnInput readonly={true} name={'Дата реєстрації'} value={renderDate(userProfile.dataRegistration)}/>
          <GnInput readonly={true} name={'Дата заявки'} value={userProfile.applicationDate}/>
          <GnInput readonly={true} name={'Останні зміни'} value={lastChangesDate} handleChange={handleLastChangesDate}/>
        </div>
      </div>
      {!isOwn &&
        <div className="w-full flex flex-row justify-end items-center mt-[2cqw]">
          <div className="details-user w-max h-[6cqw] mt-[0] text-[1.9cqw]">
            <div 
            className="flex flex-row items-center gap-2 cursor-pointer" 
            style={{"fontFamily": "Roboto Mono"}} 
            onClick={
              () => {
                if(!isActionEdit)
                  close();
                else  
                  handleAcceptClick();
              }}
            >
              <img className="w-[2.3cqw] h-[2.3cqw]" src={tick}/>
              Зберегти
            </div>
            <div className="border-l border-black h-full"></div>
            <div className="flex flex-row items-center gap-2 cursor-pointer" style={{"fontFamily": "Roboto Mono"}} onClick={close}>
              <img className="w-[1.9cqw] h-[1.9cqw]" src={cross}/>
              <div>Відмінити</div>
            </div>
          </div>
        </div>
      }

    </div>
  )
}