import ReactDOM from 'react-dom';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Faculty, Building, BuildingsFacultiesDependence } from "../helpers/interfaces";
import './GeneralTable.css';
import deleteImage from '../assets/images/svg/trash.svg';
import editImage from '../assets/images/svg/pencil.svg';
import FacultyForm from './GeneralFacultyForm';
import ConfirmWindow from './GeneralConfirmWindow';
import * as api from '../helpers/helper';
import BuildingForm from './GeneralBuildingForm';

import { useScrollToggle } from '../hooks/useScrollToggle';

enum TableType {
    Faculties,
    Buildings
}

type Props =
  | {
      rowList: Faculty[];
      updateFaculties: () => void;
      setResponseMessage: React.Dispatch<React.SetStateAction<string>>;
      setShowResponse: React.Dispatch<React.SetStateAction<boolean>>;
      buildings: Building[];
      buildingsFacultiesDependences: BuildingsFacultiesDependence[];
    }
  | {
      rowList: Building[];
      updateFaculties: () => void;
      setResponseMessage: React.Dispatch<React.SetStateAction<string>>;
      setShowResponse: React.Dispatch<React.SetStateAction<boolean>>;
      buildings?: never;
      buildingsFacultiesDependences?: never;
    };

const isFaculty = (row: Faculty | Building | undefined) : row is Faculty => !!row && row.type === "faculty";
const isBuilding = (row: Faculty | Building | undefined) : row is Building => !!row && row.type === "building";

const GeneralTable = ({rowList, updateFaculties, setResponseMessage, setShowResponse, buildings, buildingsFacultiesDependences}: Props) => {  
    const rootElement = document.getElementById('react-root');

    const [tableType, setTableType] = useState<TableType>();
    const [selectedRow, setSelectedRow] = useState<Faculty | Building>();
    const [showForm, setShowForm] = useState<boolean>(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

    useEffect(() => {
        if (rowList.length > 0)
            if (isFaculty(rowList[0])) setTableType(TableType.Faculties);
            if (isBuilding(rowList[0])) setTableType(TableType.Buildings);
    }, [rowList]);

    useScrollToggle(showConfirmDelete || showForm);
    
    const selectRow = (row: Faculty | Building) => {
        setSelectedRow(row);
    }

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
        closeMain: async (id?: number) => {
            let response;
            try{
                if(tableType === TableType.Faculties){
                    response = await api.deleteFaculty(id);

                    for(let i = 0; i < buildingsFacultiesDependences!.length; i++){
                        if(buildingsFacultiesDependences![i].id_faculties === selectedRow!.id)
                            await api.deleteBuildingsFacultiesDependency(buildingsFacultiesDependences![i].id);
                    }
                }

                if(tableType === TableType.Buildings){
                    response = await api.deleteBuilding(id);
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

    const renderRow = (row: Faculty | Building) => {
        return (
            <a key={row.id} className="row-link" href={isBuilding(row) ? `../map/?building=1&zoom=0.9&x=151&y=15&isAdmin=true` : undefined}>
                <div 
                    className="row" 
                    style={{"cursor": `${tableType === TableType.Buildings ? "pointer" : ""}`}}
                >

                    {isFaculty(row) &&
                        <span className="row-text"><i>{row.title}</i></span>
                    }
                    {isBuilding(row) &&
                        <div className="row-text-container">
                            <span className="row-text"><i>{row.address}</i></span>
                            <span className="row-subtext">
                                {row.title} | {row.floor_amount} {row.floor_amount === 1 ? "поверх" : (row.floor_amount < 5 ? "поверхи" : "поверхів")}
                            </span>
                        </div>
                    }
                    <div className="row-images" onClick={(e) => {e.preventDefault();}}>
                        <img 
                            className="image-edit" 
                            src={editImage} 
                            alt="edit" 
                            role="button" 
                            onClick={() => {selectRow(row); handleEditClick();}} 
                        />
                        
                        <img 
                            className="image-delete" 
                            src={deleteImage} 
                            alt="delete" 
                            role="button" 
                            onClick={() => {selectRow(row); handleDeleteClick();}} 
                        />
                    </div>
                </div>
            </a>
        )
    }

    return (
        <>
            {tableType === TableType.Faculties && showForm && rootElement && ReactDOM.createPortal(
                <FacultyForm faculty={selectedRow as Faculty} title="Редагувати інформацію про факультет" onClose={handleEditClose} formType="edit" updateFaculties={updateFaculties} setResponseMessage={setResponseMessage} setShowResponse={setShowResponse} buildings={buildings!} buildingsFacultiesDependences={buildingsFacultiesDependences!} />,
                rootElement
            )}
            {tableType === TableType.Buildings && showForm && rootElement && ReactDOM.createPortal(
                <BuildingForm building={selectedRow as Building} title="Редагувати інформацію про корпус" onClose={handleEditClose} formType="edit" updateFaculties={updateFaculties} setResponseMessage={setResponseMessage} setShowResponse={setShowResponse} />,
                rootElement
            )}

            {tableType === TableType.Faculties && showConfirmDelete && rootElement && ReactDOM.createPortal(
                <ConfirmWindow entity={selectedRow as Faculty} text="Ви дійсно бажаєте видалити факультет?" onClose={handleDeleteAccept} confirmType="delete" />,
                rootElement
            )}
            {tableType === TableType.Buildings && showConfirmDelete && rootElement && ReactDOM.createPortal(
                <ConfirmWindow entity={selectedRow as Building} text="Ви дійсно бажаєте видалити корпус?" onClose={handleDeleteAccept} confirmType="delete" />,
                rootElement
            )}

            <div className="fc-table-container">

                <div className="table-header">
                    <span>
                        {tableType === TableType.Faculties && "Факультети"}
                        {tableType === TableType.Buildings && "Корпуси"}
                    </span>
                </div>
                <div className="row-container">
                    {rowList.map(renderRow)}
            </div>

            </div>
        
        </>
    )
}

export default GeneralTable;