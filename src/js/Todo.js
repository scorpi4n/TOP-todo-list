export class Todo {
  constructor(
    title,
    description,
    category,
    dueDate,
    priority,
    isCompleted,
    id
  ) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isCompleted = isCompleted;
    this.id = id;
  }

  display() {
    console.log(
      `Title: ${this.title}\nCompleted: ${this.isCompleted}\nID: ${this.id}`
    );
  }

  complete() {
    this.isCompleted = true;
  }

  delete() {
    let todos = Todo.load();
    // filter out what we want deleted
    todos = todos.filter(todo => {
      return todo.id !== this.id ? true : false;
    });
    Todo.save(todos);
  }

  static create(title, description, category, dueDate, priority) {
    let todo = new Todo(
      title,
      description,
      category,
      dueDate,
      priority,
      false,
      crypto.randomUUID()
    );

    return todo;
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
        todo.title,
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
