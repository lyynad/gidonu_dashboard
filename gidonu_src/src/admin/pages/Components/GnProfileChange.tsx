import GnInput from "./GnInput";
import avatar from "../../assets/images/svg/photo-b.svg";
import tick from "../../assets/images/tick.svg";
import cross from "../../assets/images/cross.svg";
import { useState } from "react";
import GnSwitch from "../../../gn-components/switch/GnSwitch";

interface IUserProfile {
  id: string,
  name: string,
  email: string,
  userStatus: string,
  registrationDate: string,
  lastChangesDate: string,
  applicationDate: string,
  lastActivityDate: string,
  telegram: string
}

interface GnProfileChangeProps {
  close: () => void,
  userProfile: IUserProfile,
  handleProfileChange?: (newProfile: IUserProfile) => void
}

export default function GnProfileChange({close, userProfile, handleProfileChange}: GnProfileChangeProps) {
  const [name, setName] = useState<string>(userProfile.name);
  const [email, setEmail] = useState<string>(userProfile.email);
  const [userStatus, setUserStatus] = useState<string>(userProfile.userStatus);
  const [lastChangesDate, setLastChangesDate] = useState<string>(userProfile.lastChangesDate);

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  };

  const handleUserStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserStatus(event.target.value)
  };

  const handleLastChangesDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastChangesDate(event.target.value)
  };

  const handleAccept = () => {
    const newProfile: IUserProfile = {
      id: userProfile.id,
      name: name,
      email: email,
      userStatus: userStatus,
      registrationDate: userProfile.registrationDate,
      lastChangesDate: lastChangesDate,
      applicationDate: userProfile.applicationDate,
      lastActivityDate: userProfile.lastActivityDate,
      telegram: userProfile.telegram
    };
    
    if(handleProfileChange)
      handleProfileChange(newProfile);

    close();
  }

  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [isSuper, setIsSuper] = useState<boolean>(true);

  return (
    <div>
      <div className="flex justify-between">
        <div className="p-4 flex flex-row">
          <img className="w-36" src={avatar}/>
          <div className="flex flex-col justify-between h-full">
            <div className="flex w-full justify-between">
              <div className="flex flex-col items-center gap-2">
                <div className="px-5 rounded-2xl bg-[#BCDCE4]">admin</div>
                <GnSwitch switched={isAdmin} colorProp="bg-gn-light-blue" onSwitch={() => setIsAdmin(!isAdmin)}/>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="px-5 rounded-2xl bg-[#F8E5E5]">super</div>
                <GnSwitch switched={isSuper} colorProp="bg-gn-beige" onSwitch={() => setIsSuper(!isSuper)}/>
              </div>
            </div>
            <GnInput className="!w-40" name={'Telegram'} value={userProfile.telegram}/>
          </div>
        </div>
        <div>
          <GnInput readonly={true} name={'Статус користувача'} value={userStatus} handleChange={handleUserStatus}/>
          <GnInput readonly={true} name={'Остання активність'} value={userProfile.lastActivityDate}/>
        </div>
      </div>
      <div className="flex justify-between mt-7 gap-20">
        <div className="flex gap-1 flex-col">
          <GnInput readonly={true} name={'ID Користувача'} value={userProfile.id}/>
          <GnInput name={'Ім\'я користувача'} value={name} handleChange={handleName}/>
          <GnInput name={'Email'} value={email} handleChange={handleEmail}/>
        </div>
        <div className="flex gap-1 flex-col">
          <GnInput readonly={true} name={'Дата реєстрації'} value={userProfile.registrationDate}/>
          <GnInput readonly={true} name={'Дата заявки'} value={userProfile.applicationDate}/>
          <GnInput readonly={true} name={'Останні зміни'} value={lastChangesDate} handleChange={handleLastChangesDate}/>
        </div>
      </div>
      <div className="w-full flex flex-row justify-end">
        <div className="details w-max">
          <div className="flex flex-row gap-2 cursor-pointer" onClick={handleAccept}>
            <img src={tick}/>
            Зберегти
          </div>
          <div className="border-l border-black h-full"></div>
          <div className="flex flex-row gap-2 cursor-pointer" onClick={close}>
            <img src={cross}/>
            <div>Відмінини</div>
          </div>
        </div>
      </div>

    </div>
  )
}