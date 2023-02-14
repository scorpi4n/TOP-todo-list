import Task from "../js/Task";
import { filterTasks, renderTasks } from "../js/utils";

export default function (title, ...dropdownItems) {
  const dropdownWrapperEl = document.createElement("li");

  const dropdownEl = document.createElement("details");
  dropdownEl.setAttribute("role", "list");
  dropdownEl.dir = "rtl";

  const titleEl = document.createElement("summary");
  titleEl.innerText = title;
  titleEl.setAttribute("aria-haspopup", "listbox");
  titleEl.setAttribute("role", "link");

  const listboxEl = document.createElement("ul");
  listboxEl.setAttribute("role", "listbox");

  // Add filter for all projects before adding each individual project
  const button = document.createElement("button");
  button.classList.add("outline", "contrast");
  button.innerText = "All tasks";
  button.addEventListener("click", () => renderTasks(Task.load()));
  const li = document.createElement("li");
  li.appendChild(button);
  listboxEl.appendChild(li);

  dropdownItems.forEach(item => {
    const button = document.createElement("button");
    button.classList.add("outline", "contrast");
    button.innerText = item;
    button.addEventListener("click", handleClick.bind(null, item));

    const li = document.createElement("li");
    li.appendChild(button);

    listboxEl.appendChild(li);
  });

  dropdownEl.appendChild(titleEl);
  dropdownEl.appendChild(listboxEl);

  dropdownWrapperEl.appendChild(dropdownEl);

  return dropdownWrapperEl;
}

function handleClick(projectName) {
  let tasks = Task.load();
  let filteredTasks = filterTasks(tasks, { project: projectName });
  renderTasks(filteredTasks);
}
