import { useEffect } from 'react';
import './GeneralConfirmWindow.css';
import closeIcon from "../../assets/images/svg/closeIcon.svg";
import Faculty from '../FacultiesPage/module/types/faculty';
import Building from '../FacultiesPage/module/types/building';

type ConfirmType = "add" | "edit" | "delete";

type Props =
    | {
        entity: Faculty,
        text: string,
        onClose: {
            closeMain: (id: number, title?: string, description?: string, contacts?: string) => void,
            closeCurrent: () => void
        },
        confirmType: ConfirmType,
    }
    | {
        entity: Building,
        text: string,
        onClose: {
            closeMain: (id: number, title?: string, description?: string, address?: string, floor_amount?: number) => void,
            closeCurrent: () => void
        },
        confirmType: ConfirmType,
    };

const ConfirmWindow = ({entity, text, onClose, confirmType}: Props) => {
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if(event.key === "Escape")
                onClose.closeCurrent();
        };

        const handleEnter = (event: KeyboardEvent) => {
            if(event.key === "Enter")
                handleAccept();
        };

        document.addEventListener("keydown", handleEscape, false);
        document.addEventListener("keydown", handleEnter, false);

        return () => {
            document.removeEventListener("keydown", handleEscape, false);
            document.removeEventListener("keydown", handleEnter, false);
        };
    }, []);

    const handleAccept = async () => {
        switch(confirmType){
            case "add":
                if (entity.type === "faculty")
                    onClose.closeMain(entity.id, entity.title || undefined, entity.description || undefined, entity.contacts || undefined);
                else if (entity.type === "building")
                    onClose.closeMain(entity.id, entity.title || undefined, entity.description || undefined, entity.address || undefined, entity.floor_amount || undefined);
                onClose.closeCurrent();
                break;
            case "edit":
                if (entity.type === "faculty")
                    onClose.closeMain(entity.id, entity.title || undefined, entity.description || undefined, entity.contacts || undefined);
                else if (entity.type === "building")
                    onClose.closeMain(entity.id, entity.title || undefined, entity.description || undefined, entity.address || undefined, entity.floor_amount || undefined);
                onClose.closeCurrent();
                break;
            case "delete":
                onClose.closeMain(entity.id);
                onClose.closeCurrent();
                break;
        };
    };

    return(
        <>

            <div className='overlay'></div>

            <form className="edit-confirm-window">
            
                <img src={closeIcon} alt="close" role="button" style={{"marginLeft": "auto", "marginRight": "7cqw", "marginTop": "5.8cqw", "cursor": "pointer", "width": "5cqw"}} onClick={onClose.closeCurrent} />
                <h1>Ви дійсно {text}?</h1>
            
                <div className="edit-confirm-window-button-container">
                    <button type="button" onClick={handleAccept}>Так</button>
                    <button type="button" onClick={onClose.closeCurrent}>Ні</button>
                </div>
            
            </form>
        
        </>
    )
};

export default ConfirmWindow;