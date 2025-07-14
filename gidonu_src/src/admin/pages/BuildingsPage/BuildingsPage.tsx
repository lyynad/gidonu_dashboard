import { useState, useEffect } from 'react'
import './BuildingsPage.css'

// import Header from './components/Header';
import GeneralTable from '../../components/GeneralTable';
import BuildingForm from '../../components/GeneralBuildingForm';
import Popup from '../../../gn-components/popup/GnPopup';

import * as api from '../../helpers/helper';

import { Building } from '../../helpers/interfaces';

import plusIcon from './assets/plus.svg';
import { useScrollToggle } from '../../hooks/useScrollToggle';

function App() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [buildingsUpdate, setBuildingsUpdate] = useState<boolean>(true);
  const [popupMessage, setPopupMessage] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Корпуси";
  })

  useEffect(() => {
    const fetchData = async () => {
      try{
        const buildings = await api.getBuildings();
        const updatedBuildings = buildings.map((building: Building) => ({
                  ...building,
                  type: 'building'  // or any logic you want for the "type"
                }));
        /*
        const sortedBuildings = [...buildings].sort((a: Faculty, b: Faculty) => {
          if (a.title < b.title){
            return -1;
          }
          if (a.title > b.title){
            return 1;
          }
          return 0;
        });
        */

        setBuildings(updatedBuildings);
      } catch(error) {
        console.log(error);
      }
    };

    if(buildingsUpdate){
      fetchData();
      setBuildingsUpdate(false);
    };
  }, [buildingsUpdate]);

  useEffect(() => {
    const handleMouseClick = () => {
      setShowPopup(false);
    };

    if(showPopup){
      document.addEventListener("mousedown", handleMouseClick, false);
    }
    else{
      document.removeEventListener("mousedown", handleMouseClick, false);
    }

  }, [showPopup]);

  useScrollToggle(showForm);

  const updateBuildings = async () => {
    setBuildingsUpdate(true);
  }

  const handleAddClick = async () => {
    setShowForm(true);
  }

  const handleAddClose = async () => {
    setShowForm(false);
  }

  const getId: () => number = () => {
    let id = 1;
    
    try{
      id = buildings[buildings.length - 1].id + 1;
    }
    catch(e) { }

    return id;
  }

  return (
    <div className="content-container">
      <div className="add-btn" onClick={handleAddClick}>

        <span>додати</span>
        <img src={plusIcon} className='image-container' ></img>

      </div>

      {showForm && <BuildingForm building={{type: "building", id: getId(), title: "", description: null, address: null, floor_amount: 0}} title="Додати новий корпус" onClose={handleAddClose} formType="add" updateFaculties={updateBuildings} setResponseMessage={setPopupMessage} setShowResponse={setShowPopup} />}
      {showPopup && <Popup message={popupMessage} code={200} />} 

      <GeneralTable updateFaculties={updateBuildings} rowList={buildings} setResponseMessage={setPopupMessage} setShowResponse={setShowPopup} />
    </div>
  )
}

export default App;