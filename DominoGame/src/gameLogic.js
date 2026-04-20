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

class Domino {
  constructor(leftPips, rightPips) {
    this.leftPips = leftPips;
    this.rightPips = rightPips;
  }
}

export class GameLogic {
  constructor() {
    this.dominos = [];
    this.currentTargetIndex = NUMBER_OF_DOMINOS;
    this.currentPick = -1;
    this.removedCount = 0;
    this.lives = STARTING_LIVES;
    this.failedPickHistory = {};
  }
  fillDominos() {
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
  }
  shuffleGridDominos() {
    // TODO: shuffle the grid dominos array randomly.
    for (let i = NUMBER_OF_DOMINOS - 1; i > 0; i--) {
      const randomIndex = Math.trunc(Math.random() * (i + 1));
      const temp = this.dominos[i];
      this.dominos[i] = this.dominos[randomIndex];
      this.dominos[randomIndex] = temp;
    }
  }
  pickDomino(index) {
    // TODO: record the player's pick by setting currentPick.
    this.currentPick = index;
  }
  getTotalPips(domino) {
    return domino.leftPips + domino.rightPips;
  }
  isHigherThanTarget() {
    // TODO: return true when the picked domino total is greater than the target total.

    // did destructuring to extract pips from both the picked and target dominos
    const { leftPips: pickedLeft, rightPips: pickedRight } =
      this.dominos[this.currentPick];
    const { leftPips: targetLeft, rightPips: targetRight } =
      this.dominos[this.currentTargetIndex];
    return pickedLeft + pickedRight > targetLeft + targetRight;
  }
  acceptPick() {
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
  }
  rejectPick() {
    const pickIndex = this.currentPick;
    const hasFailedBefore = this.failedPickHistory[pickIndex] === true;

    if (hasFailedBefore) {
      this.lives--;
      return true;
    }

    this.failedPickHistory[pickIndex] = true;
    return false;
  }
  hasClearedBoard() {
    return this.removedCount === NUMBER_OF_DOMINOS;
  }
  isOutOfLives() {
    return this.lives <= 0;
  }
  resetPick() {
    // TODO: reset currentPick to -1 for the next turn.
    this.currentPick = -1;
  }
}
