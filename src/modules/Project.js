// CURRENTLY BROKEN

import Task from "./Task";

export default class Project {
  constructor(name, isCompleted = false) {
    this.name = name;
    this._isCompleted = isCompleted;
  }

  get isCompleted() {
    return this._isCompleted;
  }

  complete() {
    // validate that no tasks in a project are incomplete before marking the project complete
    const incompleteTasks = Task.load().filter(task => !task.isCompleted);
    if (!incompleteTasks.length) {
      this._isCompleted = true;
    } else {
      console.warn("not all tasks complete");
    }
  }

  display() {
    console.log(
      `Name: ${this.name}\n
      Completed: ${this.isCompleted}\n
      Name: ${this.name}`
    );
  }

  delete() {
    let projects = Project.load();

    const filteredProjects = projects.filter(project => {
      return project.name !== this.name;
    });
    Project.save(filteredProjects);

    const deletedProject = projects.find(project => project.name === this.name);

    return deletedProject;
  }

  addTask(taskId) {
    let tasks = Task.load();
    let task = tasks.filter(task => taskId === task.id);

    task.projectName = this.name;
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
      project = new Project(project.name, project.isCompleted);

      return project;
    });

    return projects;
  }
}
