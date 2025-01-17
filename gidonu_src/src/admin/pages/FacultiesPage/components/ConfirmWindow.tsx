import { useEffect } from 'react';
import '../styles/confirmWindow.css';
import closeIcon from '../assets/closeIcon.svg';
import Faculty from '../module/types/faculty';

type ConfirmType = "add" | "edit" | "delete";

interface Props{
    faculty: Faculty,
    text: string,
    onClose: {
        closeMain: (id: number, title?: string, description?: string, contacts?: string) => void,
        closeCurrent: () => void
    },
    confirmType: ConfirmType,
};

const ConfirmWindow = ({faculty, text, onClose, confirmType}: Props) => {
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
                onClose.closeMain(faculty.id, faculty.title || undefined, faculty.description || undefined, faculty.contacts || undefined);
                onClose.closeCurrent();
                break;
            case "edit":
                onClose.closeMain(faculty.id, faculty.title || undefined, faculty.description || undefined, faculty.contacts || undefined);
                onClose.closeCurrent();
                break;
            case "delete":
                onClose.closeMain(faculty.id);
                onClose.closeCurrent();
                break;
        };
    };

    return(
        <>

            <div className='overlay'></div>

            <form className="edit-confirm-window">
            
                <img src={closeIcon} alt="close" role="button" style={{"marginLeft": "auto", "marginRight": "1.74vw", "marginTop": "1.4vw", "cursor": "pointer", "width": "1.25vw"}} onClick={onClose.closeCurrent} />
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