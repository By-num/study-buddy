// --- Motivational Quote API Integration ---
const quoteContainer = document.createElement("div");
quoteContainer.id = "quote-container";
quoteContainer.style.textAlign = "center";
quoteContainer.style.margin = "20px auto";
quoteContainer.style.fontStyle = "italic";
quoteContainer.style.background = "#fff";
quoteContainer.style.color = "#222";
quoteContainer.style.border = "2px solid #000";
quoteContainer.style.borderRadius = "10px";
quoteContainer.style.maxWidth = "600px";
quoteContainer.style.padding = "15px";
quoteContainer.textContent = "Loading motivational quote...";

// Insert quote container at the top of the body
document.body.insertBefore(quoteContainer, document.body.firstChild);

// Fetch a random motivational quote from ZenQuotes API
fetch("https://zenquotes.io/api/random")
  .then(res => res.json())
  .then(data => {
    if (Array.isArray(data) && data[0]) {
      quoteContainer.textContent = `"${data[0].q}" — ${data[0].a}`;
    } else {
      quoteContainer.textContent = "Stay motivated and keep studying!";
    }
  })
  .catch(() => {
    quoteContainer.textContent = "Stay motivated and keep studying!";
  });

// --- Date Display ---
const currentDate = document.getElementById("current-date");
const today = new Date();
const formateddate = today.toDateString();
currentDate.textContent = `Today's Date: ${formateddate}`;

// STEP 2: Handle form submission to add task
const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

// Helper function to add a task to the DOM with delete button
function addTaskToList(task, idx) {
  const li = document.createElement("li");
  li.innerHTML = `
    <strong>Task:</strong> ${task.name} <br>
    <strong>Subject:</strong> ${task.subject} <br>
    <strong>Deadline:</strong> ${task.deadline} <br>
    <strong>Priority:</strong> ${task.priority}
    <br>
    <button class="delete-task" data-idx="${idx}">✅ Mark as Done</button>
  `;
  taskList.appendChild(li);

  // Add delete functionality
  li.querySelector('.delete-task').addEventListener('click', function () {
    deleteTask(idx);
  });
}

// Delete task by index and update localStorage and DOM
function deleteTask(idx) {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.splice(idx, 1);
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
  // Refresh the list
  renderTaskList();
}

// Render all tasks from localStorage
function renderTaskList() {
  taskList.innerHTML = '';
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task, i) => addTaskToList(task, i));
}

// Load tasks from localStorage on page load
window.addEventListener("DOMContentLoaded", renderTaskList);

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page refresh

  // Get form values
  const taskName = document.getElementById("task-name").value;
  const subject = document.getElementById("subject").value;
  const deadline = document.getElementById("deadline").value;
  const priority = document.getElementById("priority").value;

  // Save to localStorage
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const newTask = {
    name: taskName,
    subject: subject,
    deadline: deadline,
    priority: priority
  };
  savedTasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(savedTasks));

  // Re-render task list
  renderTaskList();

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