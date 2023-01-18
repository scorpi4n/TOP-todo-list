import Task from "./Task";

export default class Project {
  constructor(name, category, tasks = [], isCompleted = false) {
    this.name = name;
    this.category = category;
    this.tasks = tasks;
    this._isCompleted = isCompleted;
  }

  get isCompleted() {
    return this._isCompleted;
  }

  complete() {
    // validate that no tasks in a project are incomplete before marking the project complete
    const incompleteTasks = this.tasks.filter(task => {
      return !task.isCompleted;
    });
    if (!incompleteTasks.length) {
      this._isCompleted = true;
    } else {
      console.warn("not all tasks complete");
    }
  }

  display() {
    console.log(
      `Name: ${this.name}\nCompleted: ${this.isCompleted}\nName: ${this.name}`
    );
  }

  delete() {
    return Project.load().filter(project => {
      return project.name !== this.name;
    });
  }

  addTask(task) {
    this.tasks.push(task);
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
        project.isCompleted
      );

      project.tasks = project.tasks.map(task => {
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

      return project;
    });

    return projects;
  }
}
