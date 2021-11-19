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
} from "./functions";

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

export {
  getInitialPuzzleSetup,
}