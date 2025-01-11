import './UserMain.css';
import logout from '../../assets/images/svg/logout.svg';
import user from '../../assets/images/svg/user.svg';
import edit from '../../assets/images/svg/edit-b.svg';
import deleteImg from '../../assets/images/svg/delete-b.svg';
import avatar from '../../assets/images/svg/photo-b.svg';
import details from '../../assets/images/svg/details.svg';
import {useState} from "react";
import GnProfileChange from "../Components/GnProfileChange";

export default function UserMain() {
  const [isEditing, setIsEditing] = useState(false);

  const profile = {
    name: "Рачинська Алла Леонідівна",
    email: "rachinskaya@onu.edu.ua",
    telegram: "@r_al_l"
  }
  const userProfileEdit = {
    id: '',
    name: 'Рачинська Алла Леонідівна',
    email: 'rachinskaya@onu.edu.ua',
    userStatus: 'Active',
    registrationDate: '20 квіт. 2024р.',
    lastChangesDate: '20 квіт. 2024р.',
    applicationDate: '20 квіт. 2024р.',
    lastActivityDate: '20 квіт. 2024р.',
    telegram: '@r_al_l',
    isAdmin: false,
    isSuper: true
  }
  return (
    <div className="right">
      <div className="main-cont">
        <div className="user-card" style={{"minWidth": isEditing ? "60%" : ""}}>
          <div className="header">
            <div className="text">super admin</div>
            <div className="buttons">
              <img className="card-btn cursor-pointer" src={edit} onClick={() => setIsEditing(!isEditing)}/>
              <img className="card-btn" src={deleteImg}/>
            </div>
          </div>
          {!isEditing && (
            <div className="avatar">
              <img className="avatar-img" src={avatar}/>
            </div>
          )}
          {!isEditing ?
            <div className="profile">
              <div className="info">
                <div className="info-header">Ім'я</div>
                <div className="info-body">{profile.name}</div>
              </div>
              <div className="info">
                <div className="info-header">Email</div>
                <div className="info-body">{profile.email}</div>
              </div>
              <div className="info">
                <div className="info-header">Telegram</div>
                <div className="info-body">{profile.telegram}</div>
              </div>
            </div>
            : <GnProfileChange userProfile={userProfileEdit}/>
          }
          {!isEditing && (
            <div className="details">
              <img className="details-img" src={details}/>
              <p className="details-txt">Детальніше</p>
            </div>
          )}

        </div>
      </div>
      <div className="top-line h-[86px] absolute top-0 bg-[white] w-full ">
        <div className="line-user">
          <div className="txt">Вітаємо в особистому кабінеті</div>
          <div className="right-btns">
            <img className="btn-right" src={user}/>
            <img className="btn-right" src={logout}/>
          </div>
        </div>
      </div>
    </div>
  )
}