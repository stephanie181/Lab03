// TODOs and es6 modifications done by Stephanie Rodriguez //

// -------------------- Game Logic --------------------
/**
 * Constructor pattern for creating a new domino piece.
 * @param {number} leftPips - The number of pip dots on the left.
 * @param {number} rightPips - The number of pip dots on the right.
 * @returns {void}
 */

const NUMBER_OF_DOMINOS = 20;
const STARTING_LIVES = 5;
const HALF_CLEARED_COUNT = NUMBER_OF_DOMINOS / 2;

function Domino(leftPips, rightPips) {
  this.leftPips = leftPips;
  this.rightPips = rightPips;
}

export const gameLogic = {
  dominos: [],
  currentTargetIndex: NUMBER_OF_DOMINOS,
  currentPick: -1,
  removedCount: 0,
  lives: STARTING_LIVES,
  failedPickHistory: {},

  /**
   * Initializes the dominos array with a set of dominos and one target.
   * @returns {void}
   */
  fillDominos: function () {
    // TODO: fill the dominos array with random domino objects and a starting target.
    this.dominos = [];

    for (let i = 0; i < NUMBER_OF_DOMINOS; i++) {
      const left = Math.trunc(Math.random() * 7);
      const right = Math.trunc(Math.random() * 7);
      this.dominos.push(new Domino(left, right));
    }

    let targetLeft = Math.trunc(Math.random() * 7);
    let targetRight = Math.trunc(Math.random() * 7);
    while (targetLeft + targetRight < 6 || targetLeft + targetRight > 10) {
      targetLeft = Math.trunc(Math.random() * 7);
      targetRight = Math.trunc(Math.random() * 7);
    }
    this.dominos.push(new Domino(targetLeft, targetRight));
    this.currentTargetIndex = NUMBER_OF_DOMINOS;
    this.currentPick = -1;
    this.removedCount = 0;
    this.lives = STARTING_LIVES;
    this.failedPickHistory = {};
  },

  /**
   * Randomly scrambles the order of the grid dominos.
   * @returns {void}
   */
  shuffleGridDominos: function () {
    // TODO: shuffle the grid dominos array randomly.
    for (let i = NUMBER_OF_DOMINOS - 1; i > 0; i--) {
      const randomIndex = Math.trunc(Math.random() * (i + 1));
      const temp = this.dominos[i];
      this.dominos[i] = this.dominos[randomIndex];
      this.dominos[randomIndex] = temp;
    }
  },

  /**
   * Records the user's currently selected grid domino.
   * @param {number} index - The index of the selected domino in the array.
   * @returns {void}
   */
  pickDomino: function (index) {
    // TODO: record the player's pick by setting currentPick.
    this.currentPick = index;
  },

  /**
   * Calculates the total sum of pips for a given domino.
   * @param {Object} domino - The domino object.
   * @returns {number} The sum of its left and right pips.
   */
  getTotalPips: function (domino) {
    return domino.leftPips + domino.rightPips;
  },

  /**
   * Determines whether the currently picked domino's value is higher
   * than the target domino's value.
   * @returns {boolean} True if the picked domino is higher than target, false otherwise.
   */
  isHigherThanTarget: function () {
    // TODO: return true when the picked domino total is greater than the target total.

    // did destructuring to extract pips from both the picked and target dominos
    const { leftPips: pickedLeft, rightPips: pickedRight } =
      this.dominos[this.currentPick];
    const { leftPips: targetLeft, rightPips: targetRight } =
      this.dominos[this.currentTargetIndex];
    return pickedLeft + pickedRight > targetLeft + targetRight;
  },

  /**
   * Processes a valid choice, tracks progression, and occasionally reduces the ongoing target.
   * @returns {boolean} True if the target was reduced, false if it remained the same.
   */

  // did destructuring to extract pips from the target domino
  acceptPick: function () {
    this.removedCount++;

    if (this.removedCount > HALF_CLEARED_COUNT) {
      const { leftPips: targetLeft, rightPips: targetRight } =
        this.dominos[this.currentTargetIndex];
      const targetTotal = targetLeft + targetRight;
      const reducedTargetTotal = Math.max(0, targetTotal - 1);
      const reducedLeft = Math.min(6, reducedTargetTotal);
      const reducedRight = reducedTargetTotal - reducedLeft;

      this.dominos[this.currentTargetIndex] = new Domino(
        reducedLeft,
        reducedRight
      );
      return true;
    }

    return false;
  },

  /**
   * Processes an invalid choice, managing the warning state of each incorrect pick,
   * and deducting consecutive error penalties (lives).
   * @returns {boolean} True if the player lost a life from this mistake, false otherwise.
   */
  rejectPick: function () {
    const pickIndex = this.currentPick;
    const hasFailedBefore = this.failedPickHistory[pickIndex] === true;

    if (hasFailedBefore) {
      this.lives--;
      return true;
    }

    this.failedPickHistory[pickIndex] = true;
    return false;
  },

  /**
   * Checks if all necessary game dominos have been successfully cleared.
   * @returns {boolean} True if board is cleared, false otherwise.
   */
  hasClearedBoard: function () {
    return this.removedCount === NUMBER_OF_DOMINOS;
  },

  /**
   * Checks if the player has lost all their available lives.
   * @returns {boolean} True if out of lives, false otherwise.
   */
  isOutOfLives: function () {
    return this.lives <= 0;
  },

  /**
   * Resets the player's tracked pick for the upcoming turn round.
   * @returns {void}
   */
  resetPick: function () {
    // TODO: reset currentPick to -1 for the next turn.
    this.currentPick = -1;
  },
};
