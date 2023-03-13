import Toastify from "toastify-js";
import "./components/newTaskModal";
import { newTaskBtn, newTaskModal } from "./js/domElements";
import Task, { getTasks, saveTasks } from "./js/Task";
import {
  filterTasks,
  renderProjects,
  renderTasks,
  toggleModal
} from "./js/utils";
import "./scss/style.scss";

let tasks = getTasks();

if (localStorage.getItem("tasks") === null) {
  tasks = saveTasks([
    new Task(
      "Check out Listo!",
      "I found a cool Todo app called Listo and I want to explore it",
      new Date(),
      5,
      "The Odin Project"
    ),
  ]);

  Toastify({
    text: "Hover over a task to see it's description",
    duration: 15000,
    gravity: "bottom",
    position: "left",
  }).showToast();
}

let filteredTasks = filterTasks(tasks);
renderTasks(filteredTasks);
renderProjects(filteredTasks);

[newTaskBtn, document.querySelector("#close-modal")].forEach(item => {
  item.addEventListener("click", toggleModal.bind(null, newTaskModal));
});
