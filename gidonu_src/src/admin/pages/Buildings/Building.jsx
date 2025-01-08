import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import Footer from "../Components/Footer";
import BackgroundBlur from "../Components/BackgroundBlur";

import { getBuildingInfo } from "../../helpers/helper";
import useLoadingState from "../../helpers/state/buildingsLoading";
import logo from "../../assets/images/logo.png";
import close from "../../assets/images/close.png";
import pen from "../../assets/images/pen.png";
import plus from "../../assets/images/plus.png";
import check from "../../assets/images/check.png";

import "../../assets/css/Building.css";

const Building = () => {
  const [changeInfo, setChangeInfo] = useState(false);
  const [addType, setAddType] = useState(false);
  const [addCabinet, setAddCabinet] = useState(false);
  const [buildingsInfo, setBuildingsInfo] = useState();
  const { loading, setLoading } = useLoadingState();

  useEffect(() => {
    getBuildingInfo(setBuildingsInfo, setLoading, 1);
  }, []);

  return (
    <div className="w-full h-full bg-[#E8E8E8] pt-[60px] flex flex-col gap-[10px] overflow-auto">
      {changeInfo ? (
        <BackgroundBlur>
          <ChangeInfo
            buildingsInfo={buildingsInfo}
            setBuildingsInfo={setBuildingsInfo}
            setChangeInfo={setChangeInfo}
          />
        </BackgroundBlur>
      ) : (
        ""
      )}
      {addType ? (
        <BackgroundBlur>
          <AddType
            setAddType={setAddType}
            buildingsInfo={buildingsInfo}
            setBuildingsInfo={setBuildingsInfo}
          />
        </BackgroundBlur>
      ) : (
        ""
      )}
      {addCabinet ? (
        <BackgroundBlur>
          <AddCabinet
            setAddCabinet={setAddCabinet}
            addCab={map.current}
            types={types}
          />
        </BackgroundBlur>
      ) : (
        ""
      )}
      <div className="flex flex-col gap-[15px] pl-[50px]">
        <div className="flex gap-[10px] pl-[50px]">
          <img src={logo} className="h-[128px] w-[128px]" alt={"logo"} />
          <div className="rounded-l-[150px] rounded-r-[30px] text-[white] text-[18px] h-[110px] w-[600px] bg-[#5294A6] flex flex-col pl-[50px] pr-[30px] justify-center">
            <p className="text-[white]">{buildingsInfo?.title}</p>
            <div className="flex justify-between items-center">
              <p className=" text-[white] w-[300px]">
                {buildingsInfo?.address}
              </p>
              <img
                src={pen}
                className="h-[20px] w-[20px] cursor-pointer"
                onClick={() => {
                  setChangeInfo(true);
                }}
                alt={"pen"}
              />
            </div>
          </div>
        </div>

        <div className="flex w-full justify-between h-[45px]">
          <div
            onClick={() => {
              setAddCabinet(true);
            }}
            className="bg-[#6499A9] w-[240px] flex items-center px-[15px] h-[45px] rounded-[20px] justify-between shadow-xl cursor-pointer"
          >
            <p className="text-[18px] text-[white]">Додати приміщення </p>
            <div className="w-[32px] h-[32px] bg-[white] rounded-[50%] flex items-center justify-center">
              <img src={plus} className="w-[20px] h-[20px]" alt={"plus"} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col "></div>

      <Footer />
    </div>
  );
};

export default Building;

