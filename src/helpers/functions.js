import { createInitialCurrentPotentials } from "./puzzleInitialization";
function duplicate(object) {
  return typeof object === "object"
    ? JSON.parse(JSON.stringify(object))
    : object;
}

function getFirstCellNumberOfBlock(blockNumber) {
  switch (blockNumber) {
    case 1:
      return 0;
    case 2:
      return 3;
    case 3:
      return 6;
    case 4:
      return 27;
    case 5:
      return 30;
    case 6:
      return 33;
    case 7:
      return 54;
    case 8:
      return 57;
    case 9:
      return 60;
    default: {
      console.log(`invalid block number: ${blockNumber}`);
      return 0;
    }
  }
}

// function testArrayEquivalence(arr1, arr2) {
//   for (let i1 = 0; i1 < arr1.length; i1++) {
//     for (let i2 = 0; i2 < arr2.length; i2++) {
//       if (arr1[i1] !== arr2[i2]) return false;
//     }
//   }
//   return true;
// }

function returnCellNumberGivenInitial(initial, cellNumber) {
  switch (cellNumber) {
    case 1:
      return initial;
    case 2:
      return initial + 1;
    case 3:
      return initial + 2;
    case 4:
      return initial + 9;
    case 5:
      return initial + 10;
    case 6:
      return initial + 11;
    case 7:
      return initial + 18;
    case 8:
      return initial + 19;
    case 9:
      return initial + 20;
  }
}

function resolveSelectedCellNumberFromBlockNumberAndCellNumber(
  blockNumber,
  cellNumber
) {
  return returnCellNumberGivenInitial(
    getFirstCellNumberOfBlock(blockNumber),
    cellNumber
  );
}
function resolveCellNumberFromRowAndColumnNumber(columnNumber, rowNumber) {
  return (rowNumber - 1) * 9 + columnNumber - 1;
}
function returnIfAllCellsInBlockHaveValues(startingCellNumber, cellArray) {
  let row = 1;
  let col = 1;
  let testCellNumber = startingCellNumber;

  for (col = 1; col < 4; col++) {
    for (row = 1; row < 4; row++) {
      // console.log(`testing cellNumber ${testCellNumber}`)
      if (!cellArray[testCellNumber]) {
        return false;
      }
      testCellNumber++;
    }
    testCellNumber += 6;
  }
  return true;
}
function resolveIsRealtedToSelectedCellNumber(
  selectedCellNumber,
  blockNumber,
  cellNumber
) {
  const cellNumberBeingTested =
    resolveSelectedCellNumberFromBlockNumberAndCellNumber(
      blockNumber,
      cellNumber
    );
  if (cellNumberBeingTested === selectedCellNumber) return false;
  // Test if in same row:
  if (
    Math.floor(cellNumberBeingTested / 9) === Math.floor(selectedCellNumber / 9)
  )
    return true;
  // Test if in same column
  if (cellNumberBeingTested % 9 === selectedCellNumber % 9) return true;
  // Test if in same block
  if (blockNumber === extractBlockNumberFromCellNumber(selectedCellNumber))
    return true;
  return false;
}

function calculateIfBlockIsSolved(blockNumber, cellArray) {
  return returnIfAllCellsInBlockHaveValues(
    getFirstCellNumberOfBlock(blockNumber),
    cellArray
  );
}

