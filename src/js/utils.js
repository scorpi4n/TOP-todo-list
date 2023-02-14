import task from "../components/task";
import { newTaskModal, tasks as tasksEl } from "./domElements";
import Task from "./Task";

export function renderTasks(tasks) {
  tasksEl.innerHTML = "";

  tasks.forEach(item => {
    tasksEl.appendChild(task(item));
  });
}

export function filterTasks(
  tasks,
  options = {
    sorted: false,
    // sortBy should be "date", "alpha", or "priority"
    sortBy: "date",
    showCompleted: false,
    project: null,
    inversed: false,
  }
) {
  const { sorted, showCompleted, project } = options;

  // filters
  if (!showCompleted) {
    tasks = tasks.filter(task => !task.isCompleted);
  }

  if (project !== null) {
    tasks = tasks.filter(task => {
      return project.toLowerCase() === task.projectName.toLowerCase();
    });
  }

  // guard clause for sorting
  if (!sorted) return tasks;

  // sorting

  return tasks;
}

export function getProjects(tasks = Task.load()) {
  return new Set(tasks.map(task => task.projectName));
}

export function toggleModal(modal = newTaskModal) {
  modal.toggleAttribute("open");
}

export function updateTitle(newTitle) {
  document.querySelector("caption.title").innerText = newTitle;
}
