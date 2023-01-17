import Project from "../src/js/Project";
import Todo from "../src/js/Todo";

describe("Test Project methods", () => {
  // setup and teardown
  let testProject;

  beforeEach(() => {
    testProject = Project.create("name", "category");
    testProject.addTodo(
      Todo.create("name", "desc", "cat", new Date(), 5, testProject.id)
    );
    Project.save([testProject]);
  });

  afterEach(() => {
    localStorage.clear();
  });

  // create
  test("create static method return value", () => {
    expect(testProject).toBeInstanceOf(Project);
  });

  // read
  it("should load an array of todos from localStorage", () => {
    expect(Project.load()).toBeInstanceOf(Array);
  });

  it("should load projects as Project class", () => {
    const projects = Project.load();

    projects.forEach(project => {
      expect(project).toBeInstanceOf(Project);
    });
  });

  // test isn't working
  it("should load project's todos as Todo class", () => {
    const projects = Project.load();
    const todos = projects.at(-1).todos;

    // expect(todos[todos.length - 1] instanceof Todo).toBeTruthy();

    todos.forEach(todo => {
      expect(todo).toBeInstanceOf(Todo);
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
