import { format } from "date-fns";

export default function (name, priority, dueDate) {
  const priorityEl = document.createElement("p");
  priorityEl.innerText = `Priority: ${priority}`;

  const dueDateEl = document.createElement("p");
  dueDateEl.innerText = `Due: ${format(dueDate, "P")}`;

  const infoEl = document.createElement("div");
  infoEl.classList.add("task-info");
  infoEl.appendChild(priorityEl);
  infoEl.appendChild(dueDateEl);

  const nameEl = document.createElement("p");
  nameEl.classList.add("task-name");
  nameEl.innerText = name;

  const wrapperEl = document.createElement("div");
  wrapperEl.appendChild(nameEl);
  wrapperEl.appendChild(infoEl);

  const completeBtnEl = document.createElement("button");
  completeBtnEl.innerText = "Complete";
  // completeBtnEl.addEventListener

  const taskEl = document.createElement("li");
  taskEl.classList.add("task", "bg-neutral-900", "text-neutral-200");

  taskEl.appendChild(wrapperEl);
  taskEl.appendChild(completeBtnEl);

  return taskEl;
}
