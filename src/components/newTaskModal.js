import {
  dateInput,
  descriptionInput,
  nameInput,
  priorityInput,
  projectInput,
  submitTaskBtn
} from "../js/domElements";
import Task, { getTasks, saveTasks } from "../js/Task";
import { filterTasks, renderProjects, renderTasks } from "../js/utils";

submitTaskBtn.addEventListener("click", handleSubmit);

function handleSubmit() {
  let tasks = getTasks();

  tasks.forEach(task => {
    if (task.name === nameInput.value) {
      tasks = task.delete();
    }
  });

  tasks.push(
    new Task(
      nameInput.value,
      descriptionInput.value,
      dateInput.valueAsDate,
      priorityInput.valueAsNumber,
      projectInput.value.length ? projectInput.value : null
    )
  );
  saveTasks(tasks);

  const filteredTasks = filterTasks(tasks);
  renderTasks(filteredTasks);
  renderProjects(filteredTasks);
}
