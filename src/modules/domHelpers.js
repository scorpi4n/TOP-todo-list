export function createElementWithClass(tagName, ...classNames) {
  const element = document.createElement(tagName);
  classNames.forEach(className => element.classList.add(className));

  return element;
}

export function td(innerText = "") {
  const td = document.createElement("td");
  td.innerText = innerText;

  return td;
}

export function th(innerText = "") {
  const th = document.createElement("th");
  th.innerText = innerText;

  return th;
}

export function button(innerText = "") {
  const button = document.createElement("button");
  button.innerText = innerText;

  return button;
}

export function div() {
  return document.createElement("div");
}

HTMLElement.prototype.appendChildren = function (...children) {
  children.forEach(child => this.appendChild(child));
};
