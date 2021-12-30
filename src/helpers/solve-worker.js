import {
  duplicate,
  attemptToSolvePuzzleWithoutGuessing,
  generatePotentialGuessesArray,
  updateValuePotentials,
  testIfPotentialsContainsAContradiction,
  testIfSolutionIsFoundInPotentials,
} from "./functions";

const solvePuzzle = (potentialsArray) => {
  let activePotentialsArray = duplicate(potentialsArray);
  let newInfoFound = false;
  let contradictionFound = null;
  let isSolved = null;
  for (let testLevel = 1; testLevel < 4; testLevel++) {
    if (testLevel === 1) {
      let logicResults = attemptToSolvePuzzleWithoutGuessing(
        activePotentialsArray
      );
      activePotentialsArray = logicResults.potentialsArray;
      newInfoFound = logicResults.newInfoFound;
      contradictionFound = logicResults.contradictionFound;
      isSolved = logicResults.isSolved;
      if (contradictionFound || isSolved) {
        return {
          potentialsArray: activePotentialsArray,
          newInfoFound,
          contradictionFound,
          isSolved,
        };
      }
    } else if (testLevel === 2) {
      // guess 1 deep
      console.log("guess of one depth");
      let newInfoFoundWithinGuess = false;
      for (let i = 0; i < 81; i++) {
        if (!activePotentialsArray[i].solved) {
          let potentialGuesses = generatePotentialGuessesArray(
            activePotentialsArray[i].potentials
          );
          // potentials: ["", null, null, null, null, null, null, null, null, null],
          let singleGuessPotentialsArray = duplicate(activePotentialsArray);
          for (
            let guessIndex = 0;
            guessIndex < potentialGuesses.length;
            guessIndex++
          ) {
            singleGuessPotentialsArray[i].solved = potentialGuesses[guessIndex];
            singleGuessPotentialsArray[i].containsNewInformation = true;
            let updatedSingleGuessPotentialsArray = updateValuePotentials(
              singleGuessPotentialsArray
            );
            updatedSingleGuessPotentialsArray[i].containsNewInformation = false;
            let logicResults = attemptToSolvePuzzleWithoutGuessing(
              updatedSingleGuessPotentialsArray
            );
            contradictionFound = logicResults.contradictionFound;
            isSolved = logicResults.isSolved;
            if (logicResults.contradictionFound && !logicResults.isSolved) {
              // console.log(`Contradiction in guess resulted in progress.  Cell ${i} can't be ${potentialGuesses[guessIndex]}`)
              activePotentialsArray[i].potentials[
                potentialGuesses[guessIndex]
              ] = false;
              activePotentialsArray[i].containsNewInformation = true;
              activePotentialsArray = updateValuePotentials(
                activePotentialsArray
              );
              activePotentialsArray[i].containsNewInformation = false;
              i += 81;
              newInfoFoundWithinGuess = true;
              break;
            } else if (logicResults.isSolved) {
              return {
                potentialsArray: logicResults.potentialsArray,
                newInfoFound: logicResults.newInfoFound,
                contradictionFound: logicResults.contradictionFound,
                isSolved: logicResults.isSolved,
              };
            } else {
              singleGuessPotentialsArray = duplicate(activePotentialsArray);
            }
          }
        }
      }
      if (newInfoFoundWithinGuess) {
        testLevel = 0;
      }
    } else if (testLevel === 3) {
      // guess 2 deep
      console.log("guess of two depths");
      let newInfoFoundWithinGuess = false;
      for (let i = 0; i < 81; i++) {
        if (!activePotentialsArray[i].solved) {
          let potentialOuterGuesses = generatePotentialGuessesArray(
            activePotentialsArray[i].potentials
          );
          let singleGuessPotentialsArray = duplicate(activePotentialsArray);
          for (
            let outerGuessIndex = 0;
            outerGuessIndex < potentialOuterGuesses.length;
            outerGuessIndex++
          ) {
            singleGuessPotentialsArray[i].solved =
              potentialOuterGuesses[outerGuessIndex];
            singleGuessPotentialsArray[i].containsNewInformation = true;
            let updatedSingleGuessPotentialsArray = updateValuePotentials(
              singleGuessPotentialsArray
            );
            updatedSingleGuessPotentialsArray[i].containsNewInformation = false;
            for (let j = 0; j < 81; j++) {
              if (!singleGuessPotentialsArray[j].solved && i !== j) {
                let potentialInnerGuesses = generatePotentialGuessesArray(
                  singleGuessPotentialsArray[j].potentials
                );
                let secondGuessPotentialsArray = duplicate(
                  singleGuessPotentialsArray
                );
                for (
                  let innerGuessIndex = 0;
                  innerGuessIndex < potentialInnerGuesses.length;
                  innerGuessIndex++
                ) {
                  secondGuessPotentialsArray[j].solved =
                    potentialInnerGuesses[innerGuessIndex];
                  secondGuessPotentialsArray[j].containsNewInformation = true;
                  let updatedSecondGuessPotentialsArray = updateValuePotentials(
                    singleGuessPotentialsArray
                  );
                  updatedSecondGuessPotentialsArray[
                    j
                  ].containsNewInformation = false;
                  let logicResults = attemptToSolvePuzzleWithoutGuessing(
                    updatedSecondGuessPotentialsArray
                  );
                  contradictionFound = logicResults.contradictionFound;
                  isSolved = logicResults.isSolved;
                  if (
                    logicResults.contradictionFound &&
                    !logicResults.isSolved
                  ) {
                    console.log(
                      `Contradiction in 2nd guess resulted in progress.  Cell ${i} can't be ${potentialOuterGuesses[outerGuessIndex]}`
                    );
                    activePotentialsArray[i].potentials[
                      potentialOuterGuesses[outerGuessIndex]
                    ] = false;
                    activePotentialsArray[i].containsNewInformation = true;
                    activePotentialsArray = updateValuePotentials(
                      activePotentialsArray
                    );
                    activePotentialsArray[i].containsNewInformation = false;
                    i += 81;
                    j += 81;
                    outerGuessIndex += 10;
                    newInfoFoundWithinGuess = true;
                    break;
                  } else if (logicResults.isSolved) {
                    return {
                      potentialsArray: logicResults.potentialsArray,
                      newInfoFound: logicResults.newInfoFound,
                      contradictionFound: logicResults.contradictionFound,
                      isSolved: logicResults.isSolved,
                    };
                  } else {
                    secondGuessPotentialsArray = duplicate(
                      activePotentialsArray
                    );
                  }
                }
              }
            }
          }
          if (newInfoFoundWithinGuess) {
            testLevel = 0;
          }
        }
      }
    }
  }
  contradictionFound = testIfPotentialsContainsAContradiction(
    activePotentialsArray
  );
  isSolved = testIfSolutionIsFoundInPotentials(activePotentialsArray);
  return {
    potentialsArray: activePotentialsArray,
    newInfoFound,
    contradictionFound,
    isSolved,
  };
};

// onmessage = (e) => {
// 	console.log({e})
//   // const { potentialsArray } = e.data;
//   // const startTime = new Date().getTime();
//   // const solution = solvePuzzle(potentialsArray);
//   // postMessage({
//   //   potentialsArray: solution.potentialsArray,
//   //   newInfoFound: solution.newInfoFound,
//   //   contradictionFound: solution.contradictionFound,
//   //   isSolved: solution.isSolved,
//   //   time: new Date().getTime() - startTime,
//   // });
// };
postMessage = (e) => {
	console.log({e})
  // const { potentialsArray } = e.data;
  // const startTime = new Date().getTime();
  // const solution = solvePuzzle(potentialsArray);
  // onmessage({
  //   potentialsArray: solution.potentialsArray,
  //   newInfoFound: solution.newInfoFound,
  //   contradictionFound: solution.contradictionFound,
  //   isSolved: solution.isSolved,
  //   time: new Date().getTime() - startTime,
  // });
};

export default solvePuzzle;
