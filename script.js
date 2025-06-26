const currentDate = document.getElementById("current-date");

const today = new Date();
const formateddate = today.toDateString();
currentDate.textContent = `Today's Date: ${formateddate}`;

// STEP 2: Handle form submission to add task
const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page refresh

  // Get form values
  const taskName = document.getElementById("task-name").value;
  const subject = document.getElementById("subject").value;
  const deadline = document.getElementById("deadline").value;
  const priority = document.getElementById("priority").value;

  // Create a new list item
  const li = document.createElement("li");
  li.innerHTML = `
    <strong>Task:</strong> ${taskName} <br>
    <strong>Subject:</strong> ${subject} <br>
    <strong>Deadline:</strong> ${deadline} <br>
    <strong>Priority:</strong> ${priority}
  `;

  // Add to task list
  taskList.appendChild(li);

  // Clear form inputs after submission
  form.reset();
});

// STEP 3: Timer functionality
let count = 0;
let timerInterval = null;

const h2 = document.getElementById("h2"); // The timer display

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

// Helper function to format time as HH:MM:SS
function formatTime(seconds) {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

// Start Timer
startBtn.addEventListener("click", function () {
  if (timerInterval) return; // Prevent multiple intervals

  timerInterval = setInterval(() => {
    count++;
    h2.textContent = formatTime(count);
  }, 1000); // Every second
});

// Pause Timer
pauseBtn.addEventListener("click", function () {
  clearInterval(timerInterval);
  timerInterval = null;
});

// Reset Timer
resetBtn.addEventListener("click", function () {
  clearInterval(timerInterval);
  timerInterval = null;
  count = 0;
  h2.textContent = formatTime(count);
});

// Initialize timer display on page load
h2.textContent = formatTime(count);