import Task from "../src/modules/Task";

// setup and teardown
let testTasks;
beforeEach(() => {
  testTasks = [
    new Task("name1", "desc", new Date(), 1),
    new Task("name2", "description", new Date(), 2),
    new Task("name3", "described", new Date(), 3),
    new Task("name4", "make video: 'how to eat donuts'", new Date(), 4),
    new Task("name5", "getting lazy", new Date(), 5),
    new Task("name6", "example desc", new Date(), 1),
  ];
});

describe(".complete instance method", () => {
  it("should set isCompleted to true", () => {
    testTasks.forEach(task => {
      expect(task.isCompleted).toBeFalsy();
      task.complete();
      expect(task.isCompleted).toBeTruthy();
    });
  });
});

describe(".delete instance method", () => {
  it("should return the modified array", () => {
    expect(testTasks.at(3).delete(testTasks)).toBeInstanceOf(Array);
  });

  it("should remove the task which calls it", () => {
    expect(testTasks.at(3).delete(testTasks).length).toBe(5);
  });
});

describe(".save static method", () => {
  it("should save a JSON array of Tasks", () => {
    Task.save(testTasks);
    const savedValue = JSON.parse(localStorage.getItem("tasks"));

    expect(savedValue).toBeInstanceOf(Array);
  });

  it("should return the array that is passed in as an argument", () => {
    expect(Task.save(testTasks)).toEqual(testTasks);
  });
});

describe(".load static method", () => {
  beforeEach(() => {
    Task.save(testTasks);
  });

  it("should return an array", () => {
    expect(Task.load()).toBeInstanceOf(Array);
  });

  test("each value in returned array is a Task", () => {
    Task.load().forEach(task => {
      expect(task).toBeInstanceOf(Task);
    });
  });
});
