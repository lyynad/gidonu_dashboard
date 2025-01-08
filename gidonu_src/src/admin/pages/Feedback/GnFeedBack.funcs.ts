const api_host = "http://localhost:3000";

export type FeedBackItem = {
  id: string,
  email: string,
  message: string,
  date: string,
  processed: boolean
}

export async function initTable(setData: (data: FeedBackItem[]) => void) {
  const data = await getTableData();
  populateTable(data);
  setData(data);
}

async function getTableData() {
  try {
    const response = await fetch(api_host + `/api/feedback_info`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return [];
  }
}

async function fetchData() {

}

// Функція для заповнення таблиці даними
export function populateTable(data: FeedBackItem[]) {
  const tableBody = document.querySelector(".styled-table tbody");
  if(!tableBody) return;
  tableBody.innerHTML = "";
  for (let i = data.length - 1; i >= 0; i--) {
    const item = data[i];
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.id}</td> 
            <td>${item.email}</td>
            <td>${item.message.slice(0, 20)}${
      item.message.length > 20 ? "..." : ""
    }</td>
            <td>${formatDate(item.date)}</td>
            <td>${item.processed ? "Оброблена" : "Нова"}</td>`;

    tableBody!.appendChild(row);

    row.addEventListener("click", () => {
      // Сохраняем объект в localStorage
      localStorage.setItem("selectedItem", JSON.stringify(item));
      // Переход на страницу details.html
      window.location.href = "../feedback_details/index.html";
    });
  }
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("uk-UA");
}

// Викликаємо fetchData при завантаженні сторінки, передаючи ID
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

export function listFromFirstElement(data: FeedBackItem[]) {
  const tableBody = document.querySelector(".styled-table tbody");
  tableBody!.innerHTML = "";
  for (let i = 0; i <= data.length - 1; i++) {
    const item = data[i];
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.id}</td> 
            <td>${item.email}</td>
            <td>${item.message.slice(0, 20)}${
      item.message.length > 20 ? "..." : ""
    }</td>
            <td>${formatDate(item.date)}</td>
            <td>${item.processed ? "Оброблена" : "Нова"}</td>`;

    tableBody!.appendChild(row);

    row.addEventListener("click", () => {
      localStorage.setItem("selectedItem", JSON.stringify(item));
      window.location.href = "../feedback_details/index.html";
    });
  }
}
