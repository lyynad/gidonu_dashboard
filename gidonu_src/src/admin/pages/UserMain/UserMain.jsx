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
  const [isDetailView, setIsDetailView] = useState(false);

  const handleUserCardClose = () => {
    setIsEditing(false);
  };


  return (
    <div className="right" style={{"width": "100%", "height": "100%"}}>
      <div className="main-cont">
        <div className={`user-card`} onMouseDown={(e) => {e.stopPropagation();}}>
          <GnProfileChange userProfile={userProfile} isOwn={true} close={handleUserCardClose} updateData={handleUserRequiresUpdate} readonly={!isEditing}/>
        </div>
      </div>
    </div>
  )
}