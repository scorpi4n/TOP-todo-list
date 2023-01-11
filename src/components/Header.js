export default function () {
  const headerEl = document.createElement("header");

  const navEl = document.createElement("nav");
  headerEl.appendChild(navEl);

  return headerEl;
}
