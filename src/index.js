import dropdown from "./components/dropdown";
import { filters, newTaskBtn, newTaskModal } from "./js/domElements";
import Task from "./js/Task";
import { filterTasks, renderTasks, toggleModal } from "./js/utils";
import "./scss/style.scss";

filters.appendChild(
  dropdown("Projects", "Migrate database", "Build dream house")
);

// UNCOMMENT TO RESET TASKS IN LOCALSTORAGE AND RECOMMENT ONCE DONE
//
// localStorage.clear();
// Task.save([
//   new Task("name", "short desc", new Date(), 5, "Migrate Database"),
//   new Task("NAME", "short desc", new Date(), 5, "Migrate Database"),
//   new Task("not v creative", "short desc", new Date(), 5, "Migrate Database"),
//   new Task(":3", "short desc", new Date(), 5, "build dream house"),
// ]);

let tasks = Task.load();
let filteredTasks = filterTasks(tasks);
renderTasks(filteredTasks);

// toggleModal using buttons in array
[newTaskBtn, document.querySelector("#close-modal")].forEach(item => {
  item.addEventListener("click", toggleModal.bind(null, newTaskModal));
});
