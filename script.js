(function(){
/*
Select Elements
*/
const button = document.querySelector("button");
const errorMessage = document.querySelector("b");
const todaysDateWeekday = document.querySelector("#todays-date-weekday");
const todaysDateDay = document.querySelector("#todays-date-day");
const todaysDateMonth = document.querySelector("#todays-date-month");
const todaysDateYear = document.querySelector("#todays-date-year");
const currentTimeHours = document.querySelector("#current-time-hours");
const currentTimeMinutes = document.querySelector("#current-time-minutes");
const currentTimeSeconds = document.querySelector("#current-time-seconds");
const currentTimeAmpm = document.querySelector("#current-time-ampm");
const voteTimeDays = document.querySelector("#vote-time-days");
const voteTimeHours = document.querySelector("#vote-time-hours");
const voteTimeMinutes = document.querySelector("#vote-time-minutes");
const voteTimeSeconds = document.querySelector("#vote-time-seconds");
const inputAppointmentDay = document.querySelector("#input-appointment-day");
const inputAppointmentMonth = document.querySelector("#input-appointment-month");
const inputAppointmentYear = document.querySelector("#input-appointment-year");
const appointmentTimeYears = document.querySelector("#appointment-time-years");
const appointmentTimeMonths = document.querySelector("#appointment-time-months");
const appointmentTimeDays = document.querySelector("#appointment-time-days");
const appointmentTimeHours = document.querySelector("#appointment-time-hours");
const appointmentTimeMinutes = document.querySelector("#appointment-time-minutes");
const appointmentTimeSeconds = document.querySelector("#appointment-time-seconds");

/*
Date Object variables
*/
const curTime = new Date();
const day = new Date().getDate();
const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()];
const month = ['January',"February","March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][new Date().getMonth()];
const year = new Date().getFullYear();
const hour = new Date().getHours();
let hourampm ;
const minute = new Date().getMinutes();
const seconds = new Date().getSeconds();
let ampm ; 

if (hour > 11 && hour < 24) { 
  ampm = 'PM'; 
} else {
  ampm = 'AM';
}

if (hour > 12 && hour < 24){ 
  hourampm = hour - 12; 
} else {
  hourampm = hour;
}

if (hour === 24){ 
  hourampm = 12; 
}

/*
Time Check function
*/
function timeCheck(){
  todaysDateWeekday.value = weekday;
  todaysDateDay.value = day;
  todaysDateMonth.value = month;
  todaysDateYear.value = year;
  currentTimeHours.value = hourampm;
  currentTimeMinutes.value = minute;
  currentTimeSeconds.value = seconds;
  currentTimeAmpm.value = ampm;
}

/*
Peter Obi time calculation variables
*/
function getTimeUntil() {
  const now = new Date().getTime(); // get the current time
  const targetDate = new Date('February 25, 2023 00:00:00').getTime(); // set the target date
  const distance = targetDate - now; // calculate the distance between the two dates

  // do the math to calculate the days, hours, minutes, and seconds remaining
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // return an object with the days, hours, minutes, and seconds remaining
  return {
    days,
    hours,
    minutes,
    seconds
  };
}

/*
Peter Obi time calculation functions
*/
function obidientTime() {
  const timeUntil = getTimeUntil();

  voteTimeDays.value = `${timeUntil.days} days`;
  voteTimeHours.value = `${timeUntil.hours} hours`;
  voteTimeMinutes.value = `${timeUntil.minutes} mins`;
  voteTimeSeconds.value = `${timeUntil.seconds} secs`;
}
/*
Page load function for Normal and Peter Obi Time
*/
window.addEventListener("load", () => {
  timeCheck();
  obidientTime();
})

/*
Regex Check variables
*/
function regexCheck() {
  let appointmentDayValue = inputAppointmentDay.value;
  let appointmentMonthValue = inputAppointmentMonth.value;
  let appointmentYearValue = inputAppointmentYear.value;

  if (appointmentDayValue == "" || appointmentMonthValue == "" || appointmentYearValue == "") {
    errorMessage.textContent = "Incorrect Input field(s)!";
    setTimeout(() => {
      errorMessage.textContent = "";
      inputAppointmentDay.value = "";
      inputAppointmentMonth.value = "";
      inputAppointmentYear.value = "";
    }, 5000);
  } else if (appointmentDayValue < 1 || appointmentMonthValue < 1 || appointmentYearValue < 1000) {
    errorMessage.textContent = "Incorrect Input field(s)!";

    setTimeout(() => {
      errorMessage.textContent = "";
      inputAppointmentDay.value = "";
      inputAppointmentMonth.value = "";
      inputAppointmentYear.value = "";
    }, 5000);
  } else if (appointmentDayValue > 31 || appointmentMonthValue > 12 || appointmentYearValue > 9999){
    errorMessage.textContent = "Incorrect Input field(s)!";

    setTimeout(() => {
      errorMessage.textContent = "";
      inputAppointmentDay.value = "";
      inputAppointmentMonth.value = "";
      inputAppointmentYear.value = "";
    }, 5000); 
  }
}

/*
Appointment function
*/
function appTimeUntil(day, month, year) {
  const currentDate = new Date();
  const givenDate = new Date(year, month - 1, day); // month is 0-indexed
  const timeDifference = givenDate.getTime() - currentDate.getTime();

  const yearUntil = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
  const monthUntil = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
  const daysUntil = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) % 365 % 30;
  const hoursUntil = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesUntil = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const secondsUntil = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return {
    yearUntil,
    monthUntil,
    daysUntil,
    hoursUntil,
    minutesUntil,
    secondsUntil
  };
}

/*
Button addEventListener
*/
button.addEventListener("click", () => {
  regexCheck();

  const appObj = appTimeUntil(inputAppointmentDay.value, inputAppointmentMonth.value, inputAppointmentYear.value);

  appointmentTimeYears.value = appObj.yearUntil;
  appointmentTimeMonths.value = appObj.monthUntil;
  appointmentTimeDays.value = appObj.daysUntil;
  appointmentTimeHours.value = appObj.hoursUntil;
  appointmentTimeMinutes.value = appObj.minutesUntil;
  appointmentTimeSeconds.value = appObj.secondsUntil;
})

})();


