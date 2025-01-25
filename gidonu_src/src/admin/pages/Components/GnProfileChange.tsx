import "./GnProfileChange.css";
import GnInput from "./GnInput";
import avatar from "../../assets/images/svg/photo-b.svg";
import avatarEdit from "../../assets/images/svg/avatar-edit.svg";
import tick from "../../assets/images/tick.svg";
import cross from "../../assets/images/cross.svg";
import dottedMenu from "../../assets/images/svg/dot-menu.svg";
import edit from '../../assets/images/svg/edit-b.svg';
import deleteImg from '../../assets/images/svg/delete-b.svg';
import { useState } from "react";
import GnSwitch from "../../../gn-components/switch/GnSwitch";
import { IUserProfile } from "../../helpers/interfaces";

interface GnProfileChangeProps {
  close: () => void,
  userProfile: IUserProfile,
  handleProfileChange?: (newProfile: IUserProfile) => void,
  isOwn: boolean
}

export default function GnProfileChange({close, userProfile, handleProfileChange, isOwn}: GnProfileChangeProps) {
  const [name, setName] = useState<string>(userProfile.name);
  const [email, setEmail] = useState<string>(userProfile.email);
  const [userStatus, setUserStatus] = useState<boolean>(userProfile.isActive);
  const [lastChangesDate, setLastChangesDate] = useState<string>(userProfile.lastChangesDate);
  const [isAdmin, setIsAdmin] = useState<boolean>(userProfile.isAdmin);
  const [isSuper, setIsSuper] = useState<boolean>(userProfile.isSuper);

  const [showMenu, setShowMenu] = useState<boolean>(false);

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

  const handleAccept = () => {
    const newProfile: IUserProfile = {
      id: userProfile.id,
      name: name,
      email: email,
      isActive: userStatus,
      dataRegistration: userProfile.dataRegistration,
      lastChangesDate: lastChangesDate,
      applicationDate: userProfile.applicationDate,
      lastActivityDate: userProfile.lastActivityDate,
      telegramId: userProfile.telegramId,
      isAdmin: isAdmin,
      isSuper: isSuper
    };
    
    if(handleProfileChange)
      handleProfileChange(newProfile);

    close();
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
      {!isOwn ? ( 
          <img className="dotted-menu-icon ml-[97cqw] mt-[2cqw] cursor-pointer" src={dottedMenu} onClick={handleShowMenu}></img>
        )
        : (
          <div className="header">
            <div className="text text-[1.9cqw]" style={{"borderRadius": "30%", "paddingLeft": "15px", "paddingRight": "15px"}}>super admin</div>
            <div className="buttons">
              <img className="card-btn cursor-pointer w-[2.2cqw] h-[2.2cqw]" src={edit} onClick={handleAccept}/>
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
                <div className="px-5 rounded-2xl bg-[#BCDCE4] text-[1.6cqh]">admin</div>
                <GnSwitch switched={isAdmin} colorProp="bg-gn-light-blue" onSwitch={() => setIsAdmin(!isAdmin)}/>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="px-5 rounded-2xl bg-[#F8E5E5] text-[1.6cqh]">super</div>
                <GnSwitch switched={isSuper} colorProp="bg-gn-beige" onSwitch={() => setIsSuper(!isSuper)}/>
              </div>
            </div>
            <GnInput className="!w-40" name={'Telegram'} value={userProfile.telegramId}/>
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
            <div className="flex flex-row items-center gap-2 cursor-pointer" onClick={handleAccept}>
              <img className="w-[2.3cqw] h-[2.3cqw]" src={tick}/>
              Зберегти
            </div>
            <div className="border-l border-black h-full"></div>
            <div className="flex flex-row items-center gap-2 cursor-pointer" onClick={close}>
              <img className="w-[1.9cqw] h-[1.9cqw]" src={cross}/>
              <div>Відмінити</div>
            </div>
          </div>
        </div>
      }

    </div>
  )
}