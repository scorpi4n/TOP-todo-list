import { v4 as uuidv4 } from "uuid";

export default class Project {
  constructor(name, category, todos = [], isCompleted = false, id = uuidv4()) {
    this.name = name;
    this.category = category;
    this.todos = todos;
    this.isCompleted = isCompleted;
    this.id = id;
  }

  display() {
    console.log(
      `Name: ${this.name}\nCompleted: ${this.isCompleted}\nID: ${this.id}`
    );
  }

  complete() {
    // validate that all todos in a project are complete before marking the project complete
    if (
      this.todos.filter(todo => {
        !todo.isCompleted;
      })
    ) {
      return;
    } else {
      this.isCompleted = true;
    }
  }

  delete() {
    return Project.load().filter(project => {
      project.id !== this.id;
    });
  }

  static create(name, category) {
    return new Project(name, category);
  }

  static save(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  static load() {
    let projects = JSON.parse(localStorage.getItem("projects"));

    if (!projects) {
      this.save([]);
      return [];
    }

    return projects.forEach(project => {
      project = new Project(
        project.name,
        project.category,
        // todos aren't of class Todo right here - need to convert them
        project.todos,
        project.isCompleted,
        project.id
      );
    });
  }
}
