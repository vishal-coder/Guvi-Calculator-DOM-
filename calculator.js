import { evaluate } from "./infixCal.js";
createCalculatorUI();

let result = document.querySelector("#result");
let clear = document.querySelector("#clear");
let backspace = document.querySelector("#back");
let equals = document.querySelector("#equal");

let decimal = document.querySelector("#decimal");
let numbers = document.querySelectorAll(".number");
let operations = document.querySelectorAll(".operations");

let decimalFlag = false;

// for numbers
numbers.forEach((item) => {
  item.addEventListener("click", (e) => {
    let value = e.target.innerText;
    updateDisplay(value);
  });
});

// for keyboard input
document.addEventListener("keyup", logKey);
function logKey(e) {
  if (e.key >= 0 && e.key < 10) {
    updateDisplay(e.key);
  } else {
    alert("Only numbers are allowed");
  }
}

function updateDisplay(value) {
  if (result.value.length == 1 && result.value == "0") {
    if (value === "0" || value === "00") {
      result.value = "0";
    } else {
      result.value = value;
    }
  } else {
    result.value += value;
  }
}

//for clear
clear.addEventListener("click", (e) => {
  result.value = "0";
  decimalFlag = false;
});

//for backspace
backspace.addEventListener("click", (e) => {
  if (result.value.toString().slice(-1) == ".") {
    decimalFlag = false;
  }
  result.value = result.value.toString().slice(0, -1);
  if (result.value.length === 0) {
    result.value = "0";
  }
});

//for decimal
decimal.addEventListener("click", (e) => {
  let temp = result.value.toString().slice(-1);
  if (!decimalFlag && temp !== ".") {
    result.value += ".";
    decimalFlag = true;
  }
});

operations.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    result.value += e.target.innerText;
  });
});

equals.addEventListener("click", (e) => {
  let value = result.value;
  let final;

  final = evaluate(value);
  result.value = final;
});

function createCalculatorUI() {
  let header = createEle("div", "id", "header");
  let h1 = createEle("h1", "id", "title", null, null, "DOM calculator");
  let p = createEle(
    "p",
    "id",
    "description",
    null,
    null,
    "This calculator works as standard calculator.Along with that it also supports\n 0-9 digit inputs from keyboard and perform calculation of infix expressions. \n"
  );

  header.append(h1, p);

  let gridContainer = createEle("div", "class", "grid-container");
  let result = createEle(
    "input",
    "class",
    "grid-item1 display",
    "type",
    "text"
  );
  result.setAttribute("value", "0");
  result.setAttribute("id", "result");

  let clearBtn = createEle("button", "id", "clear", "class", "red-text", "C");

  let backBtn = createEle("button", "id", "back", null, null, "←");

  let decimalBtn = createEle(
    "button",
    "id",
    "decimal",
    "class",
    "blue-text",
    "."
  );

  let multiplicationBtn = createEle(
    "button",
    "id",
    "multiplication",
    "class",
    "operations blue-text",
    "*"
  );

  let Btn7 = createEle("button", "id", "7", "class", "number", "7");

  let Btn8 = createEle("button", "id", "8", "class", "number", "8");

  let Btn9 = createEle("button", "id", "9", "class", "number", "9");

  let divisionBtn = createEle(
    "button",
    "id",
    "division",
    "class",
    "operations blue-text",
    "/"
  );

  let Btn4 = createEle("button", "id", "4", "class", "number", "4");

  let Btn5 = createEle("button", "id", "5", "class", "number", "5");

  let Btn6 = createEle("button", "id", "6", "class", "number", "6");

  let subtractionBtn = createEle(
    "button",
    "id",
    "subtract",
    "class",
    "operations blue-text",
    "-"
  );

  let Btn1 = createEle("button", "id", "1", "class", "number", "1");

  let Btn2 = createEle("button", "id", "2", "class", "number", "2");

  let Btn3 = createEle("button", "id", "3", "class", "number", "3");

  let addBtn = createEle(
    "button",
    "id",
    "add",
    "class",
    "operations blue-text",
    "+"
  );
  let Btn0 = createEle("button", "id", "zero", "class", "number", "0");

  let Btn00 = createEle("button", "id", "zero2", "class", "number", "00");
  let equalBtn = createEle("button", "id", "equal", null, null, "=");

  gridContainer.append(
    result,
    clearBtn,
    backBtn,
    decimalBtn,
    multiplicationBtn,
    Btn7,
    Btn8,
    Btn9,
    divisionBtn,
    Btn4,
    Btn5,
    Btn6,
    subtractionBtn,
    Btn1,
    Btn2,
    Btn3,
    addBtn,
    Btn0,
    Btn00,
    equalBtn
  );

  document.body.append(header, gridContainer);
}

function createEle(tagName, attr1, val1, attr2, val2, text) {
  let ele = document.createElement(tagName);
  if (attr1 != null) ele.setAttribute(attr1, val1);
  if (attr2 != null) ele.setAttribute(attr2, val2);
  if (text != null) ele.innerText = text;
  return ele;
}
