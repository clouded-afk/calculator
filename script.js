// Calculator Project
    // Create functions for basic math operations
        // an operation will consist of the first number, operator, and a second number
    // Create operate function which takes an operator and 2 numbers, and calls the respective function based on operator selected
    // Create basic html calculator with buttons for each digit, each operator, an equals, and a clear button
    // Create a display for the calculator
        // Create a function to populate the display when number buttons are clicked
            // display value should be stored in a variable for use later on
    // Make it Work!
        // store first number and second number that are input into the calculator, utilize the operator input by the user, and operate on the numbers when the user presses the equals key
            // display the solution the operation when the operate function has been called
        // Display an error message if the user tries to divide by 0

// Potential Bugs
    // Calculator should not evaluate more the a single pair of numbers at a time
        // the user enters an operation, if the user enters another operator after the result has appeared the result will be the first number in the second operation
    // Answers with long decimal points should be rounded so they do not overflow off the display
    // Pressimg equals before entering all of the numbers could cause issues
    // Pressing clear should wipe any existing data, pressing clear should be like a fresh start
    // Dividing by zero could crash the app, this CANNOT happen

// Extra Features
    // Add decimal support
        // ensure user can only use a decimal once per number
        // decimal button should be disbaled if there is a decimal already in the display
    // Add a backspace button
        // should only work if the user enters a number or operator, user should not be able to delete on a result of an operation
    // Add keyboard support

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

equalsBtn.disabled = true;
operatorBtns.forEach((button) =>{
    button.disabled = true;
})

// Functions for basic operations
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

function displaySelections(number) {
    if (currentDisplayValue.textContent === "0") {
        currentDisplayValue.textContent = "";
    }
    currentDisplayValue.textContent += number;
    operatorBtns.forEach((button) =>{
        button.disabled = false;
    })
}

numberBtns.forEach((button) => {
    button.addEventListener("click", () => displaySelections(button.textContent))
})

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

operatorBtns.forEach((button) => {
    button.addEventListener("click", () => startOperation(button.textContent))
})

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

equalsBtn.addEventListener("click", solveEquation)

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

clearBtn.addEventListener("click", clearDisplay)

function roundNumber(number) {
    return Math.round(number * 10000) / 10000
}

function deleteDigit() {
    currentDisplayValue.textContent = currentDisplayValue.textContent.toString().slice(0, -1)
}

delBtn.addEventListener("click", deleteDigit)

function addDecimal() {
    if (currentDisplayValue.textContent === "") {
        currentDisplayValue.textContent = "0"
    } 
    if (currentDisplayValue.textContent.includes(".")) {
        return
    }
    currentDisplayValue.textContent += "."
}

decimalBtn.addEventListener("click", addDecimal)
