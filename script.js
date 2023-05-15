"use strict";

const displayYearEl = document.querySelector("span[data-display='year']");
const displayMonthEl = document.querySelector("span[data-display='month']");
const displayDayEl = document.querySelector("span[data-display='day']");

const errorDayEl = document.querySelector(".error-day");
const errorMonthEl = document.querySelector(".error-month");
const errorYearEl = document.querySelector(".error-year");

const inputFields = document.querySelectorAll("input");
const btnCalculate = document.getElementById("btn-calculate");

const ERROR__NO_INPUT = "This field is required";
const ERROR__INVALID_DAY = "Must be a valid day";
const ERROR__INVALID_MONTH = "Must be a valid month";
const ERROR__INVALID_YEAR = "Must be a valid year";
const ERROR__IN_FUTURE = "Must be in the past";

const MONTHS_WITH_31_DAYS = [1, 3, 5, 7, 8, 10, 12];
const MONTHS_WITH_30_DAYS = [4, 6, 9, 11];

class ageCalculator {
    constructor() {}

    initializeCurrentDate() {
        this.currentDate = new Date();
        this.dateObject = {};
    }
}

const currentDate = new Date();
const userInput = {
    day: undefined,
    month: undefined,
    year: undefined,
};

function checkForLeapYear(year) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) return true;
    else return false;
}

function resetError() {
    document.querySelectorAll(".error-message").forEach((message) => (message.textContent = ""));
}

function validateInputs() {
    if (userInput.year < 1970) {
        errorYearEl.textContent = ERROR__INVALID_YEAR;
    }

    if (userInput.year > currentDate.getFullYear()) {
        errorYearEl.textContent = ERROR__IN_FUTURE;
    } else if (userInput.year === currentDate.getFullYear()) {
        if (userInput.month > currentDate.getMonth() + 1) {
            errorMonthEl.textContent = ERROR__IN_FUTURE;
        } else if (userInput.month === currentDate.getMonth() + 1) {
            if (userInput.day > currentDate.getDate()) {
                errorDayEl.textContent = ERROR__IN_FUTURE;
            }
        }
    }

    if (userInput.month > 12 || userInput.month < 1) {
        errorMonthEl.textContent = ERROR__INVALID_MONTH;
    }

    if (MONTHS_WITH_31_DAYS.includes(userInput.month) && (userInput.day > 31 || userInput.day < 1)) {
        errorDayEl.textContent = ERROR__INVALID_DAY;
    } else if (MONTHS_WITH_30_DAYS.includes(userInput.month) && (userInput.day > 30 || userInput.day < 1)) {
        errorDayEl.textContent = ERROR__INVALID_DAY;
    } else if (userInput.month === 2) {
        if ((checkForLeapYear(userInput.year) && (userInput.day > 29 || userInput.day < 1)) || (!checkForLeapYear(userInput.year) && (userInput.day > 28 || userInput.day < 1))) {
            errorDayEl.textContent = ERROR__INVALID_DAY;
        }
    }
}

function getInputs() {
    inputFields.forEach((input) => {
        if (input.value === "") {
            document.querySelector(`.error-${input.name}`).textContent = ERROR__NO_INPUT;
        } else {
            userInput[`${input.name}`] = Number.parseInt(input.value);
        }
    });
}

function calculateAge() {
    if (userInput.day === "" || userInput.day === undefined || userInput.month === "" || userInput.month === undefined || userInput.year === "" || userInput.year === undefined) {
        return;
    }

    const currentTime = new Date();
    const birthDate = new Date(userInput.year, userInput.month - 1, userInput.day);
    const elapsedTime = currentTime.getTime() - birthDate.getTime();
    const age = new Date(elapsedTime);

    const years = age.getFullYear() - 1970;
    const months = age.getMonth();
    const days = age.getDate() - 1;

    displayDayEl.textContent = days;
    displayMonthEl.textContent = months;
    displayYearEl.textContent = years;
}

btnCalculate.addEventListener("click", () => {
    resetError();
    getInputs();
    validateInputs();
    calculateAge();
});
