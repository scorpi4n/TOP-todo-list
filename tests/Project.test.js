import Project from "../src/modules/Project";
import Task from "../src/modules/Task";

// setup and teardown
let testProject;
beforeEach(() => {
  testProject = new Project("project1");

  Task.save([
    new Task("name1", "desc", new Date(), 5, "project1"),
    new Task("name2", "description", new Date(), 3, "project1"),
  ]);
});

describe(".complete instance method", () => {
  it("should mark not the project complete", () => {
    testProject.complete();
    expect(testProject.isCompleted).toBeFalsy();
  });

  it("should mark the project complete", () => {
    const completedTasks = Task.load().map(task => task.complete());
    Task.save(completedTasks);
    Task.load().forEach(task => console.log(task.isCompleted));

    testProject.complete();
    expect(testProject.isCompleted).toBeTruthy();
  });
});

describe(".delete instance method", () => {
  beforeEach(() => Project.save([testProject]));

  it("should remove the project from localStorage", () => {
    testProject.delete();
    expect(JSON.parse(localStorage.getItem("projects"))).toHaveLength(0);
  });

  it("should return the deleted project", () => {
    expect(testProject.delete()).toEqual(testProject);
  });
});

// describe(".addTask instance method", () => {
//   it("should ", () => {});
// });

// describe(".save static method", () => {
//   it("should ", () => {});
// });

// describe(".load static method", () => {
//   it("should ", () => {});
// });
