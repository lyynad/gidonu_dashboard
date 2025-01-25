import './UserMain.css';
import edit from '../../assets/images/svg/edit-b.svg';
import deleteImg from '../../assets/images/svg/delete-b.svg';
import avatar from '../../assets/images/svg/photo-b.svg';
import details from '../../assets/images/svg/details.svg';
import arrowBack from "../../assets/images/svg/arrow-back.svg";
import {useState} from "react";
import GnProfileChange from "../Components/GnProfileChange";
import { updateUser } from "../../helpers/helper";

export default function UserMain({ userProfile, handleUserRequiresUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleProfileChange = async (newProfile) => {
    await updateUser(newProfile.id, newProfile.name, newProfile.email, newProfile.isAdmin, newProfile.isSuper);
    handleUserRequiresUpdate();
  }

  return (
    <div className="right">
      <div className="main-cont">
        {isEditing &&
          <img className="arrow-back" src={arrowBack} onClick={() => {setIsEditing(false)}}/>
        }
        <div className={`user-card ${isEditing ? "user-card-maximized" : ""}`}>
          {!isEditing && (
            <div className="header">
              <div className="text" style={{"borderRadius": "30%", "paddingLeft": "15px", "paddingRight": "15px"}}>super admin</div>
              <div className="buttons">
                <img className="card-btn cursor-pointer" src={edit} onClick={() => setIsEditing(true)}/>
                <img className="card-btn" src={deleteImg}/>
              </div>
            </div>
          )}
          {!isEditing && (
            <div className="avatar">
              <img className="avatar-img" src={avatar}/>
              <div className="user-status">
                <div className="user-status-dot"></div>
                <span className="user-status-text">В мережі</span>
              </div>
            </div>
          )}
          {!isEditing ?
            <div className="profile">
              <div className="info">
                <div className="info-header">Ім'я</div>
                <div className="info-body">{userProfile.name}</div>
              </div>
              <div className="info">
                <div className="info-header">Email</div>
                <div className="info-body">{userProfile.email}</div>
              </div>
              <div className="info">
                <div className="info-header">Telegram</div>
                <div className="info-body">{userProfile.telegramId}</div>
              </div>
            </div>
            : <GnProfileChange userProfile={userProfile} isOwn={true} close={() => {setIsEditing(false)}} handleProfileChange={handleProfileChange}/>
          }
          {!isEditing && (
            <div className="details-user" onClick={() => setIsEditing(!isEditing)}>
              <img className="details-user-img" src={details}/>
              <span className="details-user-txt">Детальніше</span>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}