export const ChangeInfo = ({
  buildingsInfo,
  setBuildingsInfo,
  setChangeInfo,
}) => {
  const [inputLabel, setInputLabel] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputFloors, setInputFloors] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  return (
    <div className="fixed z-60 shadow-2xl bg-[#5294A6] rounded-[30px] pt-[30px] gap-[30px] pb-[50px] flex flex-col w-[450px]">
      <div className="flex justify-center relative">
        <p className="text-[white] text-[20px]">
          Редагування інформації про корпус
        </p>
        <img
          src={close}
          onClick={() => {
            setChangeInfo(false);
          }}
          alt={"close"}
          className="absolute right-[25px] cursor-pointer"
        />
      </div>
      <div className="flex flex-col gap-[30px] items-center">
        <div className="">
          <p className="text-[16px] text-[white]">Назва</p>
          <input
            onChange={(e) => {
              setInputName(e.target.value);
            }}
            defaultValue={buildingsInfo?.title}
            className="w-[300px] h-[45px] bg-[#D9D9D9] outline-none rounded-[12px] px-[10px] border border-[#AFAFAF] shadow-xl"
          />
        </div>
        <div className="">
          <p className="text-[16px] text-[white]">Адреса</p>
          <input
            onChange={(e) => {
              setInputLabel(e.target.value);
            }}
            defaultValue={buildingsInfo?.address}
            className="w-[300px] h-[45px] bg-[#D9D9D9] outline-none rounded-[12px] px-[10px] border border-[#AFAFAF] shadow-xl"
          />
        </div>

        <div className="">
          <p className="text-[16px] text-[white]">Кількість поверхів</p>
          <input
            onChange={(e) => {
              setInputFloors(e.target.value);
            }}
            className="w-[300px] h-[45px] bg-[#D9D9D9] outline-none rounded-[12px] px-[10px] border border-[#AFAFAF] shadow-xl"
            type="number"
            defaultValue={buildingsInfo?.floor_amount}
          />
        </div>
        <div className="">
          <p className="text-[16px] text-[white]">Опис</p>
          <textarea
            onChange={(e) => {
              setInputDesc(e.target.value);
            }}
            className="w-[300px] h-[120px] bg-[#D9D9D9] outline-none rounded-[12px] pt-[10px] px-[10px] border border-[#AFAFAF] shadow-xl resize-none"
            defaultValue={buildingsInfo?.description}
          />
        </div>
        <div className="flex gap-[30px]">
          <button
            className="text-[white] font-bold bg-[#CF4545] text-[16px] w-[140px] h-[45px] rounded-[25px] border border-[#9A3333] shadow-xl"
            onClick={() => {
              setChangeInfo(false);
            }}
          >
            Відмінити
          </button>
          <button
            className="text-[white] font-bold bg-[#43CA51] text-[16px] w-[140px] h-[45px] rounded-[25px] border border-[#2A7D32] shadow-xl"
            onClick={() => {
              setChangeInfo(false);
              setBuildingsInfo({
                id: buildingsInfo?.id,
                adress:
                  inputLabel.length === 0 ? buildingsInfo?.adress : inputLabel,
                floors:
                  inputFloors.length === 0
                    ? buildingsInfo?.floors
                    : inputFloors,
                name: inputName.length === 0 ? buildingsInfo?.name : inputName,
                description:
                  inputDesc.length === 0
                    ? buildingsInfo?.description
                    : inputDesc,
              });
            }}
          >
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
};

