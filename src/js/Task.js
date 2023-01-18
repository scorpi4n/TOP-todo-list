import { v4 as uuidv4 } from "uuid";

export default class Task {
  #priority;

  constructor(
    name,
    description,
    category,
    dueDate,
    priority,
    projectName = null,
    id = uuidv4(),
    isCompleted = false
  ) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.dueDate = new Date(dueDate);
    this.priority = priority;
    this.projectName = projectName;
    this.id = id;
    this.isCompleted = isCompleted;
  }

  display() {
    console.log(
      `Name: ${this.name}\n
      Completed: ${this.isCompleted}\n
      Project: ${this.projectName})
      }`
    );
  }

  complete() {
    this.isCompleted = true;
    return this;
  }

  delete() {
    let tasks = Task.load();
    // filter out what we want deleted
    tasks = tasks.filter(task => {
      return task.id !== this.id;
    });
    Task.save(tasks);

    return tasks;
  }

  static save(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));

    return tasks;
  }

  static load() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    if (!tasks) {
      this.save([]);
      return [];
    }

    tasks = tasks.map(task => {
      task = new Task(
        task.name,
        task.description,
        task.category,
        task.dueDate,
        task.priority,
        task.projectName,
        task.id,
        task.isCompleted
      );

      return task;
    });

    return tasks;
  }
}
