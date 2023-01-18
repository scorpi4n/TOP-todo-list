import Project from "../src/js/Project";
import Task from "../src/js/Task";

describe("Test Project methods", () => {
  // setup and teardown
  let testProject;

  beforeEach(() => {
    testProject = Project.create("name", "category");
    testProject.addTask(
      Task.create("name", "desc", "cat", new Date(), 5, testProject.id)
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
  it("should load an array of tasks from localStorage", () => {
    expect(Project.load()).toBeInstanceOf(Array);
  });

  it("should load projects as Project class", () => {
    const projects = Project.load();

    projects.forEach(project => {
      expect(project).toBeInstanceOf(Project);
    });
  });

  it("should load project's tasks as Task class", () => {
    const projects = Project.load();
    const tasks = projects.at(-1).tasks;

    tasks.forEach(task => {
      expect(task).toBeInstanceOf(Task);
    });
  });

  // update
  it("should add one task to the project", () => {
    testProject.addTask(
      Task.create("title", "desc", "category", new Date(), 5)
    );
    expect(testProject.tasks.length).toBe(2);
  });

  it("should save array of projects to localStorage", () => {
    Project.save([testProject]);
    expect(Project.load().at(0)).toEqual(testProject);
  });

  it("should mark the project complete if all it's tasks are done", () => {
    expect(testProject.isCompleted).toBeFalsy();
    testProject.tasks.forEach(task => {
      task.complete();
    });
    testProject.complete();
    expect(testProject.isCompleted).toBeTruthy();
  });

  // delete
});
