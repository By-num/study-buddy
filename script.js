// ...existing code for quote and date...

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
    <button class="delete-task" data-id="${task.id}">✅ Mark as Done</button>
  `;
  taskList.appendChild(li);

  // Add delete functionality
  li.querySelector('.delete-task').addEventListener('click', function () {
    deleteTask(task.id);
  });
}

// Fetch and render all tasks from db.json
function renderTaskList() {
  taskList.innerHTML = '';
  fetch('http://localhost:3000/tasks')
    .then(res => res.json())
    .then(tasks => {
      tasks.forEach((task, i) => addTaskToList(task, i));
    });
}

// Add new task to db.json
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskName = document.getElementById("task-name").value;
  const subject = document.getElementById("subject").value;
  const deadline = document.getElementById("deadline").value;
  const priority = document.getElementById("priority").value;

  const newTask = {
    name: taskName,
    subject: subject,
    deadline: deadline,
    priority: priority
  };

  fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTask)
  })
    .then(() => {
      renderTaskList();
      form.reset();
    });
});

// Delete task from db.json
function deleteTask(id) {
  fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'DELETE'
  })
    .then(() => renderTaskList());
}

// Load tasks on page load
window.addEventListener("DOMContentLoaded", renderTaskList);

// ...existing code for timer...