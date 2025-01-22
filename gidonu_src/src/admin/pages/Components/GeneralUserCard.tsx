import './GeneralUserCard.css';
import GnProfileChange from "./GnProfileChange";
import { useEffect } from 'react';

interface IUserProfile {
    id: string,
    name: string,
    email: string,
    userStatus: string,
    registrationDate: string,
    lastChangesDate: string,
    applicationDate: string,
    lastActivityDate: string,
    telegram: string,
    isAdmin: boolean,
    isSuper: boolean
}

interface Props {
    close: () => void,
    userProfile: IUserProfile,
    handleProfileChange?: (newProfile: IUserProfile) => void
}

export default function UserMain({close, userProfile, handleProfileChange}: Props) {
    useEffect(() => {
        document.addEventListener("mousedown", close);
        document.getElementsByClassName("user-card")[0].addEventListener("mousedown", (event) => {
            event.stopPropagation();
        });

        return () => {
            document.removeEventListener("mousedown", close);
        }
    }, []);

    return (
        <div className="user-card" style={{"minWidth": "60%", "maxWidth": "90%", "zIndex": "2"}}>
            <div className="header">
                <div className="text">super admin</div>
            </div>
            <GnProfileChange close={close} userProfile={userProfile} handleProfileChange={handleProfileChange}/>
        </div>
    )
}