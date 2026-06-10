let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

window.onload = renderTasks;

function addTask() {
  const input = document.getElementById("taskInput");
  const priority = document.getElementById("priority").value;

  if (input.value.trim() === "") return;

  const task = {
    id: Date.now(),
    text: input.value,
    priority: priority,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();

  input.value = "";
}

function toggleTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });

  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  document.getElementById("highList").innerHTML = "";
  document.getElementById("mediumList").innerHTML = "";
  document.getElementById("lowList").innerHTML = "";

  // ⭐ ADDED COUNTERS (ONLY NEW PART)
  let total = tasks.length;
  let completed = tasks.filter(t => t.completed).length;
  let pending = total - completed;

  document.getElementById("totalCount").innerText = total;
  document.getElementById("pendingCount").innerText = pending;
  document.getElementById("completedCount").innerText = completed;

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "task";
    if (task.completed) div.classList.add("completed");

    div.innerHTML = `
      <span onclick="toggleTask(${task.id})">${task.text}</span>
      <div class="actions">
        <button class="done" onclick="toggleTask(${task.id})">✔</button>
        <button class="delete" onclick="deleteTask(${task.id})">🗑</button>
      </div>
    `;

    document.getElementById(task.priority + "List").appendChild(div);
  });
}