// function setArrayForGivens(
//   setfunctionOngoing,
//   valueHistory,
//   currentPotentials,
//   setCurrentPotentials
// ) {
//   setfunctionOngoing(true);
//   let replacementCurrentPotentials = duplicate(currentPotentials);
//   valueHistory[0].forEach((value, index) => {
//     if (value) {
//       replacementCurrentPotentials.solved = true;
//       for (let i = 1; i < 10; i++) {
//         i === value
//           ? (replacementCurrentPotentials.potentials[i] = true)
//           : (replacementCurrentPotentials.potentials[i] = false);
//       }
//     }
//   });
//   setCurrentPotentials(replacementCurrentPotentials);
//   setfunctionOngoing(false);
// }
function testIfCellsContainAContradiction(cellArray) {
  let contradictionFound = false;
  for (let i = 0; i < 81; i++) {
    if (cellArray[i]) {
      contradictionFound = testRowForContradiction(cellArray, i);
      if (contradictionFound) {
        return contradictionFound;
      }
      contradictionFound = testColumnForContradiction(cellArray, i);
      if (contradictionFound) {
        return contradictionFound;
      }
      contradictionFound = testBlockForContradiction(cellArray, i);
      if (contradictionFound) {
        return contradictionFound;
      }
    }
  }
  return contradictionFound;
}
function testRowForContradiction(cellArray, cellNumber) {
  let rowNumber = Math.ceil((cellNumber + 1) / 9);
  let startingCellNumber = (rowNumber - 1) * 9;
  for (let i = startingCellNumber; i < startingCellNumber + 9; i++) {
    if (cellNumber !== i) {
      if (cellArray[cellNumber] === cellArray[i]) {
        return true;
      }
    }
  }
  return false;
}
function testColumnForContradiction(cellArray, cellNumber) {
  let colNumber = (cellNumber % 9) + 1;
  let startingCellNumber = colNumber - 1;
  for (let i = startingCellNumber; i < startingCellNumber + 72; i += 9) {
    if (cellNumber !== i) {
      if (cellArray[cellNumber] === cellArray[i]) {
        return true;
      }
    }
  }
  return false;
}
function createCellNumbersForBlockArray(startingCell) {
  let result = [];
  let row = 1;
  let col = 1;
  for (let i = 1; i < 10; i++) {
    result.push(startingCell + (col - 1) + 9 * (row - 1));
    if (col < 3) {
      col++;
    } else {
      row++;
      col = 1;
    }
  }
  return result;
}

function testBlockForContradiction(cellArray, cellNumber) {
  let blockNumber = extractBlockNumberFromCellNumber(cellNumber);
  let blockCellNumbers = [];
  blockCellNumbers.push(
    ...createCellNumbersForBlockArray(getFirstCellNumberOfBlock(blockNumber))
  );
  for (let i = 0; i < blockCellNumbers.length; i++) {
    if (cellNumber !== blockCellNumbers[i]) {
      if (cellArray[cellNumber] === cellArray[blockCellNumbers[i]]) {
        // console.log(
        //   "match between cells numbers: ",
        //   cellNumber,
        //   " and ",
        //   blockCellNumbers[i],
        //   " with value of ",
        //   cellArray[i]
        // );
        return true;
      }
    }
  }
  return false;
}
function extractBlockNumberFromCellNumber(cellNumber) {
  let incrementedTripletBatchNumber = 1;
  let rowNumber = 1;
  for (let maxCellNumber = 3; maxCellNumber <= 81; maxCellNumber += 3) {
    if (cellNumber < maxCellNumber) {
      return (
        incrementedTripletBatchNumber + 3 * Math.floor((rowNumber - 1) / 3)
      );
    } else {
      if (incrementedTripletBatchNumber < 3) {
        incrementedTripletBatchNumber++;
      } else {
        incrementedTripletBatchNumber = 1;
        rowNumber++;
      }
    }
  }
  return 9;
}

function testIfSolutionIsFound(cellArray) {
  for (let i = 0; i < 81; i++) {
    if (!cellArray[i]) {
      return false;
    }
  }
  return true;
}
function testIfSolutionIsFoundInPotentials(potentialArray) {
  for (let i = 0; i < 81; i++) {
    if (!potentialArray[i].solved) {
      return false;
    }
  }
  return true;
}
function formCellsArrayFromPotentialsArray(potentialArray) {
  let result = [];
  for (let i = 0; i < 81; i++) {
    result.push(potentialArray[i].solved);
  }
  return result;
}
function testIfPotentialsContainsAContradiction(potentialArray) {
  let cellArray = formCellsArrayFromPotentialsArray(potentialArray);
  return testIfCellsContainAContradiction(cellArray);
}
function formPotentialsArrayForKnown(knownValue) {
  let result = [""];
  for (let i = 1; i < 10; i++) {
    if (i !== knownValue) {
      result.push(false);
    } else {
      result.push(true);
    }
  }
  return result;
}
function applyKnownValues(potentialArray, cellArray) {
  for (let i = 0; i < 81; i++) {
    if (cellArray[i]) {
      potentialArray[i].solved = cellArray[i];
      potentialArray[i].potentials = formPotentialsArrayForKnown(cellArray[i]);
    }
  }
  return potentialArray;
}
function applyNewKnownValuesFromPotentials(potentialArray) {
  for (let i = 0; i < 81; i++) {
    if (potentialArray[i].containsNewInformation && potentialArray[i].solved) {
      potentialArray[i].potentials = formPotentialsArrayForKnown(
        potentialArray[i].solved
      );
    }
  }
  return potentialArray;
}

