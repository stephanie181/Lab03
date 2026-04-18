import DiceSet from "./DiceSet.js";
import Player from "./Player.js";

export default class Game {
  constructor() {
    this.players = [];
    this.currentPlayerIndex = 0;

    this.diceSet = new DiceSet();

    this.isGameOver = false;

    // Initialize turn-specific state properties
    this.resetTurnState();
  }

  startNewGame(playerNames) {
    this.players = [];
    for (const name of playerNames) {
      this.players.push(new Player(name));
    }

    this.currentPlayerIndex = 0;
    this.isGameOver = false;
    this.resetTurnState();
  }

  resetTurnState() {
    this.hasRolled = false;
    this.diceSet.reset();
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  rollDice() {
    if (!this.isTurnOver()) {
      this.diceSet.rollAll();
      this.hasRolled = true;
    }
  }

  // Helper methods to abstract end-of-turn game states away from the UI
 // The turn is over when all 6 dice are held.
  isTurnOver() {
    let heldCount = 0;
    for (const die of this.diceSet.dice) {
      if (die.isHeld) {
        heldCount++;
      }
    }
    return heldCount === 6;
  }

// Midnight doesn't really have a bust condition, but a player who ends with no 1 or 4 just scores 0
  hasBusted() {
    return false;
}

  endTurn() {
    // Save score for current player via its setter to respect encapsulation.
    const currentPlayer = this.getCurrentPlayer();
    currentPlayer.setScore(this.diceSet.getCurrentCargoScore());

    // Advance to next player or end game
    this.currentPlayerIndex++;
    if (this.currentPlayerIndex >= this.players.length) {
      this.isGameOver = true;
    } else {
      this.resetTurnState();
    }
  }

  getWinners() {
    if (!this.isGameOver) return [];

    let maxScore = -1;
    let winners = [];

    // Loop through all players to find the highest score.
    // We push to an array instead of just saving one player because ties are possible
    // and we want to return all players who share the top score.
    for (const player of this.players) {
      if (player.score > maxScore) {
        maxScore = player.score;
        winners = [player];
      } else if (player.score === maxScore) {
        winners.push(player);
      }
    }
    return winners;
  }
}
