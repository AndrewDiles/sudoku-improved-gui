import { useEffect } from "react";
import {
  createInitialValueHistory,
  initiateEasyPuzzle,
  initiateMediumPuzzle,
  initiateHardPuzzle,
  initiateVeryHardPuzzle,
  initiateChallengePuzzle,
  initiateExtremePuzzle,
  initiateEpicPuzzle,
} from "../../helpers/functions";

function LogicListeners({
  difficulty,
  hasStarted,
  setHasStarted,
  valueHistory,
  setValueHistory,
}) {
  // const difficulties = [
  //   "very hard",
  //   "challenge",
  //   "extreme",
  //   "epic",
  // ];
  useEffect(() => {
    switch (difficulty) {
      case "custom": {
        setValueHistory(createInitialValueHistory());
        break;
      }
      case "easy": {
        setValueHistory(initiateEasyPuzzle());
        break;
      }
      case "medium": {
        setValueHistory(initiateMediumPuzzle());
        break;
      }
      case "hard": {
        setValueHistory(initiateHardPuzzle());
        break;
      }
      case "very hard": {
        setValueHistory(initiateVeryHardPuzzle());
        break;
      }
      case "challenge": {
        setValueHistory(initiateChallengePuzzle());
        break;
      }
      case "extreme": {
        setValueHistory(initiateExtremePuzzle());
        break;
      }
      case "epic": {
        setValueHistory(initiateEpicPuzzle());
        break;
      }
      default: {
        setValueHistory(createInitialValueHistory());
      }
    }
  }, [difficulty]);

  return null;
}

export default LogicListeners;
