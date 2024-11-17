const UI_ELEMENTS = {
  taskInput: document.getElementById("taskInput"),
  addTaskBtn: document.getElementById("addTaskBtn"),
  clearListBtn: document.getElementById("clearListBtn"),
  taskList: document.getElementById("taskList"),
  noTasksMessage: document.getElementById("noTasksMessage"),
};
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  UI_ELEMENTS.taskList.innerHTML = "";
  UI_ELEMENTS.clearListBtn.disabled = !tasks.length;

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.innerHTML = `<input type="checkbox" id="task${index}" />
                                  <label for="task${index}">${task}</label>`;
    UI_ELEMENTS.taskList.appendChild(taskItem);

    const checkbox = document.getElementById(`task${index}`);
    checkbox.addEventListener("change", () => {
      taskItem.style.textDecoration = checkbox.checked
        ? "line-through"
        : "none";
    });
  });
}

renderTasks();

UI_ELEMENTS.addTaskBtn.addEventListener("click", () => {
  const taskValue = UI_ELEMENTS.taskInput.value.trim();
  if (taskValue) {
    tasks.push(taskValue);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    UI_ELEMENTS.taskInput.value = "";
    UI_ELEMENTS.noTasksMessage.classList.add("hidden");
  } else {
    alert("Пожалуйста, введите задачу <3");
  }
});

UI_ELEMENTS.clearListBtn.addEventListener("click", () => {
  tasks = [];
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  UI_ELEMENTS.noTasksMessage.classList.remove("hidden");
});
