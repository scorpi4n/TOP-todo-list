export default function (title, ...dropdownItems) {
  const dropdownEl = document.createElement("div");
  dropdownEl.classList.add("dropdown");

  const buttonEl = document.createElement("button");
  const titleEl = document.createElement("p");
  titleEl.innerText = title;
  buttonEl.appendChild(titleEl);
  buttonEl.addEventListener("click", () => {
    dropdownEl.classList.toggle("active");
  });

  const listEl = document.createElement("ul");
  dropdownItems.forEach(item => {
    const itemEl = document.createElement("li");
    itemEl.innerText = item;

    listEl.appendChild(itemEl);
  });

  dropdownEl.appendChild(buttonEl);
  dropdownEl.appendChild(listEl);

  return dropdownEl;
}
