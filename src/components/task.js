import { format } from "date-fns";
import { button, createElementWithClass, td } from "../js/domHelpers";
import { getTasks, saveTasks } from "../js/Task";
import { filterTasks, renderProjects } from "../js/utils";

export default function (task) {
  const { name, dueDate, description, priority } = task;

  const priorityEl = td(priority);

  const nameEl = createElementWithClass("th", "task-name");
  nameEl.innerText = name;

  const dueDateEl = td(`Due: ${format(dueDate, "P")}`);

  const btnEl = button("Complete");
  btnEl.classList.add("outline");
  btnEl.addEventListener("click", e => handleClick(name, e));

  const btnWrapperEl = td();
  btnWrapperEl.appendChild(btnEl);

  const deleteEl = button("Delete");
  deleteEl.classList.add("outline", "secondary");
  deleteEl.addEventListener("click", e => handleDelete(task, e));

  const deleteWrapperEl = td();
  deleteWrapperEl.appendChild(deleteEl);

  const taskEl = createElementWithClass("tr", "task");
  taskEl.setAttribute("title", description);
  taskEl.appendChildren(
    nameEl,
    dueDateEl,
    priorityEl,
    btnWrapperEl,
    deleteWrapperEl
  );

  return taskEl;
}

function handleClick(taskName, event) {
  let tasks = getTasks().map(task => {
    if (taskName === task.name) task.complete();
    return task;
  });
  saveTasks(tasks);

  const filteredTasks = filterTasks(tasks);

  event.target.parentNode.parentNode.style.display = "none";
  renderProjects(filteredTasks);
}

function handleDelete(task, event) {
  task.delete();
  event.target.parentNode.parentNode.style.display = "none";
}
