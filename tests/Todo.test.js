import Todo from "../src/js/Todo";

describe("test Todo methods", () => {
  // setup and teardown
  let todos;
  beforeEach(() => {
    todos = [
      Todo.create("name1", "desc", "personal", new Date(), 1),
      Todo.create("name2", "description", "personal", new Date(), 2),
      Todo.create("name3", "described", "personal", new Date(), 3),
      Todo.create(
        "name4",
        "make video: 'how to eat donuts'",
        "personal",
        new Date(),
        4
      ),
      Todo.create("name5", "getting lazy", "personal", new Date(), 5),
      Todo.create("name6", "example desc", "personal", new Date(), 1),
    ];

    Todo.save(todos);
  });

  afterEach(() => {
    localStorage.clear();
  });

  // create
  test("create static method return value", () => {
    const result = Todo.create(
      "eat dinner",
      "eat with family",
      "personal",
      new Date(),
      5
    );
    expect(result instanceof Todo).toBeTruthy();
  });

  // read
  test("Todo.load returns array", () => {
    expect(Todo.load()).toBeInstanceOf(Array);
    localStorage.clear();
    expect(Todo.load()).toBeInstanceOf(Array);
  });

  // update
  it("should save an array of Todos", () => {
    Todo.save(todos);
    expect(Todo.load()).toEqual(todos);
  });

  it("should set isCompleted to true", () => {
    todos.at(3).complete();
    Todo.save(todos);
    expect(Todo.load().at(3).isCompleted).toBeTruthy();
  });

  // delete
  it("should remove the todo", () => {
    Todo.load()[2].delete();
    todos.splice(2, 1);
    expect(Todo.load()).toEqual(todos);
  });
});
