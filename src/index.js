import Toastify from "toastify-js";
import "./components/newTaskModal";
import { newTaskBtn, newTaskModal } from "./js/domElements";
import Task from "./js/Task";
import {
  filterTasks,
  renderProjects,
  renderTasks,
  toggleModal,
} from "./js/utils";
import "./scss/style.scss";

// UNCOMMENT TO RESET TASKS IN LOCALSTORAGE AND RECOMMENT ONCE DONE
//
// localStorage.clear();
// Task.save([
//   new Task("name", "short desc", new Date(), 5),
//   new Task("NAME", "i hate this", new Date(), 5, "Migrate Database"),
//   new Task(
//     "not v creative",
//     "i shouldve done this sooner",
//     new Date(),
//     5,
//     "Migrate Database"
//   ),
//   new Task(
//     ":3",
//     "longer description goes here because this task has a short name",
//     new Date(),
//     5,
//     "build dream house"
//   ),
// ]);

let tasks = Task.load();
let filteredTasks = filterTasks(tasks);
renderTasks(filteredTasks);
renderProjects(filteredTasks);

// toggleModal using buttons in array
[newTaskBtn, document.querySelector("#close-modal")].forEach(item => {
  item.addEventListener("click", toggleModal.bind(null, newTaskModal));
});

Toastify({
  text: "Hover over a task to see it's description",
  duration: 5000,
  gravity: "bottom",
  position: "left",
}).showToast();
