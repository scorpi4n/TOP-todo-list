// would switch to crypto.randomUUID() but jest doesn't like it
import { v4 as uuidv4 } from "uuid";
import Project from "./Project";

export default class Todo {
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
    let todos = Todo.load();
    // filter out what we want deleted
    todos = todos.filter(todo => {
      return todo.id !== this.id;
    });
    Todo.save(todos);
  }

  static create(name, description, category, dueDate, priority, projectId) {
    return new Todo(name, description, category, dueDate, priority, projectId);
  }

  static save(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  static load() {
    let todos = JSON.parse(localStorage.getItem("todos"));

    if (!todos) {
      this.save([]);
      return [];
    }

    todos.forEach(todo => {
      let tmp = new Todo(
        todo.name,
        todo.description,
        todo.category,
        todo.dueDate,
        todo.priority,
        todo.projectId,
        todo.id,
        todo.isCompleted
      );
      // replace each item with Todo object to append methods
      todos[todos.indexOf(todo)] = tmp;
    });

    return todos;
  }
}
