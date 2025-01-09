import { useEffect } from "react";
import * as api from "../module/classes/api";
import '../styles/contextMenu.css';

interface Props {
    position: {
        x: number,
        y: number
    },
    entry_id: number,
    setUpdateData: React.Dispatch<React.SetStateAction<boolean>>,
    setShowContextMenu: React.Dispatch<React.SetStateAction<boolean>>
}

function ContextMenu({position, entry_id, setUpdateData, setShowContextMenu}: Props) {
    useEffect(() => {
        const handleMouseDown = () => {
            setShowContextMenu(false);
        };

        document.addEventListener('mousedown', handleMouseDown);
        document.getElementsByClassName('contextMenu')[0].addEventListener('mousedown', (e) => {
            e.stopPropagation();
        });
    }, []);
    
    const handleClick = async () => {
        await api.deleteLog(entry_id);
        setUpdateData(true);
        setShowContextMenu(false);
    }

    return (
        <>
            <ul className="contextMenu" style={{"position": "absolute", "top": position.y, "left": position.x}}>
                <li onClick={handleClick}>Видалити запис</li>
            </ul>
        </>
    )
};

export default ContextMenu;