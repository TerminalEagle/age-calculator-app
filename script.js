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

class Calculator {
    constructor() {
        this.isValid = true;
        this.currentDate = new Date();
        this.dateObject = {
            day: undefined,
            month: undefined,
            year: undefined,
        };
    }

    checkForLeapYear(year) {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) return true;
        else return false;
    }

    resetError() {
        document.querySelectorAll(".error-message").forEach((message) => (message.textContent = ""));
        displayYearEl.textContent = "--";
        displayMonthEl.textContent = "--";
        displayDayEl.textContent = "--";
        this.isValid = true;
    }

    validateInputs() {
        if (this.dateObject.year < 1970) {
            errorYearEl.textContent = ERROR__INVALID_YEAR;
            this.isValid = false;
        }

        if (this.dateObject.year > this.currentDate.getFullYear()) {
            errorYearEl.textContent = ERROR__IN_FUTURE;
            this.isValid = false;
        } else if (this.dateObject.year === this.currentDate.getFullYear()) {
            if (this.dateObject.month > this.currentDate.getMonth() + 1) {
                errorMonthEl.textContent = ERROR__IN_FUTURE;
                this.isValid = false;
            } else if (this.dateObject.month === this.currentDate.getMonth() + 1) {
                if (this.dateObject.day > this.currentDate.getDate()) {
                    errorDayEl.textContent = ERROR__IN_FUTURE;
                    this.isValid = false;
                }
            }
        }

        if (this.dateObject.month > 12 || this.dateObject.month < 1) {
            errorMonthEl.textContent = ERROR__INVALID_MONTH;
            this.isValid = false;
        }

        if (MONTHS_WITH_31_DAYS.includes(this.dateObject.month) && (this.dateObject.day > 31 || this.dateObject.day < 1)) {
            errorDayEl.textContent = ERROR__INVALID_DAY;
            this.isValid = false;
        } else if (MONTHS_WITH_30_DAYS.includes(this.dateObject.month) && (this.dateObject.day > 30 || this.dateObject.day < 1)) {
            errorDayEl.textContent = ERROR__INVALID_DAY;
            this.isValid = false;
        } else if (this.dateObject.month === 2) {
            if (
                (checkForLeapYear(this.dateObject.year) && (this.dateObject.day > 29 || this.dateObject.day < 1)) ||
                (!checkForLeapYear(this.dateObject.year) && (this.dateObject.day > 28 || this.dateObject.day < 1))
            ) {
                errorDayEl.textContent = ERROR__INVALID_DAY;
                this.isValid = false;
            }
        }
    }

    getInputs() {
        inputFields.forEach((input) => {
            if (input.value === "") {
                document.querySelector(`.error-${input.name}`).textContent = ERROR__NO_INPUT;
            } else {
                this.dateObject[`${input.name}`] = Number.parseInt(input.value);
            }
        });
    }

    calculateAge() {
        if (
            !this.isValid ||
            this.dateObject.day === "" ||
            this.dateObject.day === undefined ||
            this.dateObject.month === "" ||
            this.dateObject.month === undefined ||
            this.dateObject.year === "" ||
            this.dateObject.year === undefined
        ) {
            return;
        }

        const currentTime = new Date();
        const birthDate = new Date(this.dateObject.year, this.dateObject.month - 1, this.dateObject.day);
        const elapsedTime = currentTime.getTime() - birthDate.getTime();
        const age = new Date(elapsedTime);

        const years = age.getFullYear() - 1970;
        const months = age.getMonth();
        const days = age.getDate() - 2;

        displayDayEl.textContent = days;
        displayMonthEl.textContent = months;
        displayYearEl.textContent = years;
    }
}

const ageCalculator = new Calculator();

btnCalculate.addEventListener("click", () => {
    ageCalculator.resetError();
    ageCalculator.getInputs();
    ageCalculator.validateInputs();
    ageCalculator.calculateAge();
});
