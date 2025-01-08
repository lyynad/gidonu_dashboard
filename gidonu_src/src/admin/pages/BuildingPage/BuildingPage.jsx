import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import BackgroundBlur from "../Components/BackgroundBlur";
import PropTypes from "prop-types";

import {
  getBuildings,
  addNewBuilding,
  deleteBuilding,
  updateBuildingInfo,
} from "../../helpers/helper";
import useLoadingState from "../../helpers/state/buildingsLoading";
import logo from "../../assets/images/logo.png";
import trash from "../../assets/images/trash.png";
import plus from "../../assets/images/plus.png";
import close from "../../assets/images/close.png";
import pen from "../../assets/images/pen.png";

const BuildingPage = ({ setShowMap, setMapInfo }) => {
  const navigate = useNavigate();
  const { loading, setLoading } = useLoadingState();

  const [addBuilding, setAddBuilding] = useState({
    onShow: false,
    onSuccess: false,
  });
  const [onDeleteBuilding, setOnDeleteBuilding] = useState({
    onShow: false,
    onSuccess: false,
  });
  const [changeInfo, setChangeInfo] = useState({
    onShow: false,
    buildingId: 1,
  });
  const [buildings, setBuildings] = useState([]);
  const [triggerGetBuildings, setTriggerGetBuildings] = useState(false);

  useEffect(() => {
    getBuildings(setBuildings, setLoading);
  }, [triggerGetBuildings]);

  useEffect(() => {
    console.log(buildings);
  }, [buildings])

  return (
    <div className="w-[100%] h-[100%]">
      <div className="w-full h-full bg-[#E8E8E8] flex flex-col gap-[30px] items-center">
        {addBuilding.onShow ? (
          <BackgroundBlur>
            <AddBuilding
              buildings={buildings}
              setAddBuilding={setAddBuilding}
              setLoading={setLoading}
              setTriggerGetBuildings={setTriggerGetBuildings}
            />
          </BackgroundBlur>
        ) : (
          ""
        )}
        {changeInfo.onShow ? (
          <BackgroundBlur>
            <ChangeInfo
              selectedBuilding={changeInfo.selectedBuilding}
              setChangeInfo={setChangeInfo}
              setLoading={setLoading}
              setTriggerGetBuildings={setTriggerGetBuildings}
            />
          </BackgroundBlur>
        ) : (
          ""
        )}
        {onDeleteBuilding.onShow ? (
          <BackgroundBlur>
            <DeleteBuilding
              setOnDeleteBuilding={setOnDeleteBuilding}
              onDeleteBuilding={onDeleteBuilding}
              setLoading={setLoading}
              setTriggerGetBuildings={setTriggerGetBuildings}
            />
          </BackgroundBlur>
        ) : (
          ""
        )}
        <div className="flex flex-col w-full items-center">
          <div className="w-[85%] z-[1]">
            <div className="h-[200px] w-full relative rounded-l-[150px] rounded-r-[30px] bg-[#5294A6] flex flex-col justify-center items-center text-white">
              <div className=" absolute left-[20px] bg-[white] rounded-[50%] h-[180px] w-[180px] flex items-center justify-center">
                <img src={logo} className="h-[128px] w-[128px]" alt={"logo"} />
              </div>
              <p className="text-[20px]">НАВІГАТОР</p>
              <p className="text-center">
                по Одеському національному університету <br /> імені І. І.
                Мечникова
              </p>
            </div>
            <div className="flex justify-between pl-[60px] pr-[15px]">
              <div className="pt-[15px] ">
                <div
                  onClick={() => {
                    setAddBuilding({ onShow: true, onSuccess: false });
                  }}
                  className="bg-[#6499A9] flex justify-between items-center px-[15px] h-[65px] rounded-[20px] w-[300px] shadow-xl cursor-pointer"
                >
                  <p className="text-[20px] text-[white]">Додати корпус</p>
                  <div className="w-[32px] h-[32px] bg-[white] rounded-[50%] flex items-center justify-center">
                    <img
                      src={plus}
                      className="w-[20px] h-[20px]"
                      alt={"plus"}
                    />
                  </div>
                </div>
              </div>
              <div className="flex">
                <a
                  href="http://localhost/gidonu_web/admin/"
                  className="bg-[#3F6C84] cursor-pointer flex justify-center items-center h-[75px] text-white text-[20px] font-bold rounded-b-[50px]  screen-1440:w-[400px] screen-1024:w-[200px] shadow-xl"
                >
                  <p>Корпуси</p>
                </a>
                <a
                  href="http://localhost/gidonu/gidonu_web/departments/"
                  className="bg-[#7A97A7] cursor-pointer flex justify-center items-center h-[75px] text-white text-[20px] font-bold rounded-b-[50px] screen-1440:w-[400px] screen-1024:w-[200px] shadow-xl"
                >
                  <p>Відділи</p>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[450px] overflow-auto w-full flex justify-center">
          <div className="flex flex-col  gap-[30px] ">
            {buildings?.map((elem, i) => {
              return (
                <div key={i} className="flex gap-[20px] items-center  relative">
                  <div className="flex items-center w-[450px] h-[90px] bg-[#4A91A6] rounded-[20px]  justify-center shadow-xl">

                  <a
                  href={`http://localhost/gidonu_web/map/?building=${elem?.id}&isAdmin=true`}
                    onClick={() => {
                      // navigate(`/gidonu_web/map/?building=${elem?.id}`);
                    }}
                    className="   text-[white] text-[20px]"
                  >
                    {elem.address}
                  </a>
                  </div>
                  <img
                    src={pen}
                    className="absolute top-[calc(50%-10px)] right-[55px] cursor-pointer"
                    onClick={() => {
                      setChangeInfo({
                        onShow: true,
                        selectedBuilding: {
                          id: elem.id,
                          address: elem.address,
                          floor_amount: elem.floor_amount,
                          description: elem.description,
                          title: elem.title,
                        },
                      });
                    }}
                    alt={"pen"}
                  />
                  <img
                    src={trash}
                    onClick={() => {
                      setOnDeleteBuilding({
                        onShow: true,
                        onSuccess: false,
                        idToDelete: elem.id,
                      });
                    }}
                    alt={"trash"}
                    className="w-[20px] h-[20px] cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AddBuilding = ({
  setAddBuilding,
  setLoading,
  setTriggerGetBuildings,
  buildings
}) => {
  const [inputadress, setInputadress] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputFloors, setInputFloors] = useState("");
  const [inputDesc, setInputDesc] = useState("");

  return (
    <div className="fixed z-60 shadow-2xl bg-[#5294A6] rounded-[30px] pt-[30px] gap-[30px] pb-[50px] flex flex-col w-[450px]">
      <div className="flex justify-center relative">
        <p className="text-[white] text-[20px]">Додайте новий корпус</p>
        <img
          src={close}
          onClick={() => {
            setAddBuilding({ onShow: false, onSuccess: false });
          }}
          alt={"close"}
          className="absolute right-[35px] cursor-pointer"
        />
      </div>
      <div className="flex flex-col gap-[30px] items-center">
        <div className="">
          <p className="text-[16px] text-[white]">Адреса</p>
          <input
            onChange={(e) => {
              setInputadress(e.target.value);
            }}
            className="w-[300px] h-[45px] bg-[#D9D9D9] outline-none rounded-[12px] px-[10px] border border-[#AFAFAF] shadow-xl"
          />
        </div>
        <div className="">
          <p className="text-[16px] text-[white]">Назва</p>
          <input
            onChange={(e) => {
              setInputName(e.target.value);
            }}
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
          />
        </div>
        <div className="">
          <p className="text-[16px] text-[white]">Опис</p>
          <textarea
            onChange={(e) => {
              setInputDesc(e.target.value);
            }}
            className="w-[300px] h-[120px] bg-[#D9D9D9] outline-none rounded-[12px] pt-[10px] px-[10px] border border-[#AFAFAF] shadow-xl resize-none"
          />
        </div>
        <div className="flex gap-[30px]">
          <button
            className="text-[black] font-bold bg-[#D9D9D9] text-[16px] w-[140px] h-[45px] rounded-[25px] border border-[#AFAFAF] shadow-xl"
            onClick={() => {
              if (
                inputadress !== "" &&
                inputDesc !== "" &&
                inputName !== "" &&
                inputFloors !== ""
              ) {
                setAddBuilding({ onShow: false });
                addNewBuilding(
                  {
                    title: inputName,
                    floor_amount: Number(inputFloors),
                    description: inputDesc,
                    address: inputadress,
                  },
                  setLoading,
                  buildings
                );
                setTriggerGetBuildings((prev) => !prev);
              }
            }}
          >
            Зберегти
          </button>
          <button
            className="text-[black] font-bold bg-[#D9D9D9] text-[16px] w-[140px] h-[45px] rounded-[25px] border border-[#AFAFAF] shadow-xl"
            onClick={() => {
              setAddBuilding({ onShow: false, onSuccess: false });
            }}
          >
            Відмінити
          </button>
        </div>
      </div>
    </div>
  );
};

export const DeleteBuilding = ({
  setOnDeleteBuilding,
  onDeleteBuilding,
  setLoading,
  setTriggerGetBuildings,
}) => {
  console.log(onDeleteBuilding);
  return (
    <div className="fixed z-60 shadow-2xl bg-[#5294A6] rounded-[30px] pt-[30px] gap-[30px] pb-[50px] flex flex-col w-[450px]">
      <div className="flex justify-center relative">
        <p className="text-[white] text-[20px] text-[center] w-[220px]">
          Ви справді бажаєте видалити корпус?
        </p>
        <img
          src={close}
          onClick={() => {
            setOnDeleteBuilding({ onShow: false, onSuccess: false });
          }}
          alt={"close"}
          className="absolute right-[35px] cursor-pointer"
        />
      </div>
      <div className="flex gap-[30px] justify-center">
        <button
          className="text-[black] font-bold bg-[#D9D9D9] text-[16px] w-[140px] h-[45px] rounded-[25px] border border-[#AFAFAF] shadow-xl"
          onClick={() => {
            setOnDeleteBuilding({ onShow: false, onSuccess: false });
          }}
        >
          Ні
        </button>
        <button
          className="text-[black] font-bold bg-[#D9D9D9] text-[16px] w-[140px] h-[45px] rounded-[25px] border border-[#AFAFAF] shadow-xl"
          onClick={() => {
            deleteBuilding(onDeleteBuilding.idToDelete, setLoading);
            setOnDeleteBuilding({ onShow: false });
            setTriggerGetBuildings((prev) => !prev);
          }}
        >
          Так
        </button>
      </div>
    </div>
  );
};

export const ChangeInfo = ({
  selectedBuilding,
  setChangeInfo,
  setLoading,
  setTriggerGetBuildings,
}) => {
  const [inputAddress, setInputAddress] = useState(selectedBuilding.address);
  const [inputName, setInputName] = useState(selectedBuilding.title);
  const [inputFloors, setInputFloors] = useState(selectedBuilding.floor_amount);
  const [inputDesc, setInputDesc] = useState(selectedBuilding.description);
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
            defaultValue={selectedBuilding.title}
            className="w-[300px] h-[45px] bg-[#D9D9D9] outline-none rounded-[12px] px-[10px] border border-[#AFAFAF] shadow-xl"
          />
        </div>
        <div className="">
          <p className="text-[16px] text-[white]">Адреса</p>
          <input
            onChange={(e) => {
              setInputAddress(e.target.value);
            }}
            defaultValue={selectedBuilding.address}
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
            defaultValue={selectedBuilding.floor_amount}
          />
        </div>
        <div className="">
          <p className="text-[16px] text-[white]">Опис</p>
          <textarea
            onChange={(e) => {
              setInputDesc(e.target.value);
            }}
            className="w-[300px] h-[120px] bg-[#D9D9D9] outline-none rounded-[12px] pt-[10px] px-[10px] border border-[#AFAFAF] shadow-xl resize-none"
            defaultValue={selectedBuilding.description}
          />
        </div>
        <div className="flex gap-[30px]">
          <button
            className="text-[black] font-bold bg-[#BEBDBD] text-[16px] w-[140px] h-[45px] rounded-[25px] border border-[#979696] shadow-xl"
            onClick={() => {
              setChangeInfo(false);
            }}
          >
            Відмінити
          </button>
          <button
            className="text-[black] font-bold bg-[#FFF] text-[16px] w-[140px] h-[45px] rounded-[25px] shadow-md shadow-white"
            onClick={() => {
              setChangeInfo(false);
              if (
                inputAddress !== "" &&
                inputDesc !== "" &&
                inputFloors !== "" &&
                inputName !== ""
              ) {
                updateBuildingInfo(
                  selectedBuilding.id,
                  {
                    title: inputName,
                    floor_amount: inputFloors,
                    description: inputDesc,
                    address: inputAddress,
                  },
                  setLoading
                );
                setTriggerGetBuildings((prev) => !prev);
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

export default BuildingPage;

DeleteBuilding.propTypes = {
  setOnDeleteBuilding: PropTypes.func,
  onDeleteBuilding: PropTypes.object,
  setLoading: PropTypes.func,
  setTriggerGetBuildings: PropTypes.func,
};

AddBuilding.propTypes = {
  setAddBuilding: PropTypes.func,
  setBuildings: PropTypes.func,
  buildings: PropTypes.array,
  setLoading: PropTypes.func,
  setTriggerGetBuildings: PropTypes.func,
};

BuildingPage.propTypes = {
  buildings: PropTypes.array,
  setBuildings: PropTypes.func,
  setSelectedBuilding: PropTypes.func,
  setTriggerGetBuildings: PropTypes.func,
};

ChangeInfo.propTypes = {
  buildings: PropTypes.array,
  setBuildings: PropTypes.func,
  setChangeInfo: PropTypes.func,
  buildingId: PropTypes.number,
  setTriggerGetBuildings: PropTypes.func,
  selectedBuilding: PropTypes.object,
};

BuildingPage.propTypes = {
  setShowMap: PropTypes.func,
  setMapInfo: PropTypes.func,
};
