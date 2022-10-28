"use strict";

const URL_TRANSACTIONS = "http://localhost:3000/apiv1/transactions";

const DANGER_VALUE = 200;
const GOOD_VALUE = 10;

let dataArr = [];
let sale_total = 0;
let purchase_total = 0;


const listData = (data) => {
  sale_total = 0;
  purchase_total = 0;
  const tbody = document.getElementById("data");
  tbody.innerHTML = "";
  // data.forEach((transaction, index) => {
  //   appendTransactionToTable(transaction, index);
  // });
  for (let index = 0; index < data.length; index++) {
    let transaction = data[index];
    appendTransactionToTable(transaction, index);
  }
};

const trashClick = async (index) => {
  dataArr.splice(index, 1);
  alert((await deleteJSONData(`${URL_TRANSACTIONS}/${index}`)).message);
  listData(dataArr);
  alert("Elemento " + index + " eliminado");
};

const updateSubtotal = (index) => {
  dataArr[index].subtotal += 10;
  document.getElementById("subtotal" + index).innerHTML =
    dataArr[index].subtotal;
};

const roundNumber = (num) => Math.round(num * 100) / 100;

const appendTransactionToTable = (
  { description, transaction, subtotal, iva },
  index
) => {
  const tbody = document.getElementById("data");
  const transactionStr = transaction === "p" ? "Compra" : "Venta";
  const ivaValue = roundNumber((iva / 100) * subtotal);
  const total = ivaValue + subtotal;
  if (transaction === "p") {
    purchase_total += total;
  } else {
    sale_total += total;
  }
  document.getElementById("sale_total").innerHTML = sale_total.toFixed(2);
  document.getElementById("purchase_total").innerHTML =
    purchase_total.toFixed(2);
  const tr = document.createElement("tr");

  tr.innerHTML += `
    <td>${description}</td>
    <td>${transactionStr}</td>
    <td id="subtotal${index}">${subtotal.toFixed(2)}</td>
    <td>${ivaValue}</td>
    <td class="${
      total > DANGER_VALUE ? "table-danger" : total < GOOD_VALUE ? "table-info" : ""
    }">${total.toFixed(2)}</td>
    <td><button id="trashButton${index}"  class="btn btn-danger"><i class="bi bi-trash"></i></button></td>
`;
  tbody.appendChild(tr);
  document
    .getElementById("trashButton" + index)
    .addEventListener("click", () => {
      trashClick(index);
    });
};

document.addEventListener("DOMContentLoaded", async () => {
  dataArr = (await getJSONData(URL_TRANSACTIONS)).results;
  if (!dataArr) {
    dataArr = [];
  }
  listData(dataArr);
  document
    .getElementById("sales_form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const description = data.get("description");
      const transaction = data.get("transaction");
      const subtotal = roundNumber(+data.get("subtotal"));
      const iva = roundNumber(+data.get("iva"));
      alert(
        (
          await postJSONData(URL_TRANSACTIONS, {
            description,
            transaction,
            subtotal,
            iva,
          })
        ).message
      );
      dataArr.push({
        description,
        transaction,
        subtotal,
        iva,
      });
      appendTransactionToTable(
        {
          description,
          transaction,
          subtotal,
          iva,
        },
        dataArr.length - 1
      );
      e.target.reset();
    });
});
