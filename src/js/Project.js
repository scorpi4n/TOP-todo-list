import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";

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
    // validate that no todos in a project are incomplete before marking the project complete
    const incompleteTodos = this.todos.filter(todo => {
      return !todo.isCompleted;
    });
    if (!incompleteTodos.length) {
      this.isCompleted = true;
    } else {
      console.warn("not all todos complete");
    }
  }

  delete() {
    return Project.load().filter(project => {
      project.id !== this.id;
    });
  }

  addTodo(todo) {
    this.todos.push(todo);
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

    projects = projects.map(project => {
      project = new Project(
        project.name,
        project.category,
        project.todos,
        project.isCompleted,
        project.id
      );

      project.todos = project.todos.map(todo => {
        todo = new Todo(
          todo.name,
          todo.description,
          todo.category,
          todo.dueDate,
          todo.priority,
          todo.projectId,
          todo.id,
          todo.isCompleted
        );

        return todo;
      });

      return project;
    });

    return projects;
  }
}