function addPotentialInfoFromRows(potentialArray) {
  for (let i = 0; i < potentialArray.length; i++) {
    if (!potentialArray[i].solved) {
      let rowInQuestion = potentialArray[i].row;
      for (let colNumber = 1; colNumber < 10; colNumber++) {
        if (potentialArray[i].col !== colNumber) {
          let testIndex;
          potentialArray.find((elem, index) => {
            if (elem.col === colNumber && elem.row === rowInQuestion) {
              testIndex = index;
            }
          });
          if (potentialArray[testIndex].solved) {
            if (
              potentialArray[i].potentials[potentialArray[testIndex].solved] ===
              null
            ) {
              potentialArray[i].potentials[
                potentialArray[testIndex].solved
              ] = false;
              // potentialArray[i].containsNewInformation = true;
            } else {
              potentialArray[i].potentials[
                potentialArray[testIndex].solved
              ] = false;
            }
          }
        }
      }
    }
  }
  return potentialArray;
}
function addPotentialInfoFromColumns(potentialArray) {
  for (let i = 0; i < potentialArray.length; i++) {
    if (!potentialArray[i].solved) {
      let colInQuestion = potentialArray[i].col;
      for (let rowNumber = 1; rowNumber < 10; rowNumber++) {
        if (potentialArray[i].row !== rowNumber) {
          let testIndex;
          potentialArray.find((elem, index) => {
            if (elem.row === rowNumber && elem.col === colInQuestion) {
              testIndex = index;
            }
          });
          if (potentialArray[testIndex].solved) {
            if (
              potentialArray[i].potentials[potentialArray[testIndex].solved] ===
              null
            ) {
              potentialArray[i].potentials[
                potentialArray[testIndex].solved
              ] = false;
              // potentialArray[i].containsNewInformation = true;
            } else {
              potentialArray[i].potentials[
                potentialArray[testIndex].solved
              ] = false;
            }
          }
        }
      }
    }
  }
  return potentialArray;
}
function addPotentialInfoFromBlocks(potentialArray) {
  for (let i = 0; i < potentialArray.length; i++) {
    if (!potentialArray[i].solved) {
      let blockInQuestion = potentialArray[i].block;
      let arrayOfIndecesToTest = createCellNumbersForBlockArray(
        getFirstCellNumberOfBlock(blockInQuestion)
      );
      // console.log(`block array is ${arrayOfIndecesToTest} for cell ${i}`);
      for (
        let blockIndex = 0;
        blockIndex < arrayOfIndecesToTest.length;
        blockIndex++
      ) {
        if (
          potentialArray[arrayOfIndecesToTest[blockIndex]].row !==
            potentialArray[i].row &&
          potentialArray[arrayOfIndecesToTest[blockIndex]].col !==
            potentialArray[i].col
        ) {
          if (potentialArray[arrayOfIndecesToTest[blockIndex]].solved) {
            // console.log(
            //   `cell number ${i} can not be a ${
            //     potentialArray[arrayOfIndecesToTest[blockIndex]].solved
            //   } due to cell ${blockIndex}`
            // );
            if (
              potentialArray[i].potentials[
                potentialArray[arrayOfIndecesToTest[blockIndex]].solved
              ] === null
            ) {
              potentialArray[i].potentials[
                potentialArray[arrayOfIndecesToTest[blockIndex]].solved
              ] = false;
              // potentialArray[i].containsNewInformation = true;
            } else {
              potentialArray[i].potentials[
                potentialArray[arrayOfIndecesToTest[blockIndex]].solved
              ] = false;
            }
          }
        }
      }
    }
  }
  return potentialArray;
}
function addPotentialInfoFromNakePairs(potentialArray) {
  let obtainedNewInformation = false;
  // result.push({
  // 	row,
  // 	col,
  // 	block,
  // 	solved: false,
  // 	containsNewInformation: false,
  // 	potentials: ["",null, null, null, null, null, null, null, null, null],
  // });
  for (let blockNumber = 1; blockNumber < 10; blockNumber++) {
    let arrayOfIndecesToTest = createCellNumbersForBlockArray(
      getFirstCellNumberOfBlock(blockNumber)
    );
    let arraysOfPossibleValues = [];
    for (
      let indexBeingTested = 0;
      indexBeingTested < arrayOfIndecesToTest.length;
      indexBeingTested++
    ) {
      if (!potentialArray[arrayOfIndecesToTest[indexBeingTested]].solved) {
        let arrayOfPossibleValues = [];
        for (let potentialIndex = 1; potentialIndex < 10; potentialIndex++) {
          if (
            potentialArray[arrayOfIndecesToTest[indexBeingTested]].potentials[
              potentialIndex
            ] === null
          ) {
            arrayOfPossibleValues.push(potentialIndex);
          }
        }
        arraysOfPossibleValues.push(arrayOfPossibleValues);
      } else {
        arraysOfPossibleValues.push([]);
      }
    }
    // Minor shortcut here on length - 1 since we can't pair a naked pair once we're on the last index
    for (let i = 0; i < arraysOfPossibleValues.length - 1; i++) {
      if (arraysOfPossibleValues[i].length === 2) {
        // console.log(`Potential Naked Pair, numbers: ${arraysOfPossibleValues[i][0]} and ${arraysOfPossibleValues[i][1]} of cell ${arrayOfIndecesToTest[i]}`);
        let arrayOfMatchingIndeces = [i];
        for (let j = i + 1; j < arraysOfPossibleValues.length; j++) {
          if (arraysOfPossibleValues[j].length === 2) {
            if (
              arraysOfPossibleValues[i][0] === arraysOfPossibleValues[j][0] &&
              arraysOfPossibleValues[i][1] === arraysOfPossibleValues[j][1]
            ) {
              arrayOfMatchingIndeces.push(j);
            }
          }
        }
        if (arrayOfMatchingIndeces.length === 2) {
          console.log(
            `Successfully found a naked pair between cells ${
              arrayOfIndecesToTest[arrayOfMatchingIndeces[0]]
            } and ${arrayOfIndecesToTest[arrayOfMatchingIndeces[1]]}`
          );

          for (let i = 0; i < arrayOfIndecesToTest.length; i++) {
            if (
              i !== arrayOfMatchingIndeces[0] &&
              i !== arrayOfMatchingIndeces[1]
            ) {
              if (!potentialArray[arrayOfIndecesToTest[i]].solved) {
                console.log(
                  `unsolved cell ${arrayOfIndecesToTest[i]} needs to have ${
                    arraysOfPossibleValues[arrayOfMatchingIndeces[0]][0]
                  } and ${
                    arraysOfPossibleValues[arrayOfMatchingIndeces[0]][1]
                  } set to false`
                );
                if (
                  potentialArray[arrayOfIndecesToTest[i]].potentials[
                    arraysOfPossibleValues[arrayOfMatchingIndeces[0]][0]
                  ] !== false
                ) {
                  obtainedNewInformation = true;
                  potentialArray[arrayOfIndecesToTest[i]].potentials[
                    arraysOfPossibleValues[arrayOfMatchingIndeces[0]][0]
                  ] = false;
                }
                if (
                  potentialArray[arrayOfIndecesToTest[i]].potentials[
                    arraysOfPossibleValues[arrayOfMatchingIndeces[0]][1]
                  ] !== false
                ) {
                  obtainedNewInformation = true;
                  potentialArray[arrayOfIndecesToTest[i]].potentials[
                    arraysOfPossibleValues[arrayOfMatchingIndeces[0]][1]
                  ] = false;
                }
              }
            }
          }
        }
      }
    }
  }
  return { potentialArray, obtainedNewInformation };
}
function calculateValuePotentials(cellArray) {
  let needsToBeRepeated = true;
  let result = null;
	let basePotentials = createInitialCurrentPotentials();
  while (needsToBeRepeated) {
    let potentialsWithKnowns = applyKnownValues(basePotentials, cellArray);
    let potentialsWithRows = addPotentialInfoFromRows(potentialsWithKnowns);
    let potentialsWithColumns = addPotentialInfoFromColumns(potentialsWithRows);
    let potentialsWithBlocks = addPotentialInfoFromBlocks(
      potentialsWithColumns
    );
    let nakedPairsResults = addPotentialInfoFromNakePairs(potentialsWithBlocks);
    result = nakedPairsResults.potentialArray;
    needsToBeRepeated = nakedPairsResults.obtainedNewInformation;
  }

  return result;
}
function updateValuePotentials(potentials) {
  let needsToBeRepeated = true;
  let result = null;
  while (needsToBeRepeated) {
    let potentialsWithKnowns = applyNewKnownValuesFromPotentials(potentials);
    let potentialsWithRows = addPotentialInfoFromRows(potentialsWithKnowns);
    let potentialsWithColumns = addPotentialInfoFromColumns(potentialsWithRows);
    let potentialsWithBlocks = addPotentialInfoFromBlocks(
      potentialsWithColumns
    );
    let nakedPairsResults = addPotentialInfoFromNakePairs(potentialsWithBlocks);
    result = nakedPairsResults.potentialArray;
    needsToBeRepeated = nakedPairsResults.obtainedNewInformation;
  }
  return result;
}

