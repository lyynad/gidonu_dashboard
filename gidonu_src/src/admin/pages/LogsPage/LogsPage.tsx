import { useEffect, useState } from "react";
import * as api from "./module/classes/api";
import Log from "./module/types/log";
import "./LogsPage.css";
import ContextMenu from "./components/ContextMenu";

function App() {
    const [logs, setLogs] = useState<Log[]>([]);
    const [showContextMenu, setShowContextMenu] = useState<boolean>(false);
    const [selectedLogId, setSelectedLogId] = useState<number>(0);
    const [contextMenuPosition, setContextMenuPosition] = useState({x: 0, y: 0});
    const [updateData, setUpdateData] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            const logs = await api.getLogs();
            setLogs(logs);
        };

        if (updateData){
            fetchData();
            setUpdateData(false);
        }
    }, [updateData]);

    const handleEntryClick = (event: React.MouseEvent<HTMLDivElement>, logId: number) => {
        event.preventDefault();
        setSelectedLogId(logId);
        setShowContextMenu(true);

        const position = {
            x: event.pageX,
            y: event.pageY
        };

        setContextMenuPosition(position);
    }

    const renderDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const locale = "uk-UA";
        const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
        const formattedDate = date.toLocaleDateString(locale, options);
        const finalFormattedDate = formattedDate.replace(/,/g, "");
        return finalFormattedDate;
      };

    return (
        <>
            <div className="logsTable-wrapper">
                <div className="logsTable-container" style={{"padding": "0", "marginLeft": "20px"}}>
                        <table>

                            <thead>
                                <tr>
                                    <td style={{"textAlign": "center", "padding": "0"}}>№</td>
                                    <td>Номер користувача</td>
                                    <td>Змінена таблиця</td>
                                    <td>Номер запису</td>
                                    <td>Дія</td>
                                    <td>Дата</td>
                                </tr>
                            </thead>

                            <tbody>
                                {logs.map((log) => (
                                    <tr key={log.id} onContextMenu={(e) => { handleEntryClick(e, log.id) }}>
                                        <td style={{"textAlign": "center", "padding": "0"}}>{log.id}</td>
                                        <td>{log.id_user}</td>
                                        <td>{log.table_name}</td>
                                        <td>{log.id_record}</td>
                                        <td>{log.action}</td>
                                        <td>{renderDate(log.logdate)}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>

            {showContextMenu && contextMenuPosition && <ContextMenu position={contextMenuPosition} entry_id={selectedLogId} setUpdateData={setUpdateData} setShowContextMenu={setShowContextMenu} />}
        </>
    );
}

export default App;