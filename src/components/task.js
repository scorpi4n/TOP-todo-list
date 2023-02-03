import { format } from "date-fns";
import { button, createElementWithClass, td } from "../modules/domHelpers";

export default function (name, dueDate) {
  const nameEl = createElementWithClass("th", "task-name");
  nameEl.innerText = name;

  const dueDateEl = td(`Due: ${format(dueDate, "P")}`);

  const btnEl = button("Complete");

  const btnWrapperEl = td();
  btnWrapperEl.appendChild(btnEl);

  const taskEl = createElementWithClass("tr", "task");
  taskEl.appendChildren(nameEl, dueDateEl, btnWrapperEl);

  return taskEl;
}
