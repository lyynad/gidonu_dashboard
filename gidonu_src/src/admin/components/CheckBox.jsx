import { useState } from "react";
import check from "../../assets/images/checkBlack.png";
import "../assets/css/CheckBox.css";

const CheckBox = ({ childId, switchState, onSwitchChange }) => {
  const [active, setActive] = useState(false);

  const onShowCheck = () => {
    onSwitchChange(childId, !switchState);
  };

  return (
    <div
      className={`${
        switchState
          ? "checkBox-border-inactive-user"
          : "checkBox-border-active-user"
      }`}
      onClick={onShowCheck}
    >
      <div
        className={`${
          switchState
            ? "checkBox-body-inactive-user"
            : "checkBox-body-active-user"
        }`}
        onClick={onShowCheck}
      >
        <img
          src={check}
          onClick={onShowCheck}
          className={`${
            switchState ? "visible" : "invisible"
          } w-[10px] h-[10px]`}
        />
      </div>
    </div>
  );
};

export default CheckBox;
