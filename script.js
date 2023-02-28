// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  saveBtn = document.querySelectorAll('.save-button');

  saveBtn.forEach((button) => {
    button.addEventListener('click', function() {
      const description = this.parentNode.querySelector('.description').value;
      const hour = this.parentNode.id;
      localStorage.setItem(hour, description);
    });
  });
    
 
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  const timeBlock = document.querySelectorAll('.time-block');

  timeBlock.forEach((block) => {
    const hour = block.id.split('-')[1];
    const currentHour = dayjs().hour();

    if (hour < currentHour) {
      block.classList.add('past');
    } else if (hour > currentHour) {
      block.classList.add('future');
    } else {
      block.classList.add('present');
    }
  });
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  for (let i = 7; i < 23; ++i) {
    const storedDescription = localStorage.getItem(`hour-${i}`);
    const descriptionEl = $(`#hour-${i} .description`);

    if (storedDescription !== null) {
      descriptionEl.val(storedDescription);
    }
  }
  // TODO: Add code to display the current date in the header of the page.
  const clock = document.getElementById('currentDay');
  const clockFace = document.createElement('p');
  clock.appendChild(clockFace);
  
  function updateClock() {
  const dateToday = dayjs().format('dddd, MMM, DD, H:mm:ss');
  clockFace.textContent = dateToday;
  }

  setInterval(updateClock, 1000);
});
