const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const clearListBtn = document.getElementById("clearListBtn");
const taskList = document.getElementById("taskList");
const noTasksMessage = document.getElementById("noTasksMessage");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  clearListBtn.disabled = tasks.length === 0;

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.innerHTML = `<input type="checkbox" id="task${index}" />
                                  <label for="task${index}">${task}</label>`;
    taskList.appendChild(taskItem);

    const checkbox = document.getElementById(`task${index}`);
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        taskItem.style.textDecoration = "line-through";
      } else {
        taskItem.style.textDecoration = "none";
      }
    });
  });
}

renderTasks();

addTaskBtn.addEventListener("click", () => {
  const taskValue = taskInput.value.trim();
  if (taskValue) {
    tasks.push(taskValue);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    taskInput.value = "";
    noTasksMessage.classList.add("hidden");
  }
});

clearListBtn.addEventListener("click", () => {
  tasks = [];
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  noTasksMessage.classList.remove("hidden");
});
