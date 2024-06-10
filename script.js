// Variables to store the numbers and operator
let firstNumber = ""
let secondNumber = ""
let selectedOperator = ""

const currentDisplayValue = document.querySelector(".current-input")
const previousDisplayValue = document.querySelector(".previous-input")
const numberBtns = document.querySelectorAll(".num-btn")
const operatorBtns = document.querySelectorAll(".operator-btn")
const equalsBtn = document.querySelector(".equal")
const clearBtn = document.querySelector(".clear-btn")
const delBtn = document.querySelector(".del-btn")
const decimalBtn = document.querySelector(".decimal")


// Disables the operators and equals on load to prevent use before any numbers are input
equalsBtn.disabled = true;
operatorBtns.forEach((button) =>{
    button.disabled = true;
})

// Event Listeners
equalsBtn.addEventListener("click", solveEquation)
clearBtn.addEventListener("click", clearDisplay)
delBtn.addEventListener("click", deleteDigit)
decimalBtn.addEventListener("click", addDecimal)

numberBtns.forEach((button) => {
    button.addEventListener("click", () => displaySelections(button.textContent))
})

operatorBtns.forEach((button) => {
    button.addEventListener("click", () => startOperation(button.textContent))
})

// Function to allow deletion of the previous character
function deleteDigit() {
    currentDisplayValue.textContent = currentDisplayValue.textContent.toString().slice(0, -1)
}

// Clears the display, clears the respective variables, and disables the equals and ooperator buttons again to prevent use before numbers are input
function clearDisplay() {
    firstNumber = ""
    secondNumber = ""
    selectedOperator = ""
    currentDisplayValue.textContent = "0"
    previousDisplayValue.textContent = ""
    equalsBtn.disabled = true;
    operatorBtns.forEach((button) =>{
        button.disabled = true;
    })
    numberBtns.forEach((button) =>{
        button.disabled = false;
    })
    delBtn.disabled = false;
    decimalBtn.disabled = false;
}

// Rounds any result to four decimal places
function roundNumber(number) {
    return Math.round(number * 10000) / 10000
}

// Allows the use of a decimal when inputing numbers
function addDecimal() {
    if (currentDisplayValue.textContent === "") {
        currentDisplayValue.textContent = "0"
    } 
    if (currentDisplayValue.textContent.includes(".")) {
        return
    }
    currentDisplayValue.textContent += "."
}

// Sets the value of the second number and solves the equation, if the user tries to divide by 0 it will display an error and lock all buttons except the clear button, so with an error they will have to reset the calculator
function solveEquation() {
    if (currentDisplayValue.textContent === "0" && selectedOperator === "÷") {
        currentDisplayValue.textContent = "ERROR"
        equalsBtn.disabled = true;
        operatorBtns.forEach((button) =>{
            button.disabled = true;
        })
        numberBtns.forEach((button) =>{
            button.disabled = true;
        })
        delBtn.disabled = true;
        decimalBtn.disabled = true;
        return
    }
    operatorBtns.forEach((button) =>{
        button.disabled = false;
    })
    secondNumber = currentDisplayValue.textContent
    currentDisplayValue.textContent = roundNumber(operate(selectedOperator, firstNumber, secondNumber))
    previousDisplayValue.textContent = `${firstNumber} ${selectedOperator} ${secondNumber} =`
    selectedOperator = ""
    equalsBtn.disabled = true;
}

// Starts the equation by setting the first number, and the operator for the equation
function startOperation(operator) {
    if (selectedOperator !== "") {
        solveEquation()
    }
    if (selectedOperator === "") {
        selectedOperator = operator
    }
    firstNumber = currentDisplayValue.textContent
    previousDisplayValue.textContent = `${firstNumber} ${selectedOperator}`
    currentDisplayValue.textContent = ""
    equalsBtn.disabled = false;
    if (selectedOperator !== "") {
        operatorBtns.forEach((button) =>{
            button.disabled = true;
        })
    }
}

// Displays the first number on the screen while the user presses the buttons
function displaySelections(number) {
    if (currentDisplayValue.textContent === "0") {
        currentDisplayValue.textContent = "";
    }
    currentDisplayValue.textContent += number;
    operatorBtns.forEach((button) =>{
        button.disabled = false;
    })
}

// Returns the result of an operation based on the selected operator
function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);

    if (operator === "+") {
        return addition(a, b);
    }
    if (operator === "-") {
        return subtraction(a, b);
    }
    if (operator === "×") {
        return multiplication(a, b);
    }
    if (operator === "÷") {
        return division(a, b);
    }
}

// Basic math functions to produce the result of the equation
function addition(a, b) {
    return a + b;
};

function subtraction(a, b) {
    return a - b;
};

function multiplication(a, b) {
    return a * b;
};

function division(a, b) {
    return a / b;
};