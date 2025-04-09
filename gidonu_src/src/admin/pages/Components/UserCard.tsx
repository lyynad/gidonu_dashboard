import "./UserCard.css";

import { useEffect, useState } from "react";
import { updateUser, deleteUser } from "../../helpers/helper";
import { IUserProfile } from "../../helpers/interfaces";

import GnInput from "./GnInput";
import GeneralConfirmWindow from "./GeneralConfirmWindow";
import GnSwitch from "../../../gn-components/switch/GnSwitch";

import avatar from "../../assets/images/svg/photo-b.svg";
import avatarEdit from "../../assets/images/svg/avatar-edit.svg";
import tick from "../../assets/images/tick.svg";
import cross from "../../assets/images/cross.svg";
import dottedMenu from "../../assets/images/svg/dot-menu.svg";
import edit from '../../assets/images/svg/edit-b.svg';
import deleteImg from '../../assets/images/svg/delete-b.svg';
import blockedImg from "../../assets/images/svg/image-blocked.svg";
import unblockedImg from "../../assets/images/svg/image-unblocked.svg";
import deletedImg from "../../assets/images/svg/image-deleted.svg";
import arrowDown from "../../assets/images/svg/arrow-down-user-card.svg";

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
  const [isTelegram, setIsTelegram] = useState<boolean>(Boolean(userProfile.isTelegram));
  const [telegramId, setTelegramId] = useState<string>(userProfile.telegramId);
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
    if (name !== userProfile.name || email !== userProfile.email || isAdmin != userProfile.isAdmin || isSuper != userProfile.isSuper || isTelegram != userProfile.isTelegram || telegramId !== userProfile.telegramId || isActive != userProfile.isActive){
      const newData: IUserProfile = {
        ...userProfile,
        name: name,
        email: email,
        isAdmin: isAdmin,
        isSuper: isSuper,
        isTelegram: isTelegram,
        telegramId: telegramId,
        isActive: isActive
      };

        setIsActionEdit(true);
        setNewProfile(newData);
    }
    else
      setIsActionEdit(false);
  }, [name, email, isAdmin, isSuper, isTelegram, telegramId, isActive]);
  
  useEffect(() => {
    if ((isActive !== userProfile.isActive) || isBeingDeleted){
      setDropdownPersonalInfo(false);
      setDropdownApplicationInfo(false);
      setDropdownActionInfo(false);
      setTimeout(handleAcceptClose.closeMain, 1000);
    }
    else
      document.addEventListener("mousedown", close);

    return () => {
      document.removeEventListener("mousedown", close);
    }
  }, [newProfile, isBeingDeleted]);

  const handleTelegramId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTelegramId(event.target.value);
  }

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
        setIsActive(!isActive);
      else if (newProfile && !isBeingDeleted && !isActionDelete){
        await updateUser(newProfile.id, newProfile.name, newProfile.email, newProfile.isAdmin, newProfile.isSuper, newProfile.isTelegram, newProfile.telegramId, newProfile.isActive);
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
      {showConfirmWindow && isActionBlock && <GeneralConfirmWindow entity={newProfile!}  text={`${isActive ? "Заблокувати" : "Розблокувати"} даного користувача?`} onClose={handleAcceptClose} confirmType="edit" />}
      {showConfirmWindow && isActionDelete && <GeneralConfirmWindow entity={newProfile!}  text="Видалити даного користувача?" onClose={handleAcceptClose} confirmType="edit" />}


      {!isOwn ? (
          <>
            {isActive !== userProfile.isActive && isActive === false && !showConfirmWindow &&
              <div className="card-overlay">
                <img className="card-overlay-img" src={blockedImg} />
              </div>
            }
            {isActive !== userProfile.isActive && isActive === true && !showConfirmWindow &&
              <div className="card-overlay">
                <img className="card-overlay-img" src={unblockedImg} />
              </div>
            }
            {isBeingDeleted && !showConfirmWindow &&
              <div className="card-overlay">
                <img className="card-overlay-img" src={deletedImg} />
              </div>
            }
            <div className="relative z-[2]"> 
              <img className="dotted-menu-icon ml-[auto] mt-[2cqw] cursor-pointer w-[6cqw]" src={dottedMenu} onClick={handleShowMenu}></img>
              <ul className={`user-card-menu absolute right-[1cqw] top-[1cqw] z-[1] rounded-[1cqw] rounded-tr-[0] shadow-[0_0.8cqw_0.8cqw_rgba(0,0,0,0.25)] ${!showMenu ? "hidden" : ""}`}>
                <li className="flex items-center justify-center w-[19cqw] h-[5cqw] font-light text-[2.2cqw] tracking-wide cursor-pointer" onClick={() => {setShowMenu(false); setIsActionBlock(true); setShowConfirmWindow(true);}}>{isActive ? "Заблокувати" : "Розблокувати"}</li>
                <div className="absolute w-[80%] h-[0.1cqw] bg-[#3D3D3D] left-[9%]"></div>
                <li className="flex items-center justify-center w-[19cqw] h-[5cqw] font-light text-[2.2cqw] tracking-wide cursor-pointer" onClick={() => {setShowMenu(false); setIsActionDelete(true); setShowConfirmWindow(true);}}>Видалити</li>
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
      <div className="relative bg-[white] flex justify-between ml-[4cqw] z-[1]">
        <div className="p-4 flex flex-row gap-[2cqw]">
          <div className="avatar relative p-[0]">
            <div className={`${!cardReadonly ? "darkened" : ""}`}>
              <img className={`avatar-img w-[25cqw] ${!cardReadonly ? "darkened-child cursor-pointer" : "cursor-not-allowed"}`} src={avatar}/>
            </div>
            <div className="user-status gap-[1.5cqw] mr-[1.2cqw] mt-[1cqw]">
              <div className="user-status-dot w-[1.6cqw] h-[1.6cqw]" style={{"backgroundColor": `${isActive ? "rgb(151, 219, 166, 0.8)" : "rgb(242, 201, 201)"}`}}></div>
              <span className="user-status-text text-[2.2cqw]">{isActive ? "Активний" : "Заблокований"}</span>
            </div>
          </div>
          <div className="flex flex-col gap-[3cqw] h-full">
            <div className="flex w-full gap-[4cqw]">
              <div className="flex flex-col items-center gap-2">
                <div className="px-[5cqw] rounded-[30cqw] bg-[#BCDCE4] text-[2.4cqw]" style={{"fontFamily": "Roboto Mono"}}>admin</div>
                <div className="">
                  <GnSwitch readonly={cardReadonly || !isActive} switched={isAdmin || isSuper} colorProp="bg-[#5D6065]" className="w-[7cqw]" onSwitch={() => {if(!isSuper) setIsAdmin(!isAdmin)}}/>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="px-[5cqw] rounded-[30cqw] bg-[#F8E5E5] text-[2.4cqw]" style={{"fontFamily": "Roboto Mono"}}>super</div>
                <div className="">
                  <GnSwitch readonly={cardReadonly || !isActive} switched={isSuper} colorProp="bg-[#5D6065]" className="w-[7cqw]" onSwitch={() => setIsSuper(!isSuper)}/>
                </div>
              </div>
            </div>
            <div className="relative w-fit">
              <GnInput className="!w-[30cqw]" name={'Telegram'} readonly={!isTelegram || cardReadonly} value={userProfile.telegramId} handleChange={handleTelegramId}/>
              <GnSwitch readonly={cardReadonly} switched={isTelegram} colorProp="bg-[#5D6065]" className="w-[7cqw] absolute right-[2cqw] top-[7cqw]" onSwitch={() => setIsTelegram(!isTelegram)}/>
            </div>
          </div>
        </div>
      </div>
      <div className="dropdowns-container z-[-1]">
        <div className="w-[80cqw] m-[auto] border-solid border-[1px] border-[#5D6065] rounded-[4cqw]">
          <div className="button-container">
            <button className={`dropdown-button w-[100%] h-[11.5cqw] rounded-[4cqw] text-left pl-[2cqw] text-[3.2cqw] text-[#515D74] ${dropdownPersonalInfo ? "border-b-solid border-b-[1px] border-b-[#5D6065]" : ""}`}
              onClick={() => {setDropdownPersonalInfo(!dropdownPersonalInfo)}}
            >
              <span>Особиста інформація</span>
              <img className={`button-arrow ${dropdownPersonalInfo ? "button-arrow-animate" : ""}`} src={arrowDown} />
            </button>
          </div>
          <div className={`max-h-[0] flex gap-[2cqw] flex-col pl-[4cqw] overflow-hidden ${dropdownPersonalInfo ? "dropdown" : ""}`}>
            <GnInput readonly={true} name={'ID Користувача'} value={userProfile.id}/>
            <GnInput readonly={cardReadonly} name={'Ім\'я користувача'} value={name} handleChange={handleName}/>
            <GnInput readonly={cardReadonly} name={'Email'} value={email} handleChange={handleEmail}/>
            <GnInput readonly={true} name={'Дата реєстрації'} value={renderDate(userProfile.dataRegistration)}/>
          </div>
        </div>
        <div className="w-[80cqw] m-[auto] border-solid border-[1px] border-[#5D6065] rounded-[4cqw]">
          <button className={`dropdown-button w-[100%] h-[11.5cqw] rounded-[4cqw] text-left pl-[2cqw] text-[3.2cqw] text-[#515D74] ${dropdownActionInfo ? "border-b-solid border-b-[1px] border-b-[#5D6065]" : ""}`}
            onClick={() => {setDropdownActionInfo(!dropdownActionInfo)}}
          >
            <span>Інформація про дії</span>
            <img className={`button-arrow ${dropdownActionInfo ? "button-arrow-animate" : ""}`} src={arrowDown} />
          </button>
          <div className={`max-h-[0] flex gap-[2cqw] flex-col pl-[4cqw] overflow-hidden ${dropdownActionInfo ? "dropdown" : "dropdown-reverse"}`}>
            <GnInput readonly={true} name={'Остання активність'} value={userProfile.lastActivityDate}/>
            <GnInput readonly={true} name={'Останні зміни'} value={lastChangesDate} handleChange={handleLastChangesDate}/>
          </div>
        </div>
        <div className="w-[80cqw] m-[auto] border-solid border-[1px] border-[#5D6065] rounded-[4cqw]">
          <button className={`dropdown-button w-[100%] h-[11.5cqw] rounded-[4cqw] text-left pl-[2cqw] text-[3.2cqw] text-[#515D74] ${dropdownApplicationInfo ? "border-b-solid border-b-[1px] border-b-[#5D6065]" : ""}`}
            onClick={() => {setDropdownApplicationInfo(!dropdownApplicationInfo)}}
          >
            <span>Інформація про заявку</span>
            <img className={`button-arrow ${dropdownApplicationInfo ? "button-arrow-animate" : ""}`} src={arrowDown} />
          </button>
          <div className={`max-h-[0] flex gap-[2cqw] flex-col pl-[4cqw] overflow-hidden ${dropdownApplicationInfo ? "dropdown" : "dropdown-reverse"}`}>
            <GnInput readonly={true} name={'Дата заявки'} value={userProfile.applicationDate}/>
            <GnInput readonly={true} name={'Статус заявки'} value={userProfile.isActive ? "Прийнята" : "Відхилена"} handleChange={handleUserStatus}/>
          </div>
        </div>
      </div>
      {(cardReadonly && !isOwn) ? (
        <div className="edit-button"
          onClick={() => {setCardReadonly(false);}}
        >
          Обробити заявку
        </div>
      )
      : (
        <div className={`w-full flex flex-row justify-end items-center mt-[2cqw] ${cardReadonly ? "opacity-[0] cursor-default" : (!isActionEdit ? "opacity-[0.5] cursor-default" : "cursor-pointer")}`}>
          <div className="flex justify-end gap-[2cqw] border-solid border-t-[1px] border-t-[black] w-[50cqw] h-[6cqw] mt-[2cqw] text-[3cqw]">
            <div 
            className="flex flex-row items-center gap-2" 
            style={{"fontFamily": "Roboto Mono"}} 
            onClick={
              () => {
                if(isActionEdit)
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
      )}
    </div>
  )
}