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

    projects.forEach(project => {
      let newProject = new Project(
        project.name,
        project.category,
        // todos aren't of class Todo right here - need to convert them
        project.todos,
        project.isCompleted,
        project.id
      );

      let todos = newProject.todos;
      todos.forEach(todo => {
        let newTodo = new Todo(
          todo.title,
          todo.description,
          todo.category,
          todo.dueDate,
          todo.priority,
          todo.isCompleted,
          todo.id
        );

        todos[todos.indexOf(todo)] = newTodo;
      });

      projects[projects.indexOf(project)] = newProject;
    });

    return projects;
  }
}
