import { useEffect } from "react";
import {createInitialValueHistory, initiateEasyPuzzle} from "../../helpers/functions";

function LogicListeners({ difficulty, hasStarted, setHasStarted, valueHistory, setValueHistory }) {
	// const difficulties = [
  //   "custom",
  //   "easy",
  //   "medium",
  //   "hard",
  //   "very hard",
  //   "challenge",
  //   "extreme",
  //   "epic",
  // ];
  useEffect(() => {
    switch (difficulty) {
			case "custom" : {
				setValueHistory(createInitialValueHistory());
				console.log('custom difficulty')
				break;
			};
			case "easy" : {
				setValueHistory(initiateEasyPuzzle())
				console.log('easy difficulty')
				break;
			}
			default : {
				setValueHistory(createInitialValueHistory())
			}
		}
  }, [difficulty]);

  return null;
}

export default LogicListeners;
