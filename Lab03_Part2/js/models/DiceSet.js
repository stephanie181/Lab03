import Die from "./Die.js";

export default class DiceSet {
  constructor() {
    this.dice = [];
    for (let i = 0; i < 6; i++) {
      this.dice.push(new Die());
    }

    this.hasOne = false;
    this.hasFour = false;
  }

  rollAll() {
    for (const die of this.dice) {
      die.roll();
    }
    this.evaluateDice();
  }

  evaluateDice() {
    // Reset state so it can be dynamically evaluated based on what the user currently holds.
    this.hasOne = false;
    this.hasFour = false;

    // Simply check the pool of manually held dice for the presence of our target qualifiers.
    let held1 = false;
    let held4 = false;

    for (const die of this.dice) {
      if (die.isHeld) {
        if (die.value === 1) held1 = true;
        else if (die.value === 4) held4 = true;
      }
    }

    // Apply rules strictly based on what is currently held:
    if (held1) this.hasOne = true;
    if (held4) this.hasFour = true;
  }

  // Returns true if the player has secured 1 and 4
  isQualified() {
    return this.hasOne && this.hasFour;
  }

  // Checks if the physical board contains the 1 and 4, regardless of whether the user has actually clicked to hold them yet.
  canPotentiallyQualify() {
    let hasOne = false;
    let hasFour = false;

    for (const die of this.dice) {
      if (die.value === 1) hasOne = true;
      if (die.value === 4) hasFour = true;
    }

    return hasOne && hasFour;
  }

  // Validates if the player is legally allowed to hold a newly clicked die.
  canHold(die) {
    return true;
  }

  // Validates if the player is legally allowed to un-keep a clicked die.
  canUnhold(die) {
    return true;
  }
  
// Sums the remaining dice after setting aside the qualifying 1 and 4.
  getCurrentCargoScore() {
    if (this.isQualified()) {
        let total = 0;
        let foundOne = false;
        let foundFour = false;

        for (const die of this.dice) {
            if (die.value === 1 && !foundOne) {
                foundOne = true;
            } else if (die.value === 4 && !foundFour) {
                foundFour = true;
            } else {
                total += die.value;
            }
        }
        return total;
    }
    return 0;
}
  reset() {
    this.hasOne = false;
    this.hasFour = false;

    for (const die of this.dice) {
      die.reset();
    }
  }
}
