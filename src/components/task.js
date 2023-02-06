import { format } from "date-fns";
import { button, createElementWithClass, td } from "../js/domHelpers";
import Task from "../js/Task";

export default function (name, dueDate) {
  const nameEl = createElementWithClass("th", "task-name");
  nameEl.innerText = name;

  const dueDateEl = td(`Due: ${format(dueDate, "P")}`);

  const btnEl = button("Complete");
  btnEl.addEventListener("click", e => handleClick(name, e));

  const btnWrapperEl = td();
  btnWrapperEl.appendChild(btnEl);

  const taskEl = createElementWithClass("tr", "task");
  taskEl.appendChildren(nameEl, dueDateEl, btnWrapperEl);

  return taskEl;
}

function handleClick(taskName, event) {
  let tasks = Task.load().map(task => {
    if (taskName === task.name) task.complete();
    return task;
  });
  Task.save(tasks);

  // delete task from visible table
  event.target.parentElement.parentElement.style.display = "none";
}