function testPotentialsForNakedSingles(potentialsArray) {
  let newInfoFound = false;
  for (let i = 0; i < potentialsArray.length; i++) {
    if (!potentialsArray[i].solved) {
      let numberOfPossibleValues = 9;
      let correctCellNumber = 0;
      for (let cellNumber = 1; cellNumber < 10; cellNumber++) {
        if (potentialsArray[i].potentials[cellNumber] === null) {
          if (correctCellNumber !== 0) {
            break;
          }
          correctCellNumber = cellNumber;
        } else if (potentialsArray[i].potentials[cellNumber] === false) {
          numberOfPossibleValues--;
        }
      }
      if (numberOfPossibleValues === 1) {
        potentialsArray[i].potentials[correctCellNumber] = true;
        potentialsArray[i].solved = correctCellNumber;
        potentialsArray[i].containsNewInformation = true;
        newInfoFound = true;
      }
    }
  }
  return { potentialsArray, newInfoFound };
}
function createArrayOfColumnIndeces(columnNumber) {
  let indecesToTest = [];
  for (let i = 0; i < 9; i++) {
    indecesToTest.push(9 * i + columnNumber - 1);
  }
  return indecesToTest;
}
function testIfIndecesHasSolvedANumber(
  testNumber,
  potentialsArray,
  indecesToTest
) {
  for (let n = 0; n < indecesToTest.length; n++) {
    if (potentialsArray[indecesToTest[n]].solved === testNumber) return true;
  }
  return false;
}
function testIfIndecesHasOnePlaceForANumber(
  testNumber,
  potentialsArray,
  indecesToTest
) {
  let numberOfPlaces = 0;
  let index = null;
  for (let n = 0; n < indecesToTest.length; n++) {
    if (potentialsArray[indecesToTest[n]].potentials[testNumber] === null) {
      numberOfPlaces++;
      index = indecesToTest[n];
    }
    if (numberOfPlaces > 1) return false;
  }
  if (numberOfPlaces === 1) return index;
  return false;
}
function testPotentialsForColumnLones(potentialsArray) {
  let newInfoFound = false;
  for (let c = 1; c < 10; c++) {
    let indecesToTest = createArrayOfColumnIndeces(c);
    for (let num = 1; num < 10; num++) {
      if (!testIfIndecesHasSolvedANumber(num, potentialsArray, indecesToTest)) {
        let possibleResult = testIfIndecesHasOnePlaceForANumber(
          num,
          potentialsArray,
          indecesToTest
        );
        if (possibleResult !== false) {
          potentialsArray[possibleResult].potentials[num] = true;
          potentialsArray[possibleResult].solved = num;
          potentialsArray[possibleResult].containsNewInformation = true;
          newInfoFound = true;
        }
      }
    }
  }
  return { potentialsArray, newInfoFound };
}
function createArrayOfRowIndeces(rowNumber) {
  let indecesToTest = [];
  for (let i = 0; i < 9; i++) {
    indecesToTest.push(9 * (rowNumber - 1) + i);
  }
  return indecesToTest;
}
function testPotentialsForRowLones(potentialsArray) {
  let newInfoFound = false;
  for (let r = 1; r < 10; r++) {
    let indecesToTest = createArrayOfRowIndeces(r);
    for (let num = 1; num < 10; num++) {
      if (!testIfIndecesHasSolvedANumber(num, potentialsArray, indecesToTest)) {
        let possibleResult = testIfIndecesHasOnePlaceForANumber(
          num,
          potentialsArray,
          indecesToTest
        );
        if (possibleResult !== false) {
          potentialsArray[possibleResult].potentials[num] = true;
          potentialsArray[possibleResult].solved = num;
          potentialsArray[possibleResult].containsNewInformation = true;
          newInfoFound = true;
        }
      }
    }
  }
  return { potentialsArray, newInfoFound };
}

