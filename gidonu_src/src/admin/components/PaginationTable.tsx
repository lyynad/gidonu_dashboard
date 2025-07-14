import { useState, useEffect } from "react";
import { IUserProfile, Log } from "../helpers/interfaces";

import "./PaginationTable.css";

import arrowPrevious from "../assets/images/svg/arrow-previous.svg";
import arrowNext from "../assets/images/svg/arrow-next.svg";

type Props =
    | {
        body: IUserProfile[],
        headers: string[],
        onclick(id: any): () => void
    }
    | {
        body: Log[],
        headers: string[],
        onclick?: never
    }

enum TableType {
    Logs,
    Users
}

const PaginationTable = ({ body, headers, onclick }: Props) => {
    const [tableType, setTableType] = useState<TableType>();

    const [page, setPage] = useState<number>(1);
    const [sliceStart, setSliceStart] = useState<number>(0);
    const [sliceEnd, setSliceEnd] = useState<number>(10);
    const [sliceSize, setSliceSize] = useState<number>(10);
    
    useEffect(() => {
        if (body.length > 0)
            if (body[0].type === "log"){
                setTableType(TableType.Logs);
            }
            else if (body[0].type === "user") {
                setTableType(TableType.Users);
            }
        
        const table = document.querySelector(".paginationTable-wrapper");
        const row = document.querySelector(".body-row");
        
        if(table instanceof HTMLElement){
            const sliceSize = Math.floor((table.offsetHeight - 20) / (table.offsetWidth * 0.052));
            setSliceSize(sliceSize);
            setSliceEnd(sliceSize);
        }
    }, []);

    const handlePageNext = () => {
        if (sliceEnd < body.length){
            setSliceEnd(sliceEnd + sliceSize);
            setSliceStart(sliceStart + sliceSize);
            setPage(page + 1);
        }
    };
    const handlePagePrevious = () => {
        if(sliceStart > 0){
            setSliceStart(sliceStart - sliceSize);
            setSliceEnd(sliceEnd - sliceSize);
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
                            {headers.map((header, i) => (
                                <td key={i}>{header}</td>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {tableType === TableType.Users && (body as IUserProfile[]).slice(Math.min(sliceStart, body.length - sliceSize), Math.min(sliceEnd, body.length)).map((user) => (
                            <tr key={user.id} onClick={() => onclick!(user.id)} style={{"cursor": "pointer"}}>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{renderDate(user.dataRegistration)}</td>
                                <td>
                                    <p style={{"backgroundColor": "rgba(150,214,179,0.45)", "padding": "0 10px 0 10px", "width": "fit-content", "borderRadius": "0.3vw", "fontFamily": "Roboto Mono"}}>
                                        Прийнята
                                    </p>
                                </td>
                                <td>
                                    <p className={`${user.isSuper ? "super" : "admin"}`} style={{"padding": "0 10px 0 10px", "width": "fit-content", "borderRadius": "0.3vw", "fontFamily": "Roboto Mono"}}>
                                        {user.isSuper ? "super" : "admin"}
                                    </p>
                                </td>
                            </tr>
                        ))}

                        {tableType === TableType.Logs && (body as Log[]).slice(Math.min(sliceStart, body.length - sliceSize), Math.min(sliceEnd, body.length)).map((log) => (
                            <tr className="body-row" key={log.id}>
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
                        <span>{Math.min(sliceStart, body.length - sliceSize) > 0 ? `${Math.min(sliceStart, body.length - sliceSize)}` : "0"}-{Math.min(sliceEnd, body.length)} з {body.length}</span>
                    </div>
                    <div className="foot-page-controller">
                        <img src={arrowPrevious} onClick={handlePagePrevious}/>
                        <div className="foot-page-counter">{page}</div>
                        <img src={arrowNext} onClick={handlePageNext}/>
                    </div>
                </div>
                
            </div>

        </div>
    )
};

export default PaginationTable;