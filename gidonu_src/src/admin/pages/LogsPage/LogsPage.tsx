import { useEffect, useState } from "react";
import * as api from "./module/classes/api";
import Log from "./module/types/log";
import "./LogsPage.css";
import ContextMenu from "./components/ContextMenu";
import arrowPrevious from "../../assets/images/svg/arrow-previous.svg";
import arrowNext from "../../assets/images/svg/arrow-next.svg";
import { min } from "moment";

function App() {
    const [logs, setLogs] = useState<Log[]>([]);
    
    const [page, setPage] = useState<number>(1);
    const [sliceStart, setSliceStart] = useState<number>(0);
    const [sliceEnd, setSliceEnd] = useState<number>(20);

    useEffect(() => {
        const fetchData = async () => {
            const logs = await api.getLogs();
            setLogs(logs);
        };

        fetchData();
    }, []);

    const handlePageNext = () => {
        if (sliceEnd < logs.length){
            setSliceEnd(sliceEnd + 20);
            setSliceStart(sliceStart + 20);
            setPage(page + 1);
        }
    };
    const handlePagePrevious = () => {
        if(sliceStart > 0){
            setSliceStart(sliceStart - 20);
            setSliceEnd(sliceEnd - 20);
            setPage(page - 1);
        }
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
        <div className="paginationTable-wrapper">

            <div className="paginationTable-container">

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
                        {logs.slice(Math.min(sliceStart, logs.length - 20), Math.min(sliceEnd, logs.length)).map((log) => (
                            <tr key={log.id}>
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

                <div className="paginationTable-foot">
                    <div className="foot-row-counter">
                        <span>{Math.min(sliceStart, logs.length - 20)}-{Math.min(sliceEnd, logs.length)} з {logs.length}</span>
                    </div>
                    <div className="foot-page-controller">
                        <img src={arrowPrevious} onClick={handlePagePrevious}/>
                        <div className="foot-page-counter">{page}</div>
                        <img src={arrowNext} onClick={handlePageNext}/>
                    </div>
                </div>
                
            </div>

        </div>
    );
}

export default App;