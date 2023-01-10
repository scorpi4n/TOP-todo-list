export class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  display() {
    console.log(this.title);
  }
}

export function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

export function getTodos() {
  let todos = JSON.parse(localStorage.getItem("todos"));

  if (todos === null) {
    saveTodos([]);
  }

  todos.forEach(todo => {
    let tmp = new Todo(
      todo.title,
      todo.description,
      todo.dueDate,
      todo.priority
    );
    // replace each todo with Todo object to append methods
    todos[todos.indexOf(todo)] = tmp;
  });

  return todos;
}
