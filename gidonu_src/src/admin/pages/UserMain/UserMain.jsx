import './UserMain.css';
import edit from '../../assets/images/svg/edit-b.svg';
import deleteImg from '../../assets/images/svg/delete-b.svg';
import avatar from '../../assets/images/svg/photo-b.svg';
import details from '../../assets/images/svg/details.svg';
import arrowBack from "../../assets/images/svg/arrow-back.svg";
import {useState} from "react";
import GnProfileChange from "../Components/GnProfileChange";

export default function UserMain({ userProfile, handleUserRequiresUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleUserCardClose = () => {
    setIsEditing(false);
  };


  return (
    <div className="right">
      <div className="main-cont">
        {isEditing &&
          <img className="arrow-back" src={arrowBack} onClick={() => {setIsEditing(false)}}/>
        }
        <div className={`user-card ${isEditing ? "user-card-maximized" : ""}`} onMouseDown={(e) => {e.stopPropagation();}}>
          {!isEditing && (
            <div className="header">
              <div className={`text ${userProfile.isSuper ? "super" : "admin"}`} style={{"fontFamily": "Roboto Mono", "fontSize": "5.3cqw", "paddingLeft": "9cqw", "paddingRight": "9cqw"}}>{userProfile.isSuper ? "super admin" : "admin"}</div>
              <div className="buttons">
                <img className="card-btn cursor-pointer" style={{"width": "6cqw", "height": "6cqw"}} src={edit} onClick={() => setIsEditing(true)}/>
                <img className="card-btn" style={{"width": "6cqw", "height": "6cqw"}} src={deleteImg}/>
              </div>
            </div>
          )}
          {!isEditing && (
            <div className="avatar">
              <img className="avatar-img" style={{"width": "45cqw"}} src={avatar}/>
              <div className="user-status" style={{"gap": "2cqw", "marginRight": "4cqw"}}>
                <div className="user-status-dot" style={{"width": "3cqw", "height": "3cqw"}}></div>
                <span className="user-status-text" style={{"fontSize": "4cqw"}}>В мережі</span>
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
            : <GnProfileChange userProfile={userProfile} isOwn={true} close={handleUserCardClose} updateData={handleUserRequiresUpdate} />
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