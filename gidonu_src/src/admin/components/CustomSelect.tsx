import { useState, useEffect } from "react";

import "../assets/css/AdminSelect.css";

const CustomSelect = ({ optionsList, defaultText, setCabinetType }) => {
  const [defaultSelectText, setDefaultSelectText] = useState({
    text: defaultText,
    color: "",
  });
  const [showOptionList, setShowOptionList] = useState(false);

  useEffect(() => {
    setDefaultSelectText({ text: defaultText });
  }, [defaultText]);

  const handleClickOutside = (e) => {
    if (
      !e.target.classList.contains("custom-select-option") &&
      !e.target.classList.contains("selected-text")
    ) {
      setShowOptionList(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleListDisplay = () => {
    setShowOptionList((prevState) => !prevState);
  };

  const handleOptionClick = (text, color) => {
    setDefaultSelectText({ text, color });
    setShowOptionList(false);
  };

  return (
    <div className="custom-select-container">
      <div
        className={`${
          showOptionList ? "selected-text active" : "selected-text  "
        } flex items-center gap-[8px] rounded-[12px] h-[45px] border border-[#AFAFAF] shadow-xl
            `}
        onClick={handleListDisplay}
      >
        <p
          className={`type-color`}
          style={{ backgroundColor: defaultSelectText.color }}
        ></p>
        {defaultSelectText.text}
      </div>
      {showOptionList && (
        <ul className="select-options">
          {optionsList.map((option, i) => (
            <li
              className={`custom-select-option flex gap-[8px] items-center ${
                i === 0 ? "rounded-t-[12px]" : ""
              } ${i === optionsList.length - 1 ? "rounded-b-[12px]" : ""}`}
              data-name={option.name}
              key={i}
              onClick={() => {
                handleOptionClick(option.name, option.color);
                setCabinetType(option.name);
              }}
            >
              <p
                className={`type-color`}
                style={{ backgroundColor: option.color }}
              ></p>
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
