import Project from "../src/js/Project";
import Task from "../src/js/Task";

describe("Test Project methods", () => {
  // setup and teardown
  let project;

  beforeEach(() => {
    project = new Project("name", "category");
    project.addTask(
      new Task("name", "desc", "cat", new Date(), 5, project.name)
    );
    Project.save([project]);
  });

  afterEach(() => {
    localStorage.clear();
  });

  // create
  test("create static method return value", () => {
    expect(project).toBeInstanceOf(Project);
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
    project.addTask(new Task("title", "desc", "category", new Date(), 5));
    expect(project.tasks.length).toBe(2);
  });

  it("should save array of projects to localStorage", () => {
    Project.save([project]);
    expect(Project.load().at(0)).toEqual(project);
  });

  it("should mark the project complete if all it's tasks are done", () => {
    expect(project.isCompleted).toBeFalsy();
    project.tasks.forEach(task => {
      task.complete();
    });
    project.complete();
    expect(project.isCompleted).toBeTruthy();
  });

  // delete
});
