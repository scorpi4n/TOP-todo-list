import Project from "../src/js/Project";
import Todo from "../src/js/Todo";

describe("Test Project methods", () => {
  // setup and teardown
  let testProject = Project.create("name", "category");

  beforeEach(() => {
    testProject = Project.create("name", "category");
  });

  afterEach(() => {
    localStorage.clear();
  });

  // tests
  test(".create() return value", () => {
    expect(testProject instanceof Project).toBeTruthy();
  });

  it("should add one todo to the project", () => {
    testProject.addTodo(
      Todo.create("title", "desc", "category", new Date(), 5)
    );
    expect(testProject.todos.length).toBe(1);
  });
});
