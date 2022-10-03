let taskList = [];
function ListItemData(checkBoxState, spanText) {
  this.checkboxState = checkBoxState;
  this.spanText = spanText;
}

(function addEventListenerEnter() {
  const inputTask = document.getElementById("input-task");
  inputTask.addEventListener("keypress", e => {
    if (e.key === "Enter") handleAddTask();
  })
})();

const handleAddTask = () => {
  const taskName = document.getElementById("input-task").value;
  if (taskName === "") return;
  const taskList = document.getElementById("task-list");
  const taskItem = addTaskItem(false, taskName);
  taskList.appendChild(taskItem);
  save();
  return taskItem
}

const addTaskItem = (checked, taskName) => {
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");

  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.checked = checked;
  checkBox.addEventListener("change", handlerCheckbox);
  taskItem.appendChild(checkBox);

  const task = document.createElement("span");
  task.classList.add("task");

  document.getElementById("input-task").value = "";
  const textTask = document.createTextNode(taskName);
  task.appendChild(textTask);
  taskItem.appendChild(task);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", handleDeleteTask);
  const materialSymbolsOutlined = document.createElement("span");
  materialSymbolsOutlined.classList.add("material-symbols-outlined");
  const textBtn = document.createTextNode("cancel");
  materialSymbolsOutlined.appendChild(textBtn);
  deleteBtn.appendChild(materialSymbolsOutlined);
  taskItem.appendChild(deleteBtn);
  return taskItem;
}

const handlerCheckbox = (event) => {
  const checkBox = event.target;
  const taskItem = checkBox.parentNode;
  const task = taskItem.getElementsByClassName("task")[0];
  task.classList.toggle("done");
  save();
  return taskItem;
}

const handleDeleteTask = (event) => {
  let taskItem = event.target.parentNode;
  if (taskItem.classList.contains("task-item")) {
    taskItem.remove();
  } else {
    taskItem = taskItem.parentNode;
    if (taskItem.classList.contains("task-item")) {
      taskItem.remove();
    }
  }
  save();
  return taskItem;
}

const save = () => {
  taskList = [];
  fillTaskList();
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

const fillTaskList = () => {
  const list = document.getElementById("task-list").children;
  for (let listItem of list) {
    const checkbox = listItem.getElementsByTagName("input")[0];
    const checkboxState = checkbox.checked;
    const span = listItem.getElementsByTagName("span")[0];
    const spanText = span.firstChild.textContent;
    taskList.push(new ListItemData(checkboxState, spanText));
  }
}

const load = () => {
  const list = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("task-list");
  for (let task of list) {
    const checkboxState = task.checkboxState;
    const spanText = task.spanText;
    const taskItem = addTaskItem(checkboxState, spanText);
    taskList.appendChild(taskItem);
  }
  save();
}