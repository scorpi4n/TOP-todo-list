// import dropdown from "./components/dropdown";
import task from "./components/task";
import { navbar, tasks } from "./modules/domElements";
import "./scss/style.scss";

navbar;
// navbar.appendChild(
//   dropdown("Projects", "Migrate database", "Build dream house")
// );

tasks.appendChildren(
  task("name", new Date()),
  task("NAME", new Date()),
  task("not v creative", new Date()),
  task(":3", new Date())
);