function testPotentialsForBlockLones(potentialsArray) {
  let newInfoFound = false;
  for (let b = 1; b < 10; b++) {
    let indecesToTest = createCellNumbersForBlockArray(
      getFirstCellNumberOfBlock(b)
    );
    for (let num = 1; num < 10; num++) {
      if (!testIfIndecesHasSolvedANumber(num, potentialsArray, indecesToTest)) {
        let possibleResult = testIfIndecesHasOnePlaceForANumber(
          num,
          potentialsArray,
          indecesToTest
        );
        if (possibleResult !== false) {
          potentialsArray[possibleResult].potentials[num] = true;
          potentialsArray[possibleResult].solved = num;
          potentialsArray[possibleResult].containsNewInformation = true;
          newInfoFound = true;
        }
      }
      // row,
      // col,
      // block,
      // solved: false,
      // containsNewInformation: false,
      // potentials: ["", null, null, null, null, null, null, null, null, null],
    }
  }
  return { potentialsArray, newInfoFound };
}
function verifyTwoLinesAreNotInSameBlock(line1, line2) {
  // returns true if in same block and false if not
  if (line1 === line2) return true;
  if (line1 < 4) {
    return line2 < 4 ? true : false;
  }
  if (line1 < 7) {
    return line2 > 3 && line2 < 7 ? true : false;
  }
  return line2 > 6 ? true : false;
}
function searchForXWings(potentialsArray, testingRows) {
  console.log("running x wing test");
  for (let primaryLine = 1; primaryLine < 10; primaryLine++) {
    for (let num = 1; num < 10; num++) {
      let multiplicityOfAvailablePlacesInLine = 0;
      let lineOne = 0;
      let lineTwo = 0;
      let solved = false;
      let cellNumbersToTest = testingRows
        ? createArrayOfRowIndeces(primaryLine)
        : createArrayOfColumnIndeces(primaryLine);
      for (let i = 0; i < 9; i++) {
        if (potentialsArray[cellNumbersToTest[i]].solved === num) {
          // console.log(`column ${primaryLine} is solved for number ${num}`);
          solved = true;
          break;
        }
        if (potentialsArray[cellNumbersToTest[i]].potentials[num] !== false) {
          multiplicityOfAvailablePlacesInLine++;
          if (lineTwo) {
            break;
          }
          if (!lineOne) {
            lineOne = testingRows
              ? potentialsArray[cellNumbersToTest[i]].col
              : potentialsArray[cellNumbersToTest[i]].row;
          } else {
            lineTwo = testingRows
              ? potentialsArray[cellNumbersToTest[i]].col
              : potentialsArray[cellNumbersToTest[i]].row;
          }
        }
      }
      if (multiplicityOfAvailablePlacesInLine === 2 && !solved) {
        // console.log(
        //   `multiplicity of exactly two for number ${num} on columns ${lineOne} and ${lineTwo}`
        // );
        for (
          let potentialSecondLine = primaryLine + 1;
          potentialSecondLine < 10;
          potentialSecondLine++
        ) {
          if (
            !verifyTwoLinesAreNotInSameBlock(primaryLine, potentialSecondLine)
          ) {
            let multiplicityOfAvailablePlacesInSecondLine = 0;
            let secondLineOne = 0;
            let secondLineTwo = 0;
            let solvedOnSecondLine = false;
            let cellNumbersToTestInSecondLine = testingRows
              ? createArrayOfRowIndeces(potentialSecondLine)
              : createArrayOfColumnIndeces(potentialSecondLine);

            for (let j = 0; j < 9; j++) {
              if (
                potentialsArray[cellNumbersToTestInSecondLine[j]].solved === num
              ) {
                solvedOnSecondLine = true;
                break;
              }
              if (
                potentialsArray[cellNumbersToTestInSecondLine[j]].potentials[
                  num
                ] !== false
              ) {
                multiplicityOfAvailablePlacesInSecondLine++;
                if (secondLineTwo) {
                  break;
                }
                if (!secondLineOne) {
                  secondLineOne = testingRows
                    ? potentialsArray[cellNumbersToTestInSecondLine[j]].col
                    : potentialsArray[cellNumbersToTestInSecondLine[j]].row;
                } else {
                  secondLineTwo = testingRows
                    ? potentialsArray[cellNumbersToTestInSecondLine[j]].col
                    : potentialsArray[cellNumbersToTestInSecondLine[j]].row;
                }
              }
            }
            if (
              !solvedOnSecondLine &&
              multiplicityOfAvailablePlacesInSecondLine === 2 &&
              lineOne === secondLineOne &&
              lineTwo === secondLineTwo
            ) {
              // console.log(
              //   `encountered a column based X wing of number ${num} on columns ${potentialSecondLine} and ${primaryLine} of rows ${lineOne} and ${lineTwo}`
              // );
              // make all rows and cells along lines that aren't the 4 x-wing locations have false for the num.
              let change = false;
              potentialsArray.forEach((potential) => {
                if (testingRows) {
                  if (
                    potential.col === lineOne ||
                    potential.col === lineTwo ||
                    potential.row === potentialSecondLine ||
                    potential.row === primaryLine
                  ) {
                    // console.log("in right row and column");
                    if (
                      !(
                        potential.row === potentialSecondLine &&
                        potential.col === lineTwo
                      ) &&
                      !(
                        potential.row === potentialSecondLine &&
                        potential.col === lineOne
                      ) &&
                      !(
                        potential.row === primaryLine &&
                        potential.col === lineTwo
                      ) &&
                      !(
                        potential.row === primaryLine &&
                        potential.col === lineOne
                      )
                    ) {
                      if (potential.potentials[num] !== false) {
                        console.log(
                          `encountered a new column based X wing of number ${num} on columns ${potentialSecondLine} and ${primaryLine} of rows ${lineOne} and ${lineTwo}`
                        );
                        // console.log(
                        //   `changing a cell row ${potential.row} col ${potential.col} potential to false`
                        // );
                        change = true;
                        potential.potentials[num] = false;
                      }
                    }
                  }
                } else {
                  if (
                    potential.row === lineOne ||
                    potential.row === lineTwo ||
                    potential.col === potentialSecondLine ||
                    potential.col === primaryLine
                  ) {
                    // console.log("in right row and column");
                    if (
                      !(
                        potential.col === potentialSecondLine &&
                        potential.row === lineTwo
                      ) &&
                      !(
                        potential.col === potentialSecondLine &&
                        potential.row === lineOne
                      ) &&
                      !(
                        potential.col === primaryLine &&
                        potential.row === lineTwo
                      ) &&
                      !(
                        potential.col === primaryLine &&
                        potential.row === lineOne
                      )
                    ) {
                      if (potential.potentials[num] !== false) {
                        console.log(
                          `encountered a new row based X wing of number ${num} on columns ${potentialSecondLine} and ${primaryLine} of rows ${lineOne} and ${lineTwo}`
                        );
                        // console.log(
                        //   `changing a cell row ${potential.row} col ${potential.col} potential to false`
                        // );
                        change = true;
                        potential.potentials[num] = false;
                      }
                    }
                  }
                }
              });
              if (change) return { found: true, potentialsArray };
            }
          }
        }
      }
    }
    return { found: false };
  }
}
function formNewValueHistoryWithNewKnowns(
  valueHistory,
  placeInHistory,
  solverPotentials
) {
  let result = [];
  for (let i = 0; i < placeInHistory + 1; i++) {
    result.push(valueHistory[i]);
  }
  let newCellArray = [...valueHistory[placeInHistory]];
  solverPotentials.forEach((potentialsObject) => {
    if (potentialsObject.containsNewInformation || potentialsObject.solved) {
      newCellArray[
        resolveCellNumberFromRowAndColumnNumber(
          potentialsObject.col,
          potentialsObject.row
        )
      ] = potentialsObject.solved;
    }
  });
  result.push(newCellArray);
  return result;
}
function attemptToSolvePuzzleWithoutGuessing(potentialsArray) {
  let activePotentialsArray = duplicate(potentialsArray);
  let newInfoFound = false;
  let contradictionFound = null;
  let isSolved = null;
  for (let testLevel = 1; testLevel < 5; testLevel++) {
    contradictionFound = testIfPotentialsContainsAContradiction(
      activePotentialsArray
    );
    isSolved = testIfSolutionIsFoundInPotentials(activePotentialsArray);
    if (contradictionFound || isSolved) {
      return {
        potentialsArray: activePotentialsArray,
        newInfoFound,
        contradictionFound,
        isSolved,
      };
    }
    if (testLevel === 1) {
      // console.log("naked singles test from solve");
      let results = testPotentialsForNakedSingles(activePotentialsArray);
      if (results.newInfoFound) {
        newInfoFound = true;
        testLevel = 0;
        activePotentialsArray = calculateValuePotentials(
          formCellsArrayFromPotentialsArray(activePotentialsArray)
        );
      }
    } else if (testLevel === 2) {
      // console.log("col test from solve");
      let results = testPotentialsForColumnLones(activePotentialsArray);
      if (results.newInfoFound) {
        newInfoFound = true;
        testLevel = 0;
        activePotentialsArray = calculateValuePotentials(
          formCellsArrayFromPotentialsArray(activePotentialsArray)
        );
      }
    } else if (testLevel === 3) {
      // console.log("row test from solve");
      let results = testPotentialsForRowLones(activePotentialsArray);
      if (results.newInfoFound) {
        newInfoFound = true;
        testLevel = 0;
        activePotentialsArray = calculateValuePotentials(
          formCellsArrayFromPotentialsArray(activePotentialsArray)
        );
      }
    } else if (testLevel === 4) {
      // console.log("block test from solve");
      let results = testPotentialsForBlockLones(activePotentialsArray);
      if (results.newInfoFound) {
        newInfoFound = true;
        testLevel = 0;
        activePotentialsArray = calculateValuePotentials(
          formCellsArrayFromPotentialsArray(activePotentialsArray)
        );
      }
    }
    // else if (testLevel === 5) {
    // Removing X-wing test - it does not decrease solve time
    // console.log("test for X-Wings");
    // let results = searchForXWings(activePotentialsArray);
    // ////////
    // if (results.found) {
    //   // newInfoFound = true;
    //   // testLevel = 0;
    //   // activePotentialsArray = calculateValuePotentials(
    //   //   formCellsArrayFromPotentialsArray(results.potentialsArray)
    //   // );
    // 	activePotentialsArray = results.potentialsArray;
    // } else {
    //   results = searchForXWings(activePotentialsArray, true);
    //   if (results.found) {
    //     // newInfoFound = true;
    //     // testLevel = 0;
    //     // activePotentialsArray = calculateValuePotentials(
    //     //   formCellsArrayFromPotentialsArray(results.potentialsArray)
    //     // );
    // 		activePotentialsArray = results.potentialsArray;
    //   }
    // }
    // }
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
}
function generatePotentialGuessesArray(potentials) {
  let potentialGuesses = [];
  for (let potentialsIndex = 1; potentialsIndex < 11; potentialsIndex++) {
    if (potentials[potentialsIndex] === null) {
      potentialGuesses.push(potentialsIndex);
    }
  }
  return potentialGuesses;
}
function solvePuzzle(potentialsArray) {
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
}

export {
  resolveSelectedCellNumberFromBlockNumberAndCellNumber,
  // resolveCellNumberFromRowAndColumnNumber,
  resolveIsRealtedToSelectedCellNumber,
  calculateIfBlockIsSolved,
  testIfCellsContainAContradiction,
  testIfSolutionIsFound,
  calculateValuePotentials,
  testPotentialsForNakedSingles,
  testPotentialsForColumnLones,
  testPotentialsForRowLones,
  testPotentialsForBlockLones,
  // searchForXWings,
  formNewValueHistoryWithNewKnowns,
  solvePuzzle,
};
