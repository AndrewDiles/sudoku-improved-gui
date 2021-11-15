import { useState, useEffect } from "react";
import {
  createInitialValueHistory,
  initiateEasyPuzzle,
  initiateMediumPuzzle,
  initiateHardPuzzle,
  initiateVeryHardPuzzle,
  initiateChallengePuzzle,
  initiateExtremePuzzle,
  initiateEpicPuzzle,
  // initiateSolvedPuzzle,
  condenseInitialValueHistoryForCustomGame,
  testIfCellsContainAContradiction,
  testIfSolutionIsFound,
} from "../../helpers/functions";

function LogicListeners({
  difficulty,
	setDifficulty,
  hasStarted,
  setHasStarted,
  valueHistory,
  setValueHistory,
  placeInHistory,
  setPlaceInHistory,
  contradictionExists,
  setContradictionExists,
  setIsSolved,
	setSolverOptionsOpen,
}) {
	const [hasLoaded, setHasLoaded] = useState(false);
	useEffect(()=>{
		setHasLoaded(true)
	},[])
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
      // case "solved-test": {
      //   setValueHistory(initiateSolvedPuzzle());
      //   break;
      // }
      default: {
        setValueHistory(createInitialValueHistory());
      }
    }
  }, [difficulty]);
  useEffect(() => {
		if (!hasLoaded) return;
    if (hasStarted && difficulty === "custom") {
      setValueHistory(condenseInitialValueHistoryForCustomGame(valueHistory));
      setPlaceInHistory(0);
      console.log(valueHistory);
    } else if (!hasStarted) {
			setDifficulty(null);
			setPlaceInHistory(0);
			setContradictionExists(false);
			setIsSolved(false);
			setSolverOptionsOpen(false);
		}
  }, [hasStarted]);

  useEffect(() => {
    setContradictionExists(
      testIfCellsContainAContradiction(valueHistory[placeInHistory])
    );
    if (contradictionExists) {
      setIsSolved(false);
    } else {
      setIsSolved(testIfSolutionIsFound(valueHistory[placeInHistory]));
    }
  }, [valueHistory, placeInHistory]);

  return null;
}

export default LogicListeners;
