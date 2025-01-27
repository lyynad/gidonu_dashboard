import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './GeneralForm.css';
import { Faculty, Building, BuildingsFacultiesDependence } from "../../helpers/interfaces";
import ConfirmWindow from './GeneralConfirmWindow';
import closeIcon from "../../assets/images/svg/closeIcon.svg";
import * as api from '../../helpers/helper';

type FormType = "add" | "edit";

interface Props {
    faculty: Faculty,
    title: string,
    onClose: () => void,
    formType: FormType,
    updateFaculties: () => void,
    setResponseMessage: React.Dispatch<React.SetStateAction<string>>,
    setShowResponse: React.Dispatch<React.SetStateAction<boolean>>,
    buildings: Building[],
    buildingsFacultiesDependences: BuildingsFacultiesDependence[],
}

const FacultyForm = ({faculty, title, onClose, formType, updateFaculties, setResponseMessage, setShowResponse, buildings, buildingsFacultiesDependences}: Props) => {
    const [showConfirmAccept, setShowConfirmAccept] = useState<boolean>(false);
    const [showConfirmDecline, setShowConfirmDecline] = useState<boolean>(false);
    const [showOverlay, setShowOverlay] = useState<boolean>(true);
    const [showTooltip, setShowTooltip] = useState<boolean>(false);
    const [editedFaculty, setEditedFaculty] = useState<Faculty>(faculty);
    const [textAreaFocused, setTextAreaFocused] = useState<boolean>(false);
    const [currentDependencies, setCurrentDependencies] = useState<BuildingsFacultiesDependence[]>([]);
    const [initialDependencies, setInitialDependencies] = useState<BuildingsFacultiesDependence[]>([]);
    const [buildingsListVisibility, setBuildingsListVisibility] = useState<boolean>(false);
    const [toggleListAnimation, setToggleListAnimation] = useState<boolean>(false);

    const [titleChanged, setTitleChanged] = useState<boolean>(false);
    const [descriptionChanged, setDescriptionChanged] = useState<boolean>(false);
    const [contactsChanged, setContactsChanged] = useState<boolean>(false);
    const [dependenciesChanged, setDependenciesChanged] = useState<boolean>(false);

    useEffect(() => {    
        const getCurrentDependencies = () => {
            setCurrentDependencies(buildingsFacultiesDependences.filter((dependecy) => dependecy.id_faculties === faculty.id));
            setInitialDependencies(buildingsFacultiesDependences.filter((dependecy) => dependecy.id_faculties === faculty.id));
        }

        getCurrentDependencies();
    }, []);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if(event.key === "Escape" && !showConfirmDecline && !showConfirmAccept)
                handleDeclineClick();
        };

        const handleEnter = (event: KeyboardEvent) => {
            if(event.key === "Enter" && !showConfirmDecline && !showConfirmAccept)
                handleAcceptClick();
        };

        const handleTooltip = () => {
            setShowTooltip(false);
        };

        const handleBuildingsList = () => {
            setBuildingsListVisibility(false);
        }

        document.addEventListener("mousedown", handleTooltip, false);
        document.addEventListener("mousedown", handleBuildingsList, false);
        document.getElementsByClassName("info-window-field-selectContainer")[0].addEventListener("mousedown", (event) => {
            event.stopPropagation();
            handleTooltip();
        });
        document.addEventListener("keydown", handleEscape, false);
        document.body.style.overflowY = "hidden";

        if (!textAreaFocused) {
            document.addEventListener("keydown", handleEnter, false);
        }
        else{
            document.removeEventListener("keydown", handleEnter, false);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape, false);
            document.removeEventListener("keydown", handleEnter, false);
            document.removeEventListener("mousedown", handleTooltip, false);
            document.removeEventListener("mousedown", handleBuildingsList, false);
            document.body.style.overflowY = "auto";
        };
    }, [showConfirmAccept, showConfirmDecline, textAreaFocused, buildingsListVisibility, titleChanged, contactsChanged, descriptionChanged, dependenciesChanged]);

    const handleAcceptClick = async () => {
        (document.getElementsByClassName("info-window-field-title")[0] as HTMLInputElement).checkValidity();   

        if((titleChanged || descriptionChanged || contactsChanged || dependenciesChanged) && !showTooltip) {
            setShowConfirmAccept(true);
            setShowOverlay(false);
        }
        else{
            if (formType === "edit")
                onClose();
        }
    };

    const handleAcceptClose = {
        closeMain: async () => {  
            onClose();
            updateFaculties();
            
            let responseFaculty;
            // let responseDependence;
            try{                
                switch(formType){
                    case "add":
                        responseFaculty = await api.addFaculty(editedFaculty.id, editedFaculty.title || null, editedFaculty.description || null, editedFaculty.contacts || null);
                        for(let i = 0; i < currentDependencies.length; i++){
                            await api.addBuildingsFacultiesDependence(currentDependencies[i].id, currentDependencies[i].id_buildings, currentDependencies[i].id_faculties);
                        }
                        break;
                    case "edit":
                        if(titleChanged || contactsChanged || descriptionChanged)
                            responseFaculty = await api.editFaculty(editedFaculty.id, editedFaculty.title || null, editedFaculty.description || null, editedFaculty.contacts || null);
                        
                        if (dependenciesChanged){
                            for(let i = 0; i < initialDependencies.length; i++){
                                if (!currentDependencies.find((dependency) => { return dependency.id === initialDependencies[i].id }))
                                    responseFaculty = await api.deleteBuildingsFacultiesDependency(initialDependencies[i].id);
                            }
                            for(let i = 0; i < currentDependencies.length; i++){
                                if (!buildingsFacultiesDependences.find((dependency) => { return (dependency.id_buildings === currentDependencies[i].id_buildings && dependency.id_faculties === currentDependencies[i].id_faculties) }))
                                    responseFaculty = await api.addBuildingsFacultiesDependence(currentDependencies[i].id, currentDependencies[i].id_buildings, currentDependencies[i].id_faculties);
                            }
                        }
                        break;
                };
            } catch(error: any){
                console.log(error.message);
                responseFaculty = error.response;
            };

            setResponseMessage(responseFaculty.message + " Статус: " + responseFaculty.code);
            setShowResponse(true);
        },

        closeCurrent: async () => {
            setShowConfirmAccept(false);
            setShowOverlay(true);
        }
    };

    const handleDeclineClick = async () => {
        if(titleChanged || descriptionChanged || contactsChanged || dependenciesChanged) {
            setShowConfirmDecline(true);
            setShowOverlay(false);
        }
        else
            onClose();
    };

    const handleDeclineClose = {
        closeMain: () => {
            onClose();
            updateFaculties();
        },
        closeCurrent: () => {
            setShowConfirmDecline(false);
            setShowOverlay(true);
        }
    };

    const handleValuesChange = async (event: ChangeEvent<any>, building?: Building) => {
        switch(event.target.className){
            case "info-window-field-title":
                if (event.target.value != faculty.title){
                    setEditedFaculty({
                        ...editedFaculty,
                        title: event.target.value
                    });
                    setTitleChanged(true);
                }
                else{
                    setTitleChanged(false);
                }
                break;
            case "info-window-field-description":
                if (event.target.value != faculty.description){
                    setEditedFaculty({
                        ...editedFaculty,
                        description: event.target.value
                    });
                    
                    setDescriptionChanged(true);
                }
                else{
                    setDescriptionChanged(false);
                }
                break;
            case "info-window-field-contacts":
                if (event.target.value != faculty.contacts){
                    setEditedFaculty({
                        ...editedFaculty,
                        contacts: event.target.value
                    });
                    
                    setContactsChanged(true);
                }
                else {
                    setContactsChanged(false);
                }
                break;
            case "info-window-field-selectContainer-list-listElement":
                let valuesChanged = false;

                if(building && !currentDependencies.find((dependency) => dependency.id_buildings === building.id)){
                    let dependency_id = buildingsFacultiesDependences.length > 0 ? buildingsFacultiesDependences[buildingsFacultiesDependences.length - 1].id + 1 : 1;

                    const dependency = buildingsFacultiesDependences.find((dependency) => { return dependency.id_buildings === building.id && dependency.id_faculties === faculty.id })
                    if (dependency !== undefined)
                        dependency_id = dependency.id;
                    else if(currentDependencies.length > 0){
                        dependency_id = (buildingsFacultiesDependences.length > 0 ? ((buildingsFacultiesDependences[buildingsFacultiesDependences.length - 1].id + 1) > currentDependencies[currentDependencies.length - 1].id + 1 ? buildingsFacultiesDependences[buildingsFacultiesDependences.length - 1].id + 1 : currentDependencies[currentDependencies.length - 1].id + 1) : currentDependencies[currentDependencies.length - 1].id + 1);
                    }

                    let newDependency: BuildingsFacultiesDependence = {
                        id: dependency_id,
                        id_buildings: building.id,
                        id_faculties: faculty.id
                    }

                    setCurrentDependencies([...currentDependencies, newDependency]);

                    // if initial array has a value of a new dependency -> the dependency was removed and added again, values have not changed 
                    if (!initialDependencies.find((dependency) => { return (dependency.id_buildings === newDependency.id_buildings && dependency.id_faculties === newDependency.id_faculties) })){
                        valuesChanged = true;
                    }
                    else {
                        valuesChanged = false;
                    }

                    console.log(currentDependencies);
                }
                else if(building){
                    if (buildingsFacultiesDependences.find((dependency) => { return (dependency.id_buildings === building.id && dependency.id_faculties === faculty.id) })){
                        valuesChanged = true;
                    }
                    else{
                        valuesChanged = false;

                        // if the current array does not have one of the initial values, values have changed
                        for(let i = 0; i < initialDependencies.length; i++){                                
                            if (!currentDependencies.find((dependency) => { return (dependency.id_buildings === initialDependencies[i].id_buildings && dependency.id_faculties === initialDependencies[i].id_faculties) })){
                                valuesChanged = true;
                                break;
                            }
                        }
                    }
                    
                    setCurrentDependencies(currentDependencies.filter((dependency) => {
                        return dependency.id_buildings !== building.id
                    }));
                }

                setDependenciesChanged(valuesChanged);
                break;
        }
    };

    const handleInvalidInput = (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        setShowTooltip(true);
    };

    const handleTextAreaOnFocus = () => {
        setTextAreaFocused(true);
    };
    const handleTextAreaOnFocusOut = () => {
        setTextAreaFocused(false);
    };

    const handleListButtonClick = () => {
        setBuildingsListVisibility(!buildingsListVisibility);
        setToggleListAnimation(true);
    };

    const checkDependency: (building_id: number, faculty_id: number) => boolean = (building_id: number, faculty_id: number) => {
        for (let i = 0; i < currentDependencies.length; i++){
            if (currentDependencies[i].id_buildings === building_id)
                if (currentDependencies[i].id_faculties === faculty_id)
                    return true;
        }

        return false;
    }

    return(
        <>

            {showOverlay && <div className='overlay'></div>}
            
            <form className="info-window" onSubmit={e => e.preventDefault()}>

                <img src={closeIcon} alt="close" role="button" style={{"marginLeft": "auto", "marginRight": "6.2cqw", "marginTop": "5cqw", "cursor": "pointer", "width": "4.5cqw"}} onClick={handleDeclineClick} />
                <h1>{title}</h1>

                <div className="info-window-fields-container">
                    
                    <div className="info-window-field">
                        <label>Назва</label>
                        <input className="info-window-field-title" defaultValue={faculty.title || ""} onChange={handleValuesChange} required={true} onInvalid={handleInvalidInput} autoFocus readOnly={(showConfirmAccept || showConfirmDecline) ? true : false}></input>
                        <div className="tooltip" style={showTooltip ? {"visibility": "visible"} : {"visibility": "hidden"}}>Будь ласка, введіть назву.</div>
                    </div>
                    
                    <div className="info-window-field">
                        <label>Корпус</label>
                        <div className='info-window-field-selectContainer'>
                            <button className="info-window-field-selectContainer-button listShown" type="button" onClick={handleListButtonClick} style={{"borderRadius": `${buildingsListVisibility ? "6cqw 6cqw 0px 0px" : "6cqw"}`}}>{currentDependencies.length === 0 ? " " : (currentDependencies.length === 1 ? buildings.find((building) => { return building.id === currentDependencies[0].id_buildings })?.title : `Корпусів: ${currentDependencies.length}`)}</button>
                            <ul className='info-window-field-selectContainer-list' style={{"display" : `${buildingsListVisibility ? "block" : "none"}`}}>
                                {buildings.map((building) => (
                                    <li className="info-window-field-selectContainer-list-listElement" key={building.id} style={{"backgroundColor": `${checkDependency(building.id, faculty.id) ? "rgba(166, 159, 159, 0.43)" : ""}`}} onClick={(e) => handleValuesChange(e, building)}>{building.title}</li>
                                ))}
                            </ul>
                            <div className={`info-window-field-selectContainer-arrow ${toggleListAnimation ? (buildingsListVisibility ? "animate" : "animateBack") : ""}`}></div>
                        </div>
                    </div>

                    <div className="info-window-field">
                        <label>Опис</label>
                        <textarea className="info-window-field-description" defaultValue={faculty.description || ""} onFocus={handleTextAreaOnFocus} onBlur={handleTextAreaOnFocusOut} onChange={handleValuesChange} readOnly={(showConfirmAccept || showConfirmDecline) ? true : false}></textarea>
                    </div>

                    <div className="info-window-field">
                        <label>Контакти</label>
                        <textarea className="info-window-field-contacts" defaultValue={faculty.contacts || ""} onFocus={handleTextAreaOnFocus} onBlur={handleTextAreaOnFocusOut} onChange={handleValuesChange} readOnly={(showConfirmAccept || showConfirmDecline) ? true : false}></textarea>
                    </div>

                </div>

                <div className="info-window-button-container">
                    <button type="submit" onClick={handleAcceptClick}>Зберегти</button>
                    <button type="button" onClick={handleDeclineClick}>Відмінити</button>
                </div>

            </form>

            {showConfirmAccept && <ConfirmWindow entity={editedFaculty} text="Ви дійсно хочете зберегти зміни?" onClose={handleAcceptClose} confirmType="edit" />}
            {showConfirmDecline && <ConfirmWindow entity={editedFaculty} text="Ви дійсно хочете відмінити зміни?" onClose={handleDeclineClose} confirmType="edit" />}

        </>
    )
};

export default FacultyForm;