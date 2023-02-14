import { format } from "date-fns";
import { button, createElementWithClass, td } from "../js/domHelpers";
import Task from "../js/Task";
import { filterTasks, renderProjects, renderTasks } from "../js/utils";

export default function (task) {
  const { name, dueDate, description } = task;

  const nameEl = createElementWithClass("th", "task-name");
  nameEl.innerText = name;

  const dueDateEl = td(`Due: ${format(dueDate, "P")}`);

  const btnEl = button("Complete");
  btnEl.classList.add("outline");
  btnEl.addEventListener("click", e => handleClick(name, e));

  const btnWrapperEl = td();
  btnWrapperEl.appendChild(btnEl);

  const taskEl = createElementWithClass("tr", "task");
  taskEl.setAttribute("title", description);
  taskEl.appendChildren(nameEl, dueDateEl, btnWrapperEl);

  return taskEl;
}

function handleClick(taskName, event) {
  let tasks = Task.load().map(task => {
    if (taskName === task.name) task.complete();
    return task;
  });
  Task.save(tasks);

  const filteredTasks = filterTasks(tasks);

  renderTasks(filteredTasks);
  renderProjects(filteredTasks);
}
