const keypad = document.querySelector(".keypad");
const keyboard = document.querySelector("#number_input");
const screen_1 = document.querySelector("#screen_1")
const operand1screen = document.querySelector("#operand1screen");
const operatorscreen = document.querySelector("#operatorscreen");
const operand2screen = document.querySelector("#operand2screen");
const resultscreen = document.querySelector("#resultscreen");


let operand1 = "";
let operator = "";
let operand2 = "";
let result = "";

//decimal rounding function
function rounding (a, decimalPlace) {
  let finalNo;
  if (decimalPlace === 0) {
    finalNo = Math.round(a);
  } else if (Math.round(a-0.4) === Math.round(a + 0.4)) {
    finalNo = Math.round(a);
  } else {
    let stringVersion = a.toString();
    const stringArray = stringVersion.split('');
    const integralArray = [];
    const fractionArray  = [];
    for (let i = 0; i < stringArray.length; i++) {
        if(stringArray[i] === ".") break;
        integralArray.push(stringArray[i]);
    };
    let decimalPosition= stringArray.indexOf(".");
    for (let z = ++decimalPosition; z < stringArray.length; z++) {
        fractionArray.push(stringArray[z]);
    };
    if (fractionArray.length > decimalPlace) {
      let integralNoString = integralArray.join("");
      let fractionNoString = fractionArray.join("");
      let fractionRounded = Math.round((parseInt(fractionNoString))/((10**(fractionArray.length-decimalPlace))));
      finalNo = parseFloat(integralNoString + "." + fractionRounded.toString());
    } else {finalNo = a};
  }
  return finalNo;
};

//button input
keypad.addEventListener("click", (e) => {
  if (e.target.classList.contains("numbers") ) {
    if (keyboard.value.indexOf(".") != "-1" && e.target.innerHTML === ".") {
      e.preventDefault
    } else {
      keyboard.value += e.target.innerHTML;
      if (keyboard.value.length === 1 && operand1 != "" && operand2 != ""
        && operator != "" && result != ""
      ) {
        operand1 = "";
        operand1screen.textContent = operand1;
        operator = "";
        operatorscreen.textContent = operator;
        operand2 = "";
        operand2screen.textContent = operand2;
        result = "";
        resultscreen.textContent = result;
      }

    }
  }
  else {e.preventDefault}
});


//keyboard input
keyboard.addEventListener("keydown", (e) => {
  if ((e.key === "." && keyboard.value.indexOf(".") != "-1") ||
      (e.key !== "1" && e.key !== "2" && e.key !== "3" &&
      e.key !== "4" && e.key !== "5" && e.key !== "6" &&
      e.key !== "7" && e.key !== "8" && e.key !== "9" &&
      e.key !== "0" && e.key !== "/" && e.key !== "." &&
      e.key !== "x" && e.key !== "*" && e.key !== "+" &&
      e.key !== "-" && e.key !== "Backspace" && e.key !== "Delete" &&
      e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "enter"  
    )
      ) {
        e.preventDefault(); }
  });

//getting first operand for first operation
//to trigger when any of the operator is pressed on keyboard or through buttons
keypad.addEventListener("click", (e) => {
  if (e.target.classList.contains("operator") && operand1 == "" && 
    keyboard.value != "") {
      operand1 = parseFloat(keyboard.value);
      operand1screen.textContent = operand1;
      operator = e.target.innerHTML;
      operatorscreen.textContent = operator;
      keyboard.value = "";
    }
    // getting when operator is pressed just after a previous operation
  else if (e.target.classList.contains("operator") && result != "" && 
    keyboard.value == "") {
      operand1 = result;
      operand1screen.textContent = operand1;
      operator = e.target.innerHTML;
      operatorscreen.textContent = operator;
      operand2 = "";
      operand2screen.textContent = operand2;
      result = "";
      resultscreen.textContent = result;
      keyboard.value = "";
    }
  }
);

keyboard.addEventListener("keydown", (e) => {
  if ((e.key == "+" || 
      e.key == "-" || 
      e.key == "/" || 
      e.key == "x" || 
      e.key == "*") &&
      operand1 == "" & keyboard.value != ""
    ) 
    {
    operand1 = keyboard.value;
    operand1screen.textContent = operand1;
    operator = e.key;
    operatorscreen.textContent = operator;
    e.preventDefault()
    keyboard.value = "";
  }
  else if ((e.key == "+" || 
    e.key == "-" || 
    e.key == "/" || 
    e.key == "x" || 
    e.key == "*") &&
    operand1 != "" & keyboard.value != "" && operator != ""
  ) 
  {e.preventDefault()
    keyboard.value == ""
  }

})


// getting operand 2 and result
keypad.addEventListener("click", (e) => {
  if (operand1 != "" && operator != "" && keyboard.value != "" && e.target.innerHTML == "=") 
    {
      operand2 = parseFloat(keyboard.value);
      operand2screen.textContent = operand2;
      keyboard.value = "";
      actualOperation();
      resultscreen.textContent = result;
    }
})

keyboard.addEventListener("keydown", (e) => {
  if (operand1 != "" && operator != "" && (e.key == "=" || e.key == "Enter") && keyboard.value !="") {
    e.preventDefault();
    operand2 = parseFloat(keyboard.value);
    operand2screen.textContent = operand2;
    actualOperation();
    resultscreen.textContent = result;
    keyboard.value = "";
  }
})


// getting first result
actualOperation = () => {
  if (operator == "+") {
    let x = parseFloat(operand1) + parseFloat(operand2);
    result = rounding(x, 2);
    console.log("i work");
    return result;
  } else if (operator == "*" || operator == "X" || operator == "x")  {
    let x = operand1 * operand2;
    result = rounding(x, 2);
    console.log("i work");
    return result;
  } else if (operator == "/" && operand2 == 0) {
    let x = "you can't divide by 0";
    alert("you can't divide by 0. you can start a new operation or continue with different value");
    operand2 == "";
    operand2screen.textContent = "";
    console.log("i work");
    return result;
  } else if (operator == "/") {
    let x = operand1 / operand2;
    result = rounding(x, 2);
    console.log("i work");
    return result;
  } else if (operator == "-") {
    let x = operand1 - operand2;
    result = rounding(x, 2);};
    console.log("i work");
    return result;
};

function clearifnew () {if ((keyboard.value.length === 1 ) &&
    operand1 != "" && operator != "" && operand2 != "" && result != ""
  ) {operand1 = "";
    operand1screen.textContent = operand1;
    operand2 = "";
    operand2screen.textContent = operand2;
    operator = "";
    operatorscreen.textContent = operator;
    result = "";
    resultscreen.textContent = result
  }
};

keypad.addEventListener("click", (e) => {
  if (e.target.id == "backspace") {
      keyboard.value = keyboard.value = keyboard.value.substring(0, keyboard.value.length-1)
    }
  else if (e.target.id == "clear")
   {
    operand1 = "";
    operand1screen.textContent = operand1;
    operand2 = ""
    operand2screen.textContent = operand2;
    operator = "";
    operatorscreen.textContent = operator;
    result = "";
    resultscreen.textContent = result;
    keyboard.value = "";
   }
  }
)
