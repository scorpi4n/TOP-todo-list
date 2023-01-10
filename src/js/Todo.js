export class Todo {
  constructor(title, description, dueDate, priority, id = crypto.randomUUID()) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = id;
  }

  display() {
    console.log(`Title: ${this.title}\nID: ${this.id}`);
  }

  delete() {
    let todos = loadTodos();
    todos = todos.filter(function (todo) {
      return todo.id !== this.id ? true : false;
    });
    saveTodos(todos);
  }

  static save(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  static load() {
    let todos = JSON.parse(localStorage.getItem("todos"));

    if (todos === null) {
      this.save([]);
      return [];
    }

    todos.forEach(todo => {
      let tmp = new Todo(
        todo.title,
        todo.description,
        todo.dueDate,
        todo.priority,
        todo.id
      );
      // replace each todo with Todo object to append methods
      todos[todos.indexOf(todo)] = tmp;
    });

    return todos;
  }
}