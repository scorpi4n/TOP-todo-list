import { format } from "date-fns";

export default function () {
  return task();
}

function task(name, priority, dueDate) {
  const nameEl = document.createElement("p");
  nameEl.innerText = name;

  const priorityEl = document.createElement("p");
  priorityEl.innerText = `Priority: ${priority}`;

  const dueDateEl = document.createElement("p");
  dueDateEl.innerText = `Due: ${format(dueDate, "P")}`;

  const comleteBtnEl = document.createElement("button");
  comleteBtnEl.innerText = "Complete";

  const taskEl = document.createElement("li");
  taskEl.classList.add("task", "bg-neutral-900", "text-neutral-200");
  taskEl.appendChild(nameEl);
  taskEl.appendChild(priorityEl);
  taskEl.appendChild(dueDateEl);
  taskEl.appendChild(comleteBtnEl);

  return taskEl;
}
