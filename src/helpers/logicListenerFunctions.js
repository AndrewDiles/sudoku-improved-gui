import {
  createInitialValueHistory,
  initiateEasyPuzzle,
  initiateMediumPuzzle,
  initiateHardPuzzle,
  initiateVeryHardPuzzle,
  initiateChallengePuzzle,
  initiateExtremePuzzle,
  initiateEpicPuzzle,
  initiateSolvedPuzzle,
} from "./puzzleInitialization";

function getInitialPuzzleSetup(difficulty) {
  switch (difficulty) {
    case "custom": {
      return createInitialValueHistory();
    }
    case "easy": {
      return initiateEasyPuzzle();
    }
    case "medium": {
      return initiateMediumPuzzle();
    }
    case "hard": {
      return initiateHardPuzzle();
    }
    case "very hard": {
      return initiateVeryHardPuzzle();
    }
    case "challenge": {
      return initiateChallengePuzzle();
    }
    case "extreme": {
      return initiateExtremePuzzle();
    }
    case "epic": {
      return initiateEpicPuzzle();
    }
    case "solved-test": {
      return initiateSolvedPuzzle();
    }
    default: {
      return createInitialValueHistory();
    }
  }
}
function condenseInitialValueHistoryForCustomGame(valueHistory) {
  return [[...valueHistory[valueHistory.length - 1]]];
}

export {
  getInitialPuzzleSetup,
	condenseInitialValueHistoryForCustomGame,
}