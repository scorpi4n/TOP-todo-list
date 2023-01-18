// would switch to crypto.randomUUID() but jest doesn't like it
import { v4 as uuidv4 } from "uuid";
import Project from "./Project";

export default class Task {
  constructor(
    name,
    description,
    category,
    dueDate,
    priority,
    projectId = null,
    id = uuidv4(),
    isCompleted = false
  ) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.dueDate = new Date(dueDate);
    this.priority = priority;
    this.projectId = projectId;
    this.id = id;
    this.isCompleted = isCompleted;
  }

  display() {
    console.log(
      `Name: ${this.name}\n
      Completed: ${this.isCompleted}\n
      Project: ${
        Project.load().filter(project => {
          project.id == this.projectId;
        }).name
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
  }

  static create(name, description, category, dueDate, priority, projectId) {
    return new Task(name, description, category, dueDate, priority, projectId);
  }

  static save(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
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
        task.projectId,
        task.id,
        task.isCompleted
      );

      return task;
    });

    return tasks;
  }
}
