// import dropdown from "./components/dropdown";
import task from "./components/task";
import { navbar, tasks } from "./js/domElements";
import Task from "./js/Task";
import "./scss/style.scss";

navbar;
// navbar.appendChild(
//   dropdown("Projects", "Migrate database", "Build dream house")
// );

// UNCOMMENT TO RESET TASKS IN LOCALSTORAGE AND RECOMMENT ONCE DONE
//
// localStorage.clear();
// Task.save([
//   new Task("name", "short desc", new Date(), 5),
//   new Task("NAME", "short desc", new Date(), 5),
//   new Task("not v creative", "short desc", new Date(), 5),
//   new Task(":3", "short desc", new Date(), 5),
// ]);

let filteredTasks = Task.load().filter(i => i.isCompleted == false);

filteredTasks.forEach(currentTask => {
  tasks.appendChild(task(currentTask.name, currentTask.dueDate));
});
