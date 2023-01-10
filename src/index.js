import { getTodos, Todo } from "./js/todos";
import "./scss/style.scss";

// temporary helper variables
const today = new Date();
let todos = [
  new Todo(
    "cook breakfast for family",
    "I've been tasked with making breakfast for everybody on Christmas",
    today,
    5
  ),
  new Todo("have fun", "go to a waterpark or something", today, 1),
];

// saveTodos(todos);

getTodos().forEach(todo => {
  todo.display();
});
