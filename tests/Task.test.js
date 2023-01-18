import Task from "../src/js/Task";

describe("test Task methods", () => {
  // setup and teardown
  let tasks;
  beforeEach(() => {
    tasks = [
      new Task("name1", "desc", "personal", new Date(), 1),
      new Task("name2", "description", "personal", new Date(), 2),
      new Task("name3", "described", "personal", new Date(), 3),
      new Task(
        "name4",
        "make video: 'how to eat donuts'",
        "personal",
        new Date(),
        4
      ),
      new Task("name5", "getting lazy", "personal", new Date(), 5),
      new Task("name6", "example desc", "personal", new Date(), 1),
    ];

    Task.save(tasks);
  });

  afterEach(() => {
    localStorage.clear();
  });

  // create
  test("create static method return value", () => {
    const result = new Task(
      "eat dinner",
      "eat with family",
      "personal",
      new Date(),
      5
    );
    expect(result instanceof Task).toBeTruthy();
  });

  // read
  test("Task.load returns array", () => {
    expect(Task.load()).toBeInstanceOf(Array);
    localStorage.clear();
    expect(Task.load()).toBeInstanceOf(Array);
  });

  // update
  it("should save an array of Tasks", () => {
    Task.save(tasks);
    expect(Task.load()).toEqual(tasks);
  });

  it("should set isCompleted to true", () => {
    tasks.at(3).complete();
    Task.save(tasks);
    expect(Task.load().at(3).isCompleted).toBeTruthy();
  });

  // delete
  it("should remove the task", () => {
    Task.load().at(2).delete();
    tasks.splice(2, 1);
    expect(Task.load()).toEqual(tasks);
  });
});
