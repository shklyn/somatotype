function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function rgbToHex(rgbColor) {
  const rgbValues = rgbColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (rgbValues) {
    const r = parseInt(rgbValues[1], 10).toString(16).padStart(2, "0");
    const g = parseInt(rgbValues[2], 10).toString(16).padStart(2, "0");
    const b = parseInt(rgbValues[3], 10).toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
  }
  return rgbColor;
}

function addDot(event) {
  event.preventDefault();
  const ek = parseFloat(ekEl.value);
  const m = parseFloat(mEl.value);
  const en = parseFloat(enEl.value);
  const x = ek - en;
  const y = 2 * m - (en + ek);
  const dot = document.createElement("span");
  dot.className = "dot";
  const color = getRandomHexColor();
  dot.style.backgroundColor = color;
  dot.id = color;
  dot.style.top = `${366 - y * 22}px`;
  dot.style.left = `${300 + x * 36}px`;
  graph.append(dot);
  console.log(x);
  console.log(y);

  const dotListEl = document.createElement("li");
  dotListEl.className = "dot-list-element";
  dotListEl.innerHTML = markupDot(en, m, ek, color);
  dotsList.append(dotListEl);
  dotListEl.lastChild.addEventListener("click", deleteDot);
}

function deleteDot(e) {
  const deleteColor = rgbToHex(
    e.currentTarget.parentNode.firstElementChild.style.backgroundColor
  );
  graph.querySelector(`[id='${deleteColor}']`).remove();
  e.currentTarget.parentNode.remove();
}

const form = document.querySelector(".search-form");
const dotsList = document.querySelector(".dots-list");
const graph = document.querySelector(".graph-wrap");
const ekEl = document.querySelector("[name = EK]");
const mEl = document.querySelector("[name = M]");
const enEl = document.querySelector("[name = EN]");

form.addEventListener("submit", addDot);

function markupDot(en, m, ek, color) {
  return `
      <span class="dot-color" style="background-color: ${color}"></span>
      <ul class="dot-meta-list">
        <li class="dot-meta">
          <p class="dot-meta-text">EK = ${ek}</p>
        </li>
        <li class="dot-meta">
          <p class="dot-meta-text">M = ${m}</p>
        </li>
        <li class="dot-meta">
          <p class="dot-meta-text">EN = ${en}</p>
        </li>
      </ul>
      <button class="delete-dot-btn">
        <img src="./images/bin.svg" alt="icon" width="20px" height="20px" />
      </button>`;
}
