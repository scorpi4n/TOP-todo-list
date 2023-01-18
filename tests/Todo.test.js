import Task from "../src/js/Task";

describe("test Task methods", () => {
  // setup and teardown
  let tasks;
  beforeEach(() => {
    tasks = [
      Task.create("name1", "desc", "personal", new Date(), 1),
      Task.create("name2", "description", "personal", new Date(), 2),
      Task.create("name3", "described", "personal", new Date(), 3),
      Task.create(
        "name4",
        "make video: 'how to eat donuts'",
        "personal",
        new Date(),
        4
      ),
      Task.create("name5", "getting lazy", "personal", new Date(), 5),
      Task.create("name6", "example desc", "personal", new Date(), 1),
    ];

    Task.save(tasks);
  });

  afterEach(() => {
    localStorage.clear();
  });

  // create
  test("create static method return value", () => {
    const result = Task.create(
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
    Task.load()[2].delete();
    tasks.splice(2, 1);
    expect(Task.load()).toEqual(tasks);
  });
});
