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
  isOwn: boolean,
  readonly?: boolean
}

export default function GnProfileChange({close, userProfile, updateData, isOwn, readonly = false}: GnProfileChangeProps) {
  const [name, setName] = useState<string>(userProfile.name);
  const [email, setEmail] = useState<string>(userProfile.email);
  const [lastChangesDate, setLastChangesDate] = useState<string>(userProfile.lastChangesDate);
  const [isAdmin, setIsAdmin] = useState<boolean>(userProfile.isAdmin || userProfile.isSuper);
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
  
  const [cardReadonly, setCardReadonly] = useState<boolean>(readonly);

  const [dropdownPersonalInfo, setDropdownPersonalInfo] = useState<boolean>(false);
  const [dropdownActionInfo, setDropdownActionInfo] = useState<boolean>(false);
  const [dropdownApplicationInfo, setDropdownApplicationInfo] = useState<boolean>(false);

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
    if (!isActive || isBeingDeleted)
      document.addEventListener("mousedown", handleAcceptClose.closeMain);
    else
      document.addEventListener("mousedown", close);

    return () => {
      document.removeEventListener("mousedown", handleAcceptClose.closeMain);
      document.removeEventListener("mousedown", close);
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
          <div className="user-header">
            <div className="buttons">
              <img 
                className="card-btn cursor-pointer w-[4cqw] h-[4cqw]" 
                src={edit} 
                onClick={
                  () => {
                    setCardReadonly(false);
                  }}
                />
              <img className="card-btn w-[4cqw] h-[4cqw]" src={deleteImg}/>
            </div>
          </div>
        )
      }
      <div className="flex justify-between">
        <div className="p-4 flex flex-row gap-[2cqw]">
          <div className="avatar relative p-[0]">
            <div className={`${!cardReadonly ? "darkened" : ""}`}>
              <img className={`avatar-img w-[25cqw] ${!cardReadonly ? "darkened-child cursor-pointer" : "cursor-not-allowed"}`} src={avatar}/>
            </div>
            <div className="user-status gap-[1.5cqw] mr-[1.2cqw] mt-[1cqw]">
              <div className="user-status-dot w-[1.6cqw] h-[1.6cqw]" style={{"backgroundColor": `${userProfile.isActive ? "rgb(151, 219, 166, 0.8)" : "rgb(242, 201, 201)"}`}}></div>
              <span className="user-status-text text-[2.2cqw]">{isActive ? "Активний" : "Заблокований"}</span>
            </div>
          </div>
          <div className="flex flex-col gap-[3cqw] h-full">
            <div className="flex w-full gap-[2cqw]">
              <div className="flex flex-col items-center gap-2">
                <div className="px-[2.5cqw] rounded-[30cqw] bg-[#BCDCE4] text-[2.4cqw]" style={{"fontFamily": "Roboto Mono"}}>admin</div>
                <div className="scale-[0.8]">
                  <GnSwitch readonly={cardReadonly} switched={isAdmin || isSuper} colorProp="bg-[#5D6065]" onSwitch={() => {if(!isSuper) setIsAdmin(!isAdmin)}}/>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="px-5 rounded-[30cqw] bg-[#F8E5E5] text-[2.4cqw]" style={{"fontFamily": "Roboto Mono"}}>super</div>
                <div className="scale-[0.8]">
                  <GnSwitch readonly={cardReadonly} switched={isSuper} colorProp="bg-[#5D6065]" onSwitch={() => setIsSuper(!isSuper)}/>
                </div>
              </div>
            </div>
            <div className="relative">
              <GnInput className="!w-[30cqw]" name={'Telegram'} readonly={!isTelegram || cardReadonly} value={userProfile.telegramId}/>
              <div className="scale-[0.8] max-w-fit absolute right-[2cqw] top-[6cqw]">
                <GnSwitch readonly={cardReadonly} switched={isTelegram} colorProp="bg-[#5D6065]" onSwitch={() => setIsTelegram(!isTelegram)}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="input-container flex flex-col gap-[4cqw] overflow-auto mt-[3cqw]">
        <div className="w-[80cqw] m-[auto] border-solid border-[1px] border-[#5D6065] rounded-[4cqw]">
          <button className={`w-[100%] h-[11.5cqw] rounded-[4cqw] text-left pl-[2cqw] text-[3.2cqw] text-[#515D74] ${dropdownPersonalInfo ? "border-b-solid border-b-[1px] border-b-[#5D6065]" : ""}`}
            onClick={() => {setDropdownPersonalInfo(!dropdownPersonalInfo)}}
          >
            Особиста інформація
          </button>
          <div className={`max-h-[0] flex gap-[2cqw] flex-col pl-[4cqw] overflow-hidden ${dropdownPersonalInfo ? "dropdown" : "dropdown-reverse"}`}>
            <GnInput readonly={true} name={'ID Користувача'} value={userProfile.id}/>
            <GnInput readonly={cardReadonly} name={'Ім\'я користувача'} value={name} handleChange={handleName}/>
            <GnInput readonly={cardReadonly} name={'Email'} value={email} handleChange={handleEmail}/>
            <GnInput readonly={true} name={'Дата реєстрації'} value={renderDate(userProfile.dataRegistration)}/>
          </div>
        </div>
        <div className="w-[80cqw] m-[auto] border-solid border-[1px] border-[#5D6065] rounded-[4cqw]">
          <button className={`w-[100%] h-[11.5cqw] rounded-[4cqw] text-left pl-[2cqw] text-[3.2cqw] text-[#515D74] ${dropdownActionInfo ? "border-b-solid border-b-[1px] border-b-[#5D6065]" : ""}`}
            onClick={() => {setDropdownActionInfo(!dropdownActionInfo)}}
          >
            Інформація про дії
          </button>
          <div className={`max-h-[0] flex gap-[2cqw] flex-col pl-[4cqw] overflow-hidden ${dropdownActionInfo ? "dropdown" : "dropdown-reverse"}`}>
            <GnInput readonly={true} name={'Остання активність'} value={userProfile.lastActivityDate}/>
            <GnInput readonly={true} name={'Останні зміни'} value={lastChangesDate} handleChange={handleLastChangesDate}/>
          </div>
        </div>
        <div className="w-[80cqw] m-[auto] border-solid border-[1px] border-[#5D6065] rounded-[4cqw]">
          <button className={`w-[100%] h-[11.5cqw] rounded-[4cqw] text-left pl-[2cqw] text-[3.2cqw] text-[#515D74] ${dropdownApplicationInfo ? "border-b-solid border-b-[1px] border-b-[#5D6065]" : ""}`}
            onClick={() => {setDropdownApplicationInfo(!dropdownApplicationInfo)}}
          >
            Інформація про заявку
          </button>
          <div className={`max-h-[0] flex gap-[2cqw] flex-col pl-[4cqw] overflow-hidden ${dropdownApplicationInfo ? "dropdown" : "dropdown-reverse"}`}>
            <GnInput readonly={true} name={'Дата заявки'} value={userProfile.applicationDate}/>
            <GnInput readonly={true} name={'Статус заявки'} value={userProfile.isActive ? "Прийнята" : "Відхилена"} handleChange={handleUserStatus}/>
          </div>
        </div>
      </div>
      <div className={`w-full flex flex-row justify-end items-center mt-[2cqw] ${cardReadonly ? "opacity-[0] cursor-default" : "cursor-pointer"}`}>
        <div className="flex justify-end gap-[2cqw] border-solid border-t-[1px] border-t-[black] w-[50cqw] h-[6cqw] mt-[2cqw] text-[3cqw]">
          <div 
          className="flex flex-row items-center gap-2" 
          style={{"fontFamily": "Roboto Mono"}} 
          onClick={
            () => {
              if(!isActionEdit)
                close();
              else  
                handleAcceptClick();
            }}
          >
            <img className="w-[3.4cqw] h-[3.4cqw]" src={tick}/>
            Зберегти
          </div>
          <div className="border-l border-black h-full"></div>
          <div className="flex flex-row items-center gap-2" style={{"fontFamily": "Roboto Mono"}} onClick={close}>
            <img className="w-[3.4cqw] h-[3.4cqw]" src={cross}/>
            <div>Відмінити</div>
          </div>
        </div>
      </div>
    </div>
  )
}