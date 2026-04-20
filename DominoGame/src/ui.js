// TODOs and es6 modifications done by Stephanie Rodriguez //

// -------------------- UI --------------------
const NUMBER_OF_DOMINOS = 20;
const STARTING_LIVES = 5;
const HALF_CLEARED_COUNT = NUMBER_OF_DOMINOS / 2;

export class UI {
  constructor() {
    this.dominoElements = [];
    this.targetElement = null;
    this.statusElement = null;
  }
  cacheDominoElements() {
    this.dominoElements = [];
    for (let i = 0; i < NUMBER_OF_DOMINOS; i++) {
      this.dominoElements.push(document.getElementById(i));
    }

    this.targetElement = document.getElementById("target-domino");
    this.statusElement = document.getElementById("status");
  }
  formatDominoText({ leftPips, rightPips }) {
    return `${leftPips} | ${rightPips}`;
  }
  showAllBacks() {
    // TODO: iterate over dominoElements and show the back for each domino.
    for (let i = 0; i < NUMBER_OF_DOMINOS; i++) {
      this.showDominoBack(i);
    }
  }
  showDominoBack(index) {
    // TODO: show the back of the domino at the given index.
    const domino = this.dominoElements[index];
    domino.textContent = "";
    domino.classList.remove("removed");
    domino.classList.add("back");
  }
  showGridDominoFace(index, dominoObj) {
    // TODO: show the face of the domino at the given index.
    const domino = this.dominoElements[index];
    domino.textContent = this.formatDominoText(dominoObj);
    domino.classList.remove("back");
    domino.classList.remove("removed");
  }
  updateTarget(dominoObj) {
    this.targetElement.textContent = this.formatDominoText(dominoObj);
  }
  disableDomino(index) {
    // TODO: disable the domino at the given index.
    const domino = this.dominoElements[index];
    domino.onclick = null;
    domino.style.cursor = "default";
  }
  disableAllDominos() {
    // TODO: iterate over dominoElements and disable each domino.
    for (const domino of this.dominoElements) {
      domino.onclick = null;
      domino.style.cursor = "default";
    }
  }
  enableAllDominos(clickHandler, onlyRemaining = false) {
    for (const domino of this.dominoElements) {
      const isRemoved = domino.classList.contains("removed");
      if (!onlyRemaining || !isRemoved) {
        domino.onclick = () => clickHandler.call(domino); // Arrow function with .call(domino)
        domino.style.cursor = "pointer";
      }
    }
  }
  removeDomino(index) {
    // TODO: remove the domino at the given index from the board.
    const domino = this.dominoElements[index];
    domino.textContent = "";
    domino.classList.remove("back");
    domino.classList.add("removed");
    domino.onclick = null;
    domino.style.cursor = "default";
  }
  updateStatus(lives, removedCount, message = "") {
    // TODO: show lives, removed count, and optional message in the status element.
    let text = `Lives: ${lives} Removed: ${removedCount}/${NUMBER_OF_DOMINOS}`;
    if (message !== "") {
      text += ` | ${message}`;
    }
    this.statusElement.innerHTML = text;
  }
}