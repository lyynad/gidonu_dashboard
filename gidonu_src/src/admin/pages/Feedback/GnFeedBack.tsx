import './feedback_list.css';
import {ChangeEvent, useEffect, useState} from "react";
import {FeedBackItem, initTable, listFromFirstElement, populateTable} from "./GnFeedBack.funcs";

interface GnFeedBackProps {

}

export default function GnFeedBack({}: GnFeedBackProps) {
  const [data, setData] = useState<FeedBackItem[]>([]);
  const headers = {
    id: "Заявка №",
    email: "Email користувача",
    message:  "Повідомлення",
    date: "Дата отримання",
    processed: "Статус"
  }

  useEffect(() => {
    initTable(setData);
  }, []);

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    if (event.target.value === "first") {
      listFromFirstElement(data);
    } else {
      populateTable(data);
    }
  }

  return (
    <div>
      <title>Table Example</title>
      <div>
        <div className="select-container">
          <div className="styled-select">
            <select onChange={(e) => onSelectChange(e)} className="my-select" id="mySelect">
              <option value="last" data-action="last">
                Спочатку останні
              </option>
              <option value="first" data-action="first">
                Спочатку перші
              </option>
            </select>
          </div>
        </div>
        <div className="table-container">
          <table className="styled-table">
            <thead>
            <tr>
              <th>Заявка №</th>
              <th>E-mail користувача</th>
              <th>Повідомлення</th>
              <th>Дата отримання</th>
              <th>Статус</th>
            </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

// <link rel="stylesheet" href="../css/feedback_list.css"/>
// <script src="../js/feedback_list.js"></script>