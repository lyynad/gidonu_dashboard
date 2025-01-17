import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import '../styles/facultyRow.css';
import deleteImage from '../assets/trash.svg';
import editImage from '../assets/pencil.svg';
import Faculty from '../module/types/faculty';
import Building from '../module/types/building';
import FacultyForm from './FacultyForm';
import ConfirmWindow from './ConfirmWindow';
import * as api from '../module/classes/api';
import BuildingsFacultiesDependence from '../module/types/buildingsFacultiesDependance';
import { Root } from 'postcss';

interface Props{
    faculty: Faculty,
    updateFaculties: () => void,
    setResponseMessage: React.Dispatch<React.SetStateAction<string>>,
    setShowResponse: React.Dispatch<React.SetStateAction<boolean>>,
    buildings: Building[],
    buildingsFacultiesDependences: BuildingsFacultiesDependence[]
};

const Control = ({faculty, updateFaculties, setResponseMessage, setShowResponse, buildings, buildingsFacultiesDependences}: Props) => {  
    const rootElement = document.getElementById('root');
    const [showForm, setShowForm] = useState<boolean>(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

    useEffect(() => {
        if(showConfirmDelete)
            document.body.style.overflowY = "hidden";
        else
            document.body.style.overflowY = "auto";
    }, [showConfirmDelete]);
    
    const handleEditClick = async () => {
        setShowForm(true);
    };

    const handleEditClose = async () => {
        setShowForm(false);
    };

    const handleDeleteClick = async () => {
        setShowConfirmDelete(true);
    };

    const handleDeleteClose = async () => {
        setShowConfirmDelete(false);
    };

    const handleDeleteAccept = {
        closeMain: async (id: number) => {
            let response;
            try{
                response = await api.deleteFaculty(id);

                for(let i = 0; i < buildingsFacultiesDependences.length; i++){
                    if(buildingsFacultiesDependences[i].id_faculties === faculty.id)
                        await api.deleteBuildingsFacultiesDependency(buildingsFacultiesDependences[i].id);
                }
            } catch(error: any){
                console.log(error.message);
                response = error.response;
            };

            updateFaculties();
            setResponseMessage(response.message + " Статус: " + response.code);
            setShowResponse(true);
        },

        closeCurrent: handleDeleteClose
    };

    return (
        <>
        {showForm && rootElement && ReactDOM.createPortal(
                    <FacultyForm faculty={faculty} title="Редагувати інформацію про факультет" onClose={handleEditClose} formType="edit" updateFaculties={updateFaculties} setResponseMessage={setResponseMessage} setShowResponse={setShowResponse} buildings={buildings} buildingsFacultiesDependences={buildingsFacultiesDependences} />,
                    rootElement
        )}
        {showConfirmDelete && rootElement && ReactDOM.createPortal(
            <ConfirmWindow faculty={faculty} text="бажаєте видалити факультет" onClose={handleDeleteAccept} confirmType="delete" />,
            rootElement
        )}

        <div className="faculty-row">

                <span className="faculty-row-text"><i>{faculty.title}</i></span>
                <div className="faculty-row-images">
                    <img className="image-edit" src={editImage} alt="edit" role="button" onClick={handleEditClick}/>
                    <img className="image-delete" src={deleteImage} alt="delete" role="button" onClick={handleDeleteClick} />
                </div>
        </div>
        </>
    )
}

export default Control;