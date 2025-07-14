import { useEffect, useState } from "react";
import * as api from "./module/classes/api";
import { Log } from "../../helpers/interfaces";
import PaginationTable from "../../components/PaginationTable";

function App() {
    const [logs, setLogs] = useState<Log[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const logs = await api.getLogs();
            const typedLogs = logs.map((log: Log) => ({
                ...log,
                type: "log"
            }))
            setLogs(typedLogs);
        };

        fetchData();

        document.title = "Історія змін";
    }, []);

    return (
        <div style={{"display": "flex", "justifyContent": "center", "alignItems": "center", "width": "100%", "height": "100%"}}>
            {logs.length > 0 &&
                <PaginationTable 
                    body={logs}
                    headers={["№", "Номер користувача", "Змінена таблиця", "Номер запису", "Дія", "Дата"]}
                />
            }
        </div>
    );
}

export default App;