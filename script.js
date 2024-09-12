const header = document.querySelector(".calendar h3");
const dates = document.querySelector(".dates");
const navs = document.querySelectorAll("#prev, #next");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

function renderCalendar() {
  const start = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  const end = new Date(year, month, endDate).getDay();
  const endDatePrev = new Date(year, month, 0).getDate();

  let datesHtml = "";

  // Generate previous month's inactive days
  for (let i = start; i > 0; i--) {
    datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
  }

  // Generate current month's active days
  for (let i = 1; i <= endDate; i++) {
    let className =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? ' class="today"'
        : "";
    datesHtml += `<li${className}>${i}</li>`;
  }

  // Generate next month's inactive days
  for (let i = end; i < 6; i++) {
    datesHtml += `<li class="inactive">${i - end + 1}</li>`;
  }

  dates.innerHTML = datesHtml;
  header.textContent = `${months[month]} ${year}`;

  // Call the function to change specific dates' colors
  leaveDayColour(2, 8, 2024); // Change September 2, 2024 to red
  leaveDayColour(4, 8, 2024); // Change September 4, 2024 to red
  leaveDayColour(6, 7, 2024); // Change August 6, 2024 to red
  lateDayColour(5, 7, 2024); // Change August 6, 2024 to red

}

// Function to change the color of a specific date
function leaveDayColour(day, monthToChange, yearToChange) {
  if (month === monthToChange && year === yearToChange) {
    const allDates = document.querySelectorAll(".dates li");
    allDates.forEach((dateItem) => {
      if (dateItem.textContent == day && !dateItem.classList.contains("inactive")) {
        dateItem.style.color = "red";
      }
    });
  }
}

function lateDayColour(day, monthToChange, yearToChange) {
  if (month === monthToChange && year === yearToChange) {
    const allDates = document.querySelectorAll(".dates li");
    allDates.forEach((dateItem) => {
      if (dateItem.textContent == day && !dateItem.classList.contains("inactive")) {
        dateItem.style.color = "yellow";
      }
    });
  }
}

navs.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    const btnId = e.target.id;

    if (btnId === "prev" && month === 0) {
      year--;
      month = 11;
    } else if (btnId === "next" && month === 11) {
      year++;
      month = 0;
    } else {
      month = btnId === "next" ? month + 1 : month - 1;
    }

    date = new Date(year, month, new Date().getDate());
    year = date.getFullYear();
    month = date.getMonth();

    renderCalendar();
  });
});

// Add event listener for clicks on the dates
dates.addEventListener("click", (e) => {
  if (e.target.tagName === "LI" && !e.target.classList.contains("inactive")) {
    const clickedDate = e.target.textContent;
    console.log(`${months[month]} ${clickedDate}, ${year}`);
  }
});

renderCalendar();
