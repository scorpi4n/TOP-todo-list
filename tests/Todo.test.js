import Todo from "../src/js/Todo";

test("'create' static method", () => {
  const result = Todo.create(
    "eat dinner",
    "eat with family",
    "personal",
    new Date(),
    5
  );
  expect(result).toBeTruthy();
});
