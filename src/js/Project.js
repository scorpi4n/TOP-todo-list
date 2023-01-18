import { v4 as uuidv4 } from "uuid";
import Task from "./Task";

export default class Project {
  constructor(name, category, tasks = [], isCompleted = false, id = uuidv4()) {
    this.name = name;
    this.category = category;
    this.tasks = tasks;
    this.isCompleted = isCompleted;
    this.id = id;
  }

  display() {
    console.log(
      `Name: ${this.name}\nCompleted: ${this.isCompleted}\nID: ${this.id}`
    );
  }

  complete() {
    // validate that no tasks in a project are incomplete before marking the project complete
    const incompleteTasks = this.tasks.filter(task => {
      return !task.isCompleted;
    });
    if (!incompleteTasks.length) {
      this.isCompleted = true;
    } else {
      console.warn("not all tasks complete");
    }
  }

  delete() {
    return Project.load().filter(project => {
      return project.id !== this.id;
    });
  }

  addTask(task) {
    this.tasks.push(task);
  }

  static create(name, category) {
    return new Project(name, category);
  }

  static save(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  static load() {
    let projects = JSON.parse(localStorage.getItem("projects"));

    if (!projects.length) {
      this.save([]);
      return [];
    }

    projects = projects.map(project => {
      project = new Project(
        project.name,
        project.category,
        project.tasks,
        project.isCompleted,
        project.id
      );

      project.tasks = project.tasks.map(task => {
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

      return project;
    });

    return projects;
  }
}
