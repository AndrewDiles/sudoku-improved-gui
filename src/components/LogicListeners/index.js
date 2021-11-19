import { useState, useEffect } from "react";
import {
  condenseInitialValueHistoryForCustomGame,
  testIfCellsContainAContradiction,
  testIfSolutionIsFound,
	calculateValuePotentials,
} from "../../helpers/functions";
import {getInitialPuzzleSetup} from "../../helpers/logicListenerFunctions";

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
	solverOptionsOpen,
	setSolverOptionsOpen,
	setSolverPotentials,
}) {
	const [hasLoaded, setHasLoaded] = useState(false);
	useEffect(()=>{
		setHasLoaded(true)
	},[])
  useEffect(() => {
		setValueHistory(getInitialPuzzleSetup(difficulty))
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
	useEffect(()=>{
		if (hasStarted && solverOptionsOpen) {
			setSolverPotentials(calculateValuePotentials(valueHistory[placeInHistory]))
		}
	},[hasStarted, solverOptionsOpen, placeInHistory, valueHistory])

  return null;
}

export default LogicListeners;
