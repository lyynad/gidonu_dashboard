import './UserMain.css';
import '../Components/UserCard.css';

import UserCard from "../Components/UserCard";

import edit from '../../assets/images/svg/edit-b.svg';
import deleteImg from '../../assets/images/svg/delete-b.svg';
import avatar from '../../assets/images/svg/photo-b.svg';
import details from '../../assets/images/svg/details.svg';
import arrowBack from "../../assets/images/svg/arrow-back.svg";
import {useEffect, useState} from "react";

export default function UserMain({ userProfile, handleUserRequiresUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDetailView, setIsDetailView] = useState(false);

  useEffect(() => {
    document.title = "Дашборд";
  }, []);

  const handleUserCardClose = () => {
    setIsEditing(false);
  };


  return (
    <div className="right" style={{"width": "100%", "height": "100%"}}>
      <div className="main-cont">
        {isDetailView &&
          <img className="arrow-back" src={arrowBack} onClick={() => {setIsDetailView(false)}}/>
        }
        <div className={`user-card ${isDetailView ? "user-card-maximized" : ""}`} onMouseDown={(e) => {e.stopPropagation();}}>
          {!isDetailView && (
            <div className="user-header">
              <div className={`text ${userProfile.isSuper ? "super" : "admin"}`} style={{"fontFamily": "Roboto Mono", "fontSize": "5.3cqw", "paddingLeft": "9cqw", "paddingRight": "9cqw"}}>{userProfile.isSuper ? "super admin" : "admin"}</div>
              <div className="buttons">
                <img className="card-btn cursor-pointer" style={{"width": "6cqw", "height": "6cqw"}} src={edit} onClick={() => {setIsEditing(true); setIsDetailView(true);}}/>
                <img className="card-btn" style={{"width": "6cqw", "height": "6cqw"}} src={deleteImg}/>
              </div>
            </div>
          )}
          {!isDetailView && (
            <div className="avatar">
              <img className="avatar-img" style={{"width": "45cqw"}} src={avatar}/>
              <div className="user-status" style={{"gap": "2cqw", "marginRight": "4cqw"}}>
                <div className="user-status-dot" style={{"width": "3cqw", "height": "3cqw", "backgroundColor": `${userProfile.isActive ? "rgb(151, 219, 166, 0.8)" : "rgba(242, 201, 201, 1)"}`}}></div>
                <span className="user-status-text" style={{"fontSize": "4cqw"}}>{userProfile.isActive ? "Активний" : "Заблокований"}</span>
              </div>
            </div>
          )}
          {!isDetailView ?
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
            : <UserCard userProfile={userProfile} isOwn={true} close={handleUserCardClose} updateData={handleUserRequiresUpdate} readonly={!isEditing}/>
          }
          {!isDetailView && (
            <div className="details-user" onClick={() => setIsDetailView(true)}>
              <img className="details-user-img" src={details}/>
              <span className="details-user-txt">Детальніше</span>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}