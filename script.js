const addTaskButton = document.getElementById("add");
const taskInput = document.getElementById("task");

const taskList = document.getElementById("taskList");
const completedTaskList = document.getElementById("completedTaskList");

const emptyTaskList = document.getElementById("no_task_item");
const emptyCompletedList = document.getElementById("no_completed_item");

addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value;

  if (taskText) {
    const taskItem = document.createElement("li");
    const checkbox = document.createElement("input");
    const cross = document.createElement("a");

    cross.innerHTML = "	&#128465;";

    const textNode = document.createTextNode(taskText);
    const textContainer = document.createElement("div");

    taskItem.setAttribute("class", "task-text");
    checkbox.setAttribute("class", "checkbox");
    cross.setAttribute("class", "cross");

    checkbox.type = "checkbox";

    taskItem.appendChild(checkbox);
    textContainer.appendChild(textNode);
    taskItem.appendChild(textContainer);
    taskItem.appendChild(cross);

    taskList.appendChild(taskItem);
    hasTasks(taskList, emptyTaskList);
    taskInput.value = "";

    //remove button
    cross.addEventListener("click", () => {
      if (!checkbox.checked) {
        //tasks part
        taskList.removeChild(taskItem);
        hasTasks(taskList, emptyTaskList);
      }
      if (checkbox.checked) {
        //completed part
        completedTaskList.removeChild(taskItem);
        hasTasks(completedTaskList, emptyCompletedList);
      }
    });

    //tasks checkbox
    checkbox.addEventListener("click", () => {
      if (checkbox.checked) {
        textContainer.style.textDecoration = "line-through";
        completedTaskList.appendChild(taskList.removeChild(taskItem));
        hasTasks(taskList, emptyTaskList);
        hasTasks(completedTaskList, emptyCompletedList);
      }
    });

    //completed checkbox
    checkbox.addEventListener("click", () => {
      if (!checkbox.checked) {
        textContainer.style.textDecoration = "none";
        taskList.appendChild(completedTaskList.removeChild(taskItem));
        hasTasks(completedTaskList, emptyCompletedList);
        hasTasks(taskList, emptyTaskList);
      }
    });
  }
});

const completeTasksButton = document.getElementById("complete");
const completedTasksPanel = document.getElementById("completedTasksPanel");

const tasksButton = document.getElementById("tasks");
const tasksPanel = document.getElementById("tasksPanel");

//task expandable
tasksButton.addEventListener("click", function () {
  if (tasksPanel.style.display === "none" || tasksPanel.style.display === "") {
    tasksButton.innerHTML = "&#9660; Tasks";
    tasksPanel.style.display = "block";
    hasTasks(taskList, emptyTaskList);
  } else {
    tasksButton.innerHTML = "&#9654; Tasks";
    tasksPanel.style.display = "none";
    hasTasks(taskList, emptyTaskList);
  }
});

//completed expandable
completeTasksButton.addEventListener("click", function () {
  if (
    completedTasksPanel.style.display === "none" ||
    completedTasksPanel.style.display === ""
  ) {
    completeTasksButton.innerHTML = "&#9660; Completed";
    completedTasksPanel.style.display = "block";
    hasTasks(completedTaskList, emptyCompletedList);
  } else {
    completeTasksButton.innerHTML = "&#9654; Completed";
    completedTasksPanel.style.display = "none";
    hasTasks(completedTaskList, emptyCompletedList);
  }
});

//set no task if has no task
function hasTasks(list, emptyList) {
  if (list.children.length > 0) emptyList.innerHTML = null;
  else emptyList.innerHTML = "No tasks";
}
