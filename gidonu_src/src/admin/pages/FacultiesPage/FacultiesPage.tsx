import { useState, useEffect } from 'react'
import './FacultiesPage.css'

// import Header from './components/Header';
import GeneralTable from '../Components/GeneralTable';
import FacultyForm from '../Components/GeneralFacultyForm';
import Popup from '../../../gn-components/popup/GnPopup';

import * as api from '../../helpers/helper';

import { Faculty, Building, BuildingsFacultiesDependence } from '../../helpers/interfaces';

import plusIcon from './assets/plus.svg';

function App() {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [buildingsFacultiesDependences, setBuildingsFacultiesDependences] = useState<BuildingsFacultiesDependence[]>([]);
  const [sortedFaculties, setSortedFaculties] = useState<Faculty[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [facultiesUpdate, setFacultiesUpdate] = useState<boolean>(true);
  const [popupMessage, setPopupMessage] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const faculties = await api.getFaculties();
        const updatedFaculties = faculties.map((faculty: Faculty) => ({
          ...faculty,
          type: 'faculty'
        }));

        const sortedFaculties = [...updatedFaculties].sort((a: Faculty, b: Faculty) => {
          if (a.title < b.title){
            return -1;
          }
          if (a.title > b.title){
            return 1;
          }
          return 0;
        });

        setSortedFaculties(sortedFaculties);
        setFaculties(faculties);

        const buildings = await api.getBuildings();
        setBuildings(buildings);

        const buildingsFacultiesDependences = await api.getBuildingsFacultiesDependences();
        setBuildingsFacultiesDependences(buildingsFacultiesDependences);
      } catch(error) {
        console.log(error);
      }
    };

    if(facultiesUpdate){
      fetchData();
      setFacultiesUpdate(false);
    };
  }, [facultiesUpdate]);

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

  const updateFaculties = async () => {
    setFacultiesUpdate(true);
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
      id = faculties[faculties.length - 1].id + 1;
    }
    catch(e) { }

    return id;
  }

  //if (loading)
  //  return <LoadingScreen />

  return (
    <div className="content-container">
      <div className="add-btn" onClick={handleAddClick}>

        <span>Додати</span>
        <img src={plusIcon} className='image-container' ></img>

      </div>

      {showForm && <FacultyForm faculty={{type: "faculty", id: getId(), title: "", description: null, contacts: null}} title="Додати новий факультет" onClose={handleAddClose} formType="add" updateFaculties={updateFaculties} setResponseMessage={setPopupMessage} setShowResponse={setShowPopup} buildings={buildings} buildingsFacultiesDependences={buildingsFacultiesDependences} />}
      {showPopup && <Popup message={popupMessage} code={200} />} 

      <GeneralTable updateFaculties={updateFaculties} rowList={sortedFaculties} setResponseMessage={setPopupMessage} setShowResponse={setShowPopup} buildings={buildings} buildingsFacultiesDependences={buildingsFacultiesDependences} />
    </div>
  )
}

export default App;