export default class Project {
  constructor(
    name,
    category,
    todos = [],
    isCompleted = false,
    id = crypto.randomUUID()
  ) {
    this.name = name;
    this.category = category;
    this.todos = todos;
    this.isCompleted = isCompleted;
    this.id = id;
  }

  display() {
    console.log(
      `Name: ${this.name}\nCompleted: ${this.isCompleted}\nID: ${this.id}`
    );
  }

  complete() {
    this.isCompleted = true;
  }

  delete() {
    return Project.load().filter(project => {
      project.id !== this.id;
    });
  }

  static create(name, category) {
    return new Project(name, category);
  }

  static save(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  static load() {
    let projects = JSON.parse(localStorage.getItem("projects"));

    if (!projects) {
      this.save([]);
      return [];
    }

    return projects.forEach(project => {
      project = new Project(
        project.name,
        project.category,
        // todos aren't of class Todo right here - need to convert them
        project.todos,
        project.isCompleted,
        project.id
      );
    });
  }
}