export const AddType = ({ setAddType, buildingsInfo, setBuildingsInfo }) => {
  const [inputColor, setInputColor] = useState("");
  const [inputName, setInputName] = useState("");
  const [blocks, setBlocks] = useState([
    { id: 0, name: "Номер приміщення" },
    { id: 1, name: "Назва" },
    { id: 2, name: "Кількість посадкових місць" },
    { id: 3, name: "Проєктор" },
    { id: 4, name: "Список співробітників" },
    { id: 5, name: "Поле для додаткової інформації" },
  ]);

  const [switchStates, setSwitchStates] = useState({});

  const handleSwitchChange = (childId, newSwitchState) => {
    setSwitchStates((prevSwitchStates) => ({
      ...prevSwitchStates,
      [childId]: newSwitchState,
    }));
  };
  return (
    <div className="fixed z-60 shadow-2xl bg-[#5294A6] rounded-[30px] pt-[30px] gap-[30px] pb-[50px] flex flex-col w-[450px]">
      <div className="flex justify-center relative">
        <p className="text-[white] text-[20px]">Додайте новий тип</p>
        <img
          src={close}
          onClick={() => {
            setAddType(false);
          }}
          alt={"close"}
          className="absolute right-[35px] cursor-pointer"
        />
      </div>
      <div className="flex flex-col gap-[30px] items-center">
        <div className="">
          <p className="text-[16px] text-[white]">Назва типу приміщення</p>
          <input
            onChange={(e) => {
              setInputName(e.target.value);
            }}
            className="w-[300px] h-[45px] bg-[#D9D9D9] outline-none rounded-[12px] px-[10px] border border-[#AFAFAF] shadow-xl"
          />
        </div>
        <div className="flex gap-[10px] items-center">
          <p className="text-[16px] text-[white]">Оберіть колір</p>
          <input
            type="color"
            defaultValue={"#D9D9D9"}
            id="colorInput"
            onChange={(e) => {
              setInputColor(e.target.value);
            }}
          />
        </div>

        <p className="text-[20px] text-[white] font-medium">Додати блоки:</p>
        <div className=" flex flex-col items-center w-[270px] gap-[10px]">
          {blocks.map((elem) => {
            return (
              <div
                key={elem.id}
                className="flex w-full justify-between items-center"
              >
                <p className="text-[white]">{elem.name}</p>
                <CheckBox
                  childId={elem.id}
                  switchState={switchStates[elem.id]}
                  onSwitchChange={handleSwitchChange}
                />
              </div>
            );
          })}
        </div>
        <div className="flex gap-[30px]">
          <button
            className="text-[white] font-bold bg-[#CF4545] text-[16px] w-[140px] h-[45px] rounded-[8px] border border-[#9A3333] shadow-xl"
            onClick={() => {
              setAddType(false);
            }}
          >
            Відмінити
          </button>
          <button
            className="text-[white] font-bold bg-[#43CA51] text-[16px] w-[140px] h-[45px] rounded-[8px] border border-[#2A7D32] shadow-xl"
            onClick={() => {
              setAddType(false);
              setBuildingsInfo({
                id: buildingsInfo?.id,
                adress: buildingsInfo?.adress,
                floors: buildingsInfo?.floors,
                name: buildingsInfo?.name,
                description: buildingsInfo?.description,
                types: [
                  ...buildingsInfo?.types,
                  {
                    id: buildingsInfo?.types.length + 1,
                    name: inputName,
                    color: inputColor,
                  },
                ],
              });
            }}
          >
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
};

export const CheckBox = ({ childId, switchState, onSwitchChange }) => {
  const onShowCheck = () => {
    onSwitchChange(childId, !switchState);
  };

  return (
    <div
      className={`${
        switchState ? "checkBox-border-inactive" : "checkBox-border-active"
      }`}
      onClick={onShowCheck}
    >
      <div
        className={`${
          switchState ? "checkBox-body-inactive" : "checkBox-body-active"
        }`}
        onClick={onShowCheck}
      >
        <img
          src={check}
          onClick={onShowCheck}
          className={`${
            switchState ? "visible" : "invisible"
          } h-[12px] w-[12px]`}
          alt={"check"}
        />
      </div>
    </div>
  );
};

export const AddCabinet = ({ setAddCabinet, addCab, types }) => {
  const [cabinetColor, setCabinetColor] = useState("");
  const [cabinetNumber, setCabinetNumber] = useState("");
  const [cabinetTitle, setCabinetTitle] = useState("");
  const [cabinetType, setCabinetType] = useState("Оберіть тип приміщення");
  const [cabinetX, setCabinetX] = useState("");
  const [cabinetY, setCabinetY] = useState("");
  const [cabinetHeight, setCabinetHeight] = useState("");
  const [cabinetWidth, setCabinetWidth] = useState(0);
  return (
    <div className="fixed z-60 shadow-2xl bg-[#5294A6] rounded-[30px] pt-[30px] gap-[30px] pb-[50px] flex flex-col w-[450px]">
      <div className="flex flex-col gap-[15px] text-white items-center relative">
        <p className="text-[white] text-[20px]">Додайте нове приміщення</p>
        <img
          src={close}
          onClick={() => {
            setAddCabinet(false);
          }}
          className="absolute right-[35px] cursor-pointer"
          alt={"close"}
        />
        <p className="text-[16px] text-medium">Інформація: </p>
      </div>
      <div className="flex flex-col gap-[30px] items-center ">
        <div className="">
          <p className="text-[16px] text-[white]">Назва </p>
          <input
            onChange={(e) => {
              setCabinetTitle(e.target.value);
            }}
            className="w-[300px] h-[45px] bg-[#D9D9D9] outline-none rounded-[12px] px-[10px] border border-[#AFAFAF] shadow-xl"
          />
        </div>
        <div className="">
          <p className="text-[16px] text-[white]">Тип приміщення </p>
          <CustomSelect
            defaultText={"Оберіть тип приміщення"}
            optionsList={Object.keys(types)
              .sort(function (a, b) {
                return a - b;
              })
              .map((elem) => ({ name: elem, color: "#" + types[elem] }))}
            setCabinetType={setCabinetType}
          />
        </div>
        <div className="">
          <p className="text-[16px] text-[white]">Номер приміщення </p>
          <input
            onChange={(e) => {
              setCabinetNumber(e.target.value);
            }}
            className="w-[300px] h-[45px] bg-[#D9D9D9] outline-none rounded-[12px] px-[10px] border border-[#AFAFAF] shadow-xl"
          />
        </div>

        <div className="flex gap-[10px] items-center">
          <p className="text-[16px] text-[white]">Оберіть колір</p>
          <input
            type="color"
            defaultValue={"#D9D9D9"}
            id="colorInput"
            onChange={(e) => {
              setCabinetColor(e.target.value);
            }}
          />
        </div>

        <div className=" flex flex-col items-center w-[270px] gap-[10px]">
          <p className="text-[white] text-[18px] font-medium">Розміщення</p>
          <div className="flex gap-[50px]">
            <div className="">
              <p className="text-[16px] text-[white]">Координата Х </p>
              <input
                onChange={(e) => {
                  setCabinetX(e.target.value);
                }}
                className="w-[125px] h-[45px] bg-[#D9D9D9] outline-none rounded-[12px] px-[10px] border border-[#AFAFAF] shadow-xl"
              />
            </div>
            <div className="">
              <p className="text-[16px] text-[white]">Координата Y </p>
              <input
                onChange={(e) => {
                  setCabinetY(e.target.value);
                }}
                className="w-[125px] h-[45px] bg-[#D9D9D9] outline-none rounded-[12px] px-[10px] border border-[#AFAFAF] shadow-xl"
              />
            </div>
          </div>
          <div className="flex gap-[50px]">
            <div className="">
              <p className="text-[16px] text-[white]">Довжина </p>
              <input
                onChange={(e) => {
                  setCabinetWidth(e.target.value);
                }}
                className="w-[125px] h-[45px] bg-[#D9D9D9] outline-none rounded-[12px] px-[10px] border border-[#AFAFAF] shadow-xl"
              />
            </div>
            <div className="">
              <p className="text-[16px] text-[white]">Висота </p>
              <input
                onChange={(e) => {
                  setCabinetHeight(e.target.value);
                }}
                className="w-[125px] h-[45px] bg-[#D9D9D9] outline-none rounded-[12px] px-[10px] border border-[#AFAFAF] shadow-xl"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-[30px]">
          <button
            className="text-[black] font-bold bg-[#BEBDBD] text-[16px] w-[140px] h-[45px] rounded-[8px] border border-[#505050] shadow-xl"
            onClick={() => {}}
          >
            Відмінити
          </button>
          <button
            className="text-[black] font-bold bg-[white] text-[16px] w-[140px] h-[45px] rounded-[8px] border border-[#505050] shadow-xl"
            onClick={() => {
              if (
                cabinetTitle !== "" &&
                cabinetX !== "" &&
                cabinetY !== "" &&
                cabinetHeight !== "" &&
                cabinetWidth !== "" &&
                cabinetColor !== "" &&
                cabinetType !== "Оберіть тип приміщення" &&
                cabinetNumber !== ""
              ) {
                console.log(Number(cabinetWidth));
                addCab.addNewRoom({
                  color: cabinetColor.slice(1),
                  coordinate_x: Number(cabinetX),
                  coordinate_y: Number(cabinetY),
                  height: Number(cabinetHeight),
                  id_cabinets: 1,
                  number: cabinetNumber,
                  title: cabinetTitle,
                  type: cabinetType,
                  width: Number(cabinetWidth),
                });
                setAddCabinet(false);
              }
            }}
          >
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
};

Building.propTypes = {
  buildingsInfo: PropTypes.object,
  setBuildingsInfo: PropTypes.func,
};

ChangeInfo.propTypes = {
  buildingsInfo: PropTypes.object,
  setBuildingsInfo: PropTypes.func,
  setChangeInfo: PropTypes.func,
};

CheckBox.propTypes = {
  childId: PropTypes.number,
  switchState: PropTypes.array,
  onSwitchChange: PropTypes.func,
};

AddType.propTypes = {
  setAddType: PropTypes.func,
  buildingsInfo: PropTypes.object,
  setBuildingsInfo: PropTypes.func,
};
AddCabinet.propTypes = {
  setAddCabinet: PropTypes.func,
};

Building.propTypes = {
  mapInfo: PropTypes.object,
  isAdmin: PropTypes.bool,
};
