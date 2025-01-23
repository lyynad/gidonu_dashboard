import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import './GeneralForm.css';
import { Building } from '../../helpers/interfaces';
import ConfirmWindow from './GeneralConfirmWindow';
import closeIcon from "../../assets/images/svg/closeIcon.svg";
import * as api from '../../helpers/helper';

type FormType = "add" | "edit";

interface Props {
    building: Building,
    title: string,
    onClose: () => void,
    formType: FormType,
    updateFaculties: () => void,
    setResponseMessage: React.Dispatch<React.SetStateAction<string>>,
    setShowResponse: React.Dispatch<React.SetStateAction<boolean>>
}

const BuildingForm = ({building, title, onClose, formType, updateFaculties, setResponseMessage, setShowResponse}: Props) => {
    const [showConfirmAccept, setShowConfirmAccept] = useState<boolean>(false);
    const [showConfirmDecline, setShowConfirmDecline] = useState<boolean>(false);
    const [showOverlay, setShowOverlay] = useState<boolean>(true);
    const [showTooltip, setShowTooltip] = useState<boolean>(false);
    const [editedBuilding, setEditedBuilding] = useState<Building>(building);
    const [textAreaFocused, setTextAreaFocused] = useState<boolean>(false);

    const [titleChanged, setTitleChanged] = useState<boolean>(false);
    const [addressChanged, setAddressChanged] = useState<boolean>(false);
    const [floorAmountChanged, setFloorAmountChanged] = useState<boolean>(false);
    const [descriptionChanged, setDescriptionChanged] = useState<boolean>(false);

    const [floorAmountValueHandler, setFloorAmountValueHandler] = useState<number>(building.floor_amount);

    const numericInputRef = useRef<HTMLInputElement>(null);
    const addressInputRef = useRef<HTMLInputElement>(null);
    const titleInputRef = useRef<HTMLInputElement>(null);

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

        document.addEventListener("mousedown", handleTooltip, false);

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
            document.body.style.overflowY = "auto";
        };
    }, [showConfirmAccept, showConfirmDecline, textAreaFocused, titleChanged, addressChanged, descriptionChanged, floorAmountChanged]);

    const handleAcceptClick = async () => {
        (document.getElementsByClassName("info-window-field-title")[0] as HTMLInputElement).checkValidity();   

        if(((formType === "edit" && (titleChanged || descriptionChanged || addressChanged || floorAmountChanged)) || (formType === "add" && (titleChanged && floorAmountChanged && addressChanged))) && !showTooltip) {
            setShowConfirmAccept(true);
            setShowOverlay(false);
        }
        else{
            if (formType === "edit")
                onClose();
        }
    };

    const handleAcceptClose = {
        closeMain: async (id: number, title?: string, description?: string, address?: string, floor_amount?: number) => {  
            onClose();
            updateFaculties();
            
            let response;
            try{                
                switch(formType){
                    case "add":
                        response = await api.addBuilding(id, title || null, description || null, address || null, floor_amount || null);
                        break;
                    case "edit":
                        if(titleChanged || descriptionChanged || addressChanged || floorAmountChanged)
                            response = await api.editBuilding(id, title || null, description || null, address || null, floor_amount || null);
                        break;
                };
            } catch(error: any){
                console.log(error.message);
                response = error.response;
            };

            setResponseMessage(response.message + " Статус: " + response.code);
            setShowResponse(true);
        },

        closeCurrent: async () => {
            setShowConfirmAccept(false);
            setShowOverlay(true);
        }
    };

    const handleDeclineClick = async () => {
        if(titleChanged || descriptionChanged || addressChanged || floorAmountChanged) {
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

    const handleValuesChange = async (event: ChangeEvent<any>) => {
        console.log(event.target.value);
        switch(event.target.className){
            case "info-window-field-title":
                if (event.target.value != building.title){
                    setEditedBuilding({
                        ...editedBuilding,
                        title: event.target.value
                    });
                    setTitleChanged(true);
                }
                else{
                    setTitleChanged(false);
                }
                break;
            case "info-window-field-description":
                if (event.target.value != building.description){
                    setEditedBuilding({
                        ...editedBuilding,
                        description: event.target.value
                    });
                    
                    setDescriptionChanged(true);
                }
                else{
                    setDescriptionChanged(false);
                }
                break;
            case "info-window-field-address":
                if (event.target.value != building.address){
                    setEditedBuilding({
                        ...editedBuilding,
                        address: event.target.value
                    });
                    
                    setAddressChanged(true);
                }
                else {
                    setAddressChanged(false);
                }
                break;
            case "info-window-field-floorAmount":
                if (event.target.value != building.floor_amount){
                    setEditedBuilding({
                        ...editedBuilding,
                        floor_amount: Number(event.target.value)
                    });
                    
                    setFloorAmountChanged(true);
                }
                else {
                    setFloorAmountChanged(false);
                }
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

    const handleNumericIncrement = () => {
        if (floorAmountValueHandler < 20){
            const newValue = floorAmountValueHandler + 1;
            setFloorAmountValueHandler(newValue);

            let fakeEvent: ChangeEvent<HTMLInputElement>;
            if (numericInputRef.current) {
                if (newValue === 0)
                    numericInputRef.current.value = String(undefined);
                else
                    numericInputRef.current.value = String(newValue);
                fakeEvent = {
                    target: numericInputRef.current,
                    currentTarget: numericInputRef.current,
                    nativeEvent: new Event('change'),
                    bubbles: false,
                    cancelable: true,
                    defaultPrevented: false,
                    eventPhase: 2,
                    isTrusted: true,
                    isDefaultPrevented: () => false,
                    isPropagationStopped: () => false,
                    preventDefault: () => {},
                    stopPropagation: () => {},
                    persist: () => {},
                    timeStamp: Date.now(),
                    type: 'change',
                };

                handleValuesChange(fakeEvent);
            }
        }
    };

    const handleNumericDecrement = () => {
        if (floorAmountValueHandler > 0)
        {
            const newValue = floorAmountValueHandler - 1;
            setFloorAmountValueHandler(newValue);

            let fakeEvent: ChangeEvent<HTMLInputElement>;
            if (numericInputRef.current) {
                if (newValue === 0)
                    numericInputRef.current.value = String(undefined);
                else
                    numericInputRef.current.value = String(newValue);
                fakeEvent = {
                    target: numericInputRef.current,
                    currentTarget: numericInputRef.current,
                    nativeEvent: new Event('change'),
                    bubbles: false,
                    cancelable: true,
                    defaultPrevented: false,
                    eventPhase: 2,
                    isTrusted: true,
                    isDefaultPrevented: () => false,
                    isPropagationStopped: () => false,
                    preventDefault: () => {},
                    stopPropagation: () => {},
                    persist: () => {},
                    timeStamp: Date.now(),
                    type: 'change',
                };

                handleValuesChange(fakeEvent);
            }
        }
    };

    return(
        <>

            {showOverlay && <div className='overlay'></div>}
            
            <form className="info-window" onSubmit={e => e.preventDefault()}>

                <img src={closeIcon} alt="close" role="button" style={{"marginLeft": "auto", "marginRight": "6.2cqw", "marginTop": "5cqw", "cursor": "pointer", "width": "4.5cqw"}} onClick={handleDeclineClick} />
                <h1>{title}</h1>

                <div className="info-window-fields-container">
                    
                    <div className="info-window-field">
                        <label>Назва</label>
                        <input 
                            ref={titleInputRef}
                            type="text" 
                            className="info-window-field-title" 
                            defaultValue={building.title || ""} 
                            onChange={handleValuesChange} 
                            required={true} 
                            onInvalid={handleInvalidInput} 
                            autoFocus 
                            readOnly={(showConfirmAccept || showConfirmDecline) ? true : false}>
                        </input>
                        <div 
                            className="tooltip" 
                            style={(showTooltip && (titleInputRef.current?.value === undefined || titleInputRef.current?.value === "")) ? {"visibility": "visible"} : {"visibility": "hidden"}}>Будь ласка, введіть назву.
                        </div>
                    </div>
                    
                    <div className="info-window-field">
                        <label>Адреса</label>
                        <input 
                            ref={addressInputRef}
                            className="info-window-field-address" 
                            defaultValue={building.address || ""} 
                            onBlur={handleTextAreaOnFocusOut} 
                            onChange={handleValuesChange} 
                            required={true}
                            onInvalid={handleInvalidInput} 
                            readOnly={(showConfirmAccept || showConfirmDecline) ? true : false}>
                        </input>
                        <div className="tooltip" style={(showTooltip && (addressInputRef.current?.value === undefined || addressInputRef.current?.value === "")) ? {"visibility": "visible"} : {"visibility": "hidden"}}>Будь ласка, введіть адресу.</div>
                    </div>


                    <div className="info-window-field">
                        <label>Кількість поверхів</label>
                        <div className="info-window-field-numeric-container">
                            <svg className="info-window-field-numeric-container-arrowUp" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleNumericIncrement} onMouseDown={(e) => {e.preventDefault(); numericInputRef.current?.focus();}}>
                                <path d="M6.05762 0L0.861465 7.5L11.2538 7.5L6.05762 0Z" fill="currentColor" />
                            </svg>

                            <svg className="info-window-field-numeric-container-arrowDown" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => {handleNumericDecrement();}} onMouseDown={(e) => {e.preventDefault(); numericInputRef.current?.focus();}}>
                                <path d="M6.05762 0L0.861465 7.5L11.2538 7.5L6.05762 0Z" fill="currentColor" />
                            </svg>

                            <input 
                                ref={numericInputRef} 
                                className="info-window-field-floorAmount" 
                                value={floorAmountValueHandler === 0 ? undefined : floorAmountValueHandler} 
                                required={true}
                                onInvalid={handleInvalidInput} 
                                readOnly={(showConfirmAccept || showConfirmDecline) ? true : false} 
                                type="number">
                            </input>
                            <div className="tooltip" style={(showTooltip && (numericInputRef.current?.value === undefined || numericInputRef.current?.value === "")) ? {"visibility": "visible"} : {"visibility": "hidden"}}>Вкажіть кількість поверхів.</div>
                        </div>
                    </div>

                    <div className="info-window-field">
                        <label>Опис</label>
                        <textarea className="info-window-field-description" defaultValue={building.description || ""} onFocus={handleTextAreaOnFocus} onBlur={handleTextAreaOnFocusOut} onChange={handleValuesChange} readOnly={(showConfirmAccept || showConfirmDecline) ? true : false}></textarea>
                    </div>

                </div>

                <div className="info-window-button-container">
                    <button type="submit" onClick={handleAcceptClick}>Зберегти</button>
                    <button type="button" onClick={handleDeclineClick}>Відмінити</button>
                </div>

            </form>

            {showConfirmAccept && <ConfirmWindow entity={editedBuilding} text="хочете зберегти зміни" onClose={handleAcceptClose} confirmType="edit" />}
            {showConfirmDecline && <ConfirmWindow entity={editedBuilding} text="хочете відмінити зміни" onClose={handleDeclineClose} confirmType="edit" />}

        </>
    )
};

export default BuildingForm;