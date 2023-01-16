import Project from "../src/js/Project";
import Todo from "../src/js/Todo";

describe("Test Project methods", () => {
  // setup and teardown
  let testProject = Project.create("name", "category");

  beforeEach(() => {
    testProject = Project.create("name", "category");
    testProject.addTodo(Todo.create("title", "desc", "cat", new Date(), 5));
    Project.save([testProject]);
  });

  afterEach(() => {
    localStorage.clear();
  });

  // create
  test(".create() return value", () => {
    expect(testProject instanceof Project).toBeTruthy();
  });

  // read
  it("should load an array of todos from localStorage", () => {
    expect(typeof Project.load()).toEqual(typeof []);
  });

  it("should load projects as Project class", () => {
    const projects = Project.load();

    projects.forEach(project => {
      expect(project instanceof Project).toBeTruthy();
    });
  });

  // test isn't working
  it("should load project's todos as Todo class", () => {
    const projects = Project.load();
    const todos = projects[projects.length - 1].todos;

    // expect(todos[todos.length - 1] instanceof Todo).toBeTruthy();

    todos.forEach(todo => {
      expect(todo instanceof Todo).toBeTruthy();
    });
  });

  // update
  it("should add one todo to the project", () => {
    testProject.addTodo(
      Todo.create("title", "desc", "category", new Date(), 5)
    );
    expect(testProject.todos.length).toBe(2);
  });

  it("should save array of projects to localStorage", () => {
    Project.save([testProject]);
    expect(Project.load().at(0)).toEqual(testProject);
  });

  // delete
});
