import dropdown from "./components/Dropdown";
import "./scss/style.scss";

const wrapper = document.querySelector("nav div");

wrapper.appendChild(
  dropdown("Projects", "Migrate database", "Build dream house")
);
wrapper.appendChild(dropdown("Categories", "Personal", "Work"));
