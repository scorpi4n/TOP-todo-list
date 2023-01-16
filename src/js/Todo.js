// would switch to crypto.randomUUID() but jest doesn't like it
import { v4 as uuidv4 } from "uuid";

export default class Todo {
  constructor(
    name,
    description,
    category,
    dueDate,
    priority,
    projectId,
    isCompleted = false,
    id = uuidv4()
  ) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.dueDate = new Date(dueDate);
    this.priority = priority;
    this.projectId = projectId;
    this.isCompleted = isCompleted;
    this.id = id;
  }

  display() {
    console.log(
      `Name: ${this.name}\nCompleted: ${this.isCompleted}\nID: ${this.id}`
    );
  }

  complete() {
    this.isCompleted = true;
  }

  delete() {
    let todos = Todo.load();
    // filter out what we want deleted
    todos = todos.filter(todo => {
      todo.id !== this.id;
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
        todo.isCompleted,
        todo.id
      );
      // replace each item with Todo object to append methods
      todos[todos.indexOf(todo)] = tmp;
    });

    return todos;
  }
}
