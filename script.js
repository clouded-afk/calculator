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

let firstNumber = "";
let secondNumber = "";
let operatorChoice = "";
let displayValue = "";


const numberBtn = document.querySelectorAll(".num-btn");
const operatorBtn = document.querySelectorAll(".operator-btn");
const equalBtn = document.querySelector(".equal");
const decimalbtn = document.querySelector(".decimal");
const clearBtn = document.querySelector(".clear-btn");
const delBtn = document.querySelector(".del-btn");

const currentDisplayValue = document.querySelector(".current-input");
const previousDisplayValue = document.querySelector(".previous-input");

function addition(firstNum, secondNum) {
    return firstNum + secondNum;
};

function subtraction(firstNum, secondNum) {
    return firstNum - secondNum;
};

function division(firstNum, secondNum) {
    if (secondNum === 0) {
        return "ERROR"
    } else {
        return firstNum / secondNum;
    }
};

function multiplication(firstNum, secondNum) {
    return firstNum * secondNum;
};

function operate(operator, firstNum, secondNum) {
    operator = operatorChoice;
    firstNum = Number(firstNumber);
    secondNum = Number(secondNumber);

    if (operator === "+") {
        return addition(firstNum, secondNum);
    } else if (operator === "-") {
        return subtraction(firstNum, secondNum);
    } else if (operator === "×") {
        return multiplication(firstNum, secondNum);
    } else if (operator === "÷") {
        return division(firstNum, secondNum);
    }
};

function clearDisplay() {
    firstNumber = ""
    secondNumber = ""
    operatorChoice = ""
    currentDisplayValue.textContent = 0
}

clearBtn.addEventListener("click", clearDisplay)

numberBtn.forEach((button) => {
    button.addEventListener("click", () => {
        if (operatorClicked === true) {
            let secondValue = button.textContent;
            secondNumber += secondValue;
            currentDisplayValue.textContent = secondNumber;
        } else {
            let firstValue = button.textContent;
            firstNumber += firstValue;
            currentDisplayValue.textContent = firstNumber;
        }
    })
})

let operatorClicked = false;
operatorBtn.forEach((button) => {
    button.addEventListener("click", () => {
        let currentOperator = button.textContent;
        operatorChoice = currentOperator;
        currentDisplayValue.textContent = operatorChoice
        operatorClicked = true;
    })
})

equalBtn.addEventListener("click", () => {
    currentDisplayValue.textContent = operate(operatorChoice, firstNumber, secondNumber)
})

