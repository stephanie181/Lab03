// TODOs and es6 modifications done by Stephanie Rodriguez //

// -------------------- UI --------------------
const NUMBER_OF_DOMINOS = 20;
const STARTING_LIVES = 5;
const HALF_CLEARED_COUNT = NUMBER_OF_DOMINOS / 2;

export const ui = {
  dominoElements: [],
  targetElement: null,
  statusElement: null,

  /**
   * Finds and stores references to key UI elements like dominos, target element, and status.
   * @returns {void}
   */
  cacheDominoElements: function () {
    this.dominoElements = [];
    for (let i = 0; i < NUMBER_OF_DOMINOS; i++) {
      this.dominoElements.push(document.getElementById(i));
    }

    this.targetElement = document.getElementById("target-domino");
    this.statusElement = document.getElementById("status");
  },

  /**
   * Formats the domino object into a string visualization.
   * @param {Object} domino - The domino object.
   * @returns {string} The text format showing both side pips, separated by |.
   */
  // did destructuring - extract leftPips, rightPips from domino parameter
  // made the return into a template literal
  formatDominoText: function ({ leftPips, rightPips }) {
    return `${leftPips} | ${rightPips}`;
  },

  /**
   * Iterates over dominoElements and shows their back faces.
   * @returns {void}
   */
  showAllBacks: function () {
    // TODO: iterate over dominoElements and show the back for each domino.
    for (let i = 0; i < NUMBER_OF_DOMINOS; i++) {
      this.showDominoBack(i);
    }
  },

  /**
   * Restores a specific domino to show its backside (face down).
   * @param {number} index - The dominos array index indicating the element to process.
   * @returns {void}
   */
  showDominoBack: function (index) {
    // TODO: show the back of the domino at the given index.
    const domino = this.dominoElements[index];
    domino.textContent = "";
    domino.classList.remove("removed");
    domino.classList.add("back");
  },

  /**
   * Unveils the face (pips) of a specific domino block.
   * @param {number} index - The dominos array index mapping to its element.
   * @param {Object} dominoObj - The relevant domino's data holding pips.
   * @returns {void}
   */
  showGridDominoFace: function (index, dominoObj) {
    // TODO: show the face of the domino at the given index.
    const domino = this.dominoElements[index];
    domino.textContent = this.formatDominoText(dominoObj);
    domino.classList.remove("back");
    domino.classList.remove("removed");
  },

  /**
   * Refreshes the display text of the master target domino.
   * @param {Object} dominoObj - The current target domino object containing the pips.
   * @returns {void}
   */
  updateTarget: function (dominoObj) {
    this.targetElement.textContent = this.formatDominoText(dominoObj);
  },

  /**
   * Restricts interactivity and click behavior on a particular domino UI component.
   * @param {number} index - The specific array index mapping to the domino element.
   * @returns {void}
   */
  disableDomino: function (index) {
    // TODO: disable the domino at the given index.
    const domino = this.dominoElements[index];
    domino.onclick = null;
    domino.style.cursor = "default";
  },

  /**
   * Iterates through domino elements, globally locking their interactions (clicks).
   * @returns {void}
   */
  disableAllDominos: function () {
    // TODO: iterate over dominoElements and disable each domino.
    for (const domino of this.dominoElements) {
      domino.onclick = null;
      domino.style.cursor = "default";
    }
  },

  /**
   * Reactivates clicking and interactions for various DOM domino elements based on their status.
   * @param {Function} clickHandler - The function event attached onto onclick callbacks.
   * @param {boolean} onlyRemaining - If false, all elements activate; otherwise only non-removed elements are re-enabled. Defaults to false.
   * @returns {void}
   */
  enableAllDominos: function (clickHandler, onlyRemaining = false) {
    for (const domino of this.dominoElements) {
      const isRemoved = domino.classList.contains("removed");
      if (!onlyRemaining || !isRemoved) {
        domino.onclick = () => clickHandler.call(domino); // Arrow function with .call(domino)
        domino.style.cursor = "pointer";
      }
    }
  },

  /**
   * Hides and disables a correctly selected grid domino element completely.
   * @param {number} index - The element's index corresponding to its placement on the board.
   * @returns {void}
   */

  removeDomino: function (index) {
    // TODO: remove the domino at the given index from the board.
    const domino = this.dominoElements[index];
    domino.textContent = "";
    domino.classList.remove("back");
    domino.classList.add("removed");
    domino.onclick = null;
    domino.style.cursor = "default";
  },

  /**
   * Renders UI diagnostic indicators about lives tracking, completed levels, and alert messaging to players.
   * @param {number} lives - Current amount of active lives remaining.
   * @param {number} removedCount - Count tracking the dominos already correctly destroyed/cleared.
   * @param {string} message - An optional message logging info (e.g. user win). Defaults to empty string.
   * @returns {void}
   */

  // added 2 template literals for let text, and text +=
  updateStatus: function (lives, removedCount, message = "") {
    // TODO: show lives, removed count, and optional message in the status element.
    let text = `Lives: ${lives} Removed: ${removedCount}/${NUMBER_OF_DOMINOS}`;
    if (message !== "") {
      text += ` | ${message}`;
    }
    this.statusElement.innerHTML = text;
  },
};
