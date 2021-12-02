import {createInitialCurrentPotentials} from "./puzzleInitialization";
function duplicate(object) {
  return JSON.parse(JSON.stringify(object));
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

function testArrayEquivalence(arr1, arr2) {
  for (let i1 = 0; i1 < arr1.length; i1++) {
    for (let i2 = 0; i2 < arr2.length; i2++) {
      if (arr1[i1] !== arr2[i2]) return false;
    }
  }
  return true;
}

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
  // result.push({
  // 	row,
  // 	col,
  // 	block,
  // 	solved: false,
  // 	containsNewInformation: false,
  // 	potentials: ["",null, null, null, null, null, null, null, null, null],
  // });
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
function calculateValuePotentials(cellArray) {
  let basePotentials = createInitialCurrentPotentials();
  let potentialsWithKnowns = applyKnownValues(basePotentials, cellArray);
  let potentialsWithRows = addPotentialInfoFromRows(potentialsWithKnowns);
  let potentialsWithColumns = addPotentialInfoFromColumns(potentialsWithRows);
  let potentialsWithBlocks = addPotentialInfoFromBlocks(potentialsWithColumns);
  return potentialsWithBlocks;
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
function solvePuzzle(potentialsArray) {
  let activePotentialsArray = duplicate(potentialsArray);
  let newInfoFound = false;
  for (let testLevel = 1; testLevel < 7; testLevel++) {
    if (
      testIfSolutionIsFoundInPotentials(activePotentialsArray) ||
      testIfPotentialsContainsAContradiction(activePotentialsArray)
    ) {
      return { potentialsArray: activePotentialsArray, newInfoFound };
    }
    if (testLevel === 1) {
			// console.log('naked singles test from solve');
      let results = testPotentialsForNakedSingles(activePotentialsArray);
      if (results.newInfoFound) {
        newInfoFound = true;
        testLevel = 0;
        activePotentialsArray = calculateValuePotentials(
          formCellsArrayFromPotentialsArray(activePotentialsArray)
        );
      }
    } else if (testLevel === 2) {
			// console.log('col test from solve');
			let results = testPotentialsForColumnLones(activePotentialsArray);
      if (results.newInfoFound) {
        newInfoFound = true;
        testLevel = 0;
        activePotentialsArray = calculateValuePotentials(
          formCellsArrayFromPotentialsArray(activePotentialsArray)
        );
      }
    } else if (testLevel === 3) {
			// console.log('row test from solve');
			let results = testPotentialsForRowLones(activePotentialsArray);
      if (results.newInfoFound) {
        newInfoFound = true;
        testLevel = 0;
        activePotentialsArray = calculateValuePotentials(
          formCellsArrayFromPotentialsArray(activePotentialsArray)
        );
      }
    } else if (testLevel === 4) {
			console.log('block test from solve');
      let results = testPotentialsForBlockLones(activePotentialsArray);
      if (results.newInfoFound) {
        newInfoFound = true;
        testLevel = 0;
        activePotentialsArray = calculateValuePotentials(
          formCellsArrayFromPotentialsArray(activePotentialsArray)
        );
      }
    } else if (testLevel === 5) {
      // guess 1 deep
    } else if (testLevel === 6) {
      // guess 2 deep
    }
  }
  return { potentialsArray: activePotentialsArray, newInfoFound };
}

// // Level 2 Tests

// function testLinkedPairs (setLastTested, setfunctionOngoing, setHasChanged, cells, setCells) {
//   setLastTested(true);
//   setfunctionOngoing(true);
//   setHasChanged(false);
//   let originalArray = duplicate(cells);
//   let matchArray = [];
//     cells.forEach((cell1) => {
//       if (cell1[10] !== '') {return;}
//       else {
//         let count1 = 0;
//         let row1 = 0;
//         let col1 = 0;
//         let block1 = 0;
//         let num1 = 0;
//         let num2 = 0;
//         let exact1 = '';
//         for (let i = 1; i<10; i++) {
//           if (cell1[i] === 'unknown' && count1 === 0) {
//             count1 ++;
//             num1 = i;
//           }
//           else if (cell1[i] === 'unknown' && count1 === 1) {
//             count1 ++;
//             num2 = i;
//           }
//           else if (cell1[i] === 'unknown' && count1 >= 2) {
//             i += 10;
//           }
//           if (i === 9 && count1 === 2){
//             row1 = cell1[0][1];
//             col1 = cell1[0][3];
//             block1 = cell1[11];
//             exact1 = cell1[0];
//             let count2 = 0;
//             let row2 = 0;
//             let col2 = 0;
//             let block2 = 0;
//             let matches = 0;
//             let exact2 = '';
//             cells.forEach((cell2) => {
//               if (cell2[10] !== '' || cell2[0] === exact1) {return;}
//               if (!(cell2[0][1] === row1 || cell2[0][3] === col1 || cell2[11] === block1)) {return;}
//               else {
//                 for (let j = 1; j<10; j++) {
//                   if (j === num1 || j === parseInt(num2)) {
//                     if (cell2[j] === 'unknown') {count2++}
//                     else {j += 10; count2 += 10; return;}
//                   }
//                   else if (cell2[j] === 'unknown') {j += 10; count2 += 10; return;}
//                   if (count2 === 2 && j === 9) {
//                     row2 = cell2[0][1];
//                     col2 = cell2[0][3];
//                     block2 = cell2[11];
//                     exact2 = cell2[0];
//                     matches +=1;
//                   }
//                 }
//               }
//             })
//             let alreadyDone = false;
//             matchArray.forEach((pastMatch)=>{
//               // console.log(pastMatch[0], pastMatch[1], exact1, exact2);
//               if ((pastMatch[0] === exact1 || pastMatch[0] === exact2) && (pastMatch[1] === exact1 || pastMatch[1] === exact2)) {
//                 alreadyDone = true;
//               }
//             })
//             if (matches === 1 && alreadyDone === false) {
//               // console.log(`Match between: ${exact1} and ${exact2}`);
//               let matchElement = [exact1, exact2];
//               matchArray.push(matchElement);
//               if (row1 === row2) {
//                 // make evert cell in this row's num1 and num2 = false
//                 cells.forEach((cell)=> {
//                   if (cell[10] !== '' || cell[0] === exact1 || cell[0] === exact2) {return;}
//                   else if (cell[0][1] === row1) {
//                     for (let n = 1; n<10; n++){
//                       if (n === num1 || n === num2) {cell[n] = false;}
//                     }
//                   }
//                 })
//               }
//               if (col1 === col2) {
//                 // make evert cell in this col's num1 and num2 = false
//                 cells.forEach((cell)=> {
//                   if (cell[10] !== '' || cell[0] === exact1 || cell[0] === exact2) {return;}
//                   else if (cell[0][3] === col1) {
//                     for (let n = 1; n<10; n++){
//                       if (n === num1 || n === num2) {cell[n] = false;}
//                     }
//                   }
//                 })
//               }
//               if (block1 === block2) {
//                 // make evert cell in this col's num1 and num2 = false
//                 cells.forEach((cell)=> {
//                   if (cell[10] !== '' || cell[0] === exact1 || cell[0] === exact2) {return;}
//                   else if (cell[11] === block1) {
//                     for (let n = 1; n<10; n++){
//                       if (n === num1 || n === num2) {cell[n] = false;}
//                     }
//                   }
//                 })
//               }
//             }
//           }
//         }
//       }
//     })
//   setCells([
//     ...cells,
//   ]
//   )
//   testArrayEquivalences(cells, originalArray) ? setHasChanged(false) : setHasChanged(true);
//   setfunctionOngoing(false);
//   refreshNulls(setfunctionOngoing, cells, setCells);
// };

// // Realized I don't need Xwing solving
// // function testXwings (setLastTested, setfunctionOngoing, setHasChanged, cells, setCells) {
// //   setLastTested(true);
// //   setfunctionOngoing(true);
// //   setHasChanged(false);
// //   // let originalArray = duplicate(cells);
// //   for (let r=1; r<10; r++){
// //     for (let num=1; num<10; num++){
// //       let count = 0;
// //       // let count = [0,0,0,0,0,0,0,0,0,0];
// //       // let holder = '';
// //         cells.forEach((cell, index) => {
// //           if (parseInt(cell[0][1]) === r && parseInt(cell[num]) === 'unknown') {
// //             count++;
// //           }

// //  Unfinished as of below

// //           else if (parseInt(cell[11]) === b && (cell[num] === false || cell[10] !== '')) {
// //             count ++;
// //           }
// //           else if (parseInt(cell[11]) === b && cell[num] === 'unknown') {
// //             holder = index;
// //           }
// //         })
// //       // }
// //       if (count === 8) {
// //         cells[holder][num] = true;
// //       }
// //     }
// //   }
// //   setCells([
// //     ...cells,
// //   ]
// //   )
// //   testArrayEquivalences(cells, originalArray) ? setHasChanged(false) : setHasChanged(true);
// //   setfunctionOngoing(false);
// //   refreshNulls(setfunctionOngoing, cells, setCells);
// // };

// // Level 3 Test

// function bruteForce (setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved) {

//   setfunctionOngoing(true);
//   let foundNewInfo = false;
//   let solveValue = solve(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved);
//   if (solveValue) foundNewInfo = true;

//   let success = false;
//   let originalCellsArray = [];
//   originalCellsArray.push(duplicate(cells));
//   let holderI = '';
//   let holderJ = '';
//   while (!foundNewInfo) {
//     // console.log('bruting');
//     // console.log(foundNewInfo);
//     for (let i = 0; i < cells.length; i++) {
//       if (cells[i][10] === ''){
//         for (let j = 1; j<10; j++) {
//           if (cells[i][j] === 'unknown') {
//             // if (cells[i] !== undefined) console.log('pre tests for number', j, 'of', cells[i][0], cells);
//             // console.log(`${i} ${j}`);
//             cells[i][10] = j;
//             solveValue = solve(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved);
//             // console.log('is solved? ', solveValue);
//             let contradictionValue = testContradiction(setfunctionOngoing, cells, setNoContradiction);
//               // console.log("contradictory? ", contradictionValue);
//             if (solveValue === true) {
//               console.log('solution found and inside loop');
//               holderI = i;
//               holderJ = j;
//               j = 10;
//               i = 81;
//               foundNewInfo = true;
//               setNoContradiction(true);
//               setHasChanged(true);
//               success = true;
//               makeUnknown(cells);
//               solve(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved);
//             }
//             else {
//               if (contradictionValue === true) {
//                 console.log('contradiction found and inside loop');
//                 // console.log('cell#',i, j);
//                 // console.log('cells after tests',cells);
//                 // console.log('original cells', originalCellsArray[0]);
//                 cells = originalCellsArray[0];
//                 // console.log('cells after direct change',cells);
//                 // setCells([originalCellsArray[0]]);
//                 // console.log('cells after functional change',cells);
//                 // cells = originalCellsArray[0];
//                 originalCellsArray.pop();
//                 originalCellsArray.push(duplicate(cells));
//                 cells[i][j] = false;
//                 cells[i][10] = '';
//                 // console.log('cells after contradiction fix:', cells);
//                 j = 10;
//                 i = 81;
//                 foundNewInfo = true;
//                 setNoContradiction(true);
//                 setHasChanged(true);
//                 success = true;
//               }
//               else {
//                 cells = originalCellsArray[0];
//                 originalCellsArray.pop();
//                 originalCellsArray.push(duplicate(cells));
//                 // setCells([originalCellsArray[0]]);
//                 // console.log('cells after reset due to no progress:', cells);
//               }
//             }
//           }
//           // console.log(`i = ${i}, j = ${j}, foundNewInfo must be false to esc, it is: ${foundNewInfo}`);
//           if (i === 80 && j === 9 && foundNewInfo === false) {
//             console.log('made no progress with single level guesses');
//             foundNewInfo = true;
//             setNoContradiction(true);
//             setHasChanged(false);
//             cells = originalCellsArray[0];
//             originalCellsArray.pop();
//             originalCellsArray.push(duplicate(cells));
//           }
//           // if (cells[i] !== undefined) {
//           //   console.log('post tests', cells[i][0], cells);
//           // }
//         }
//       }
//     }
//   }
//   if (holderI > 0) {
//     console.log('Solved after guess');
//     cells[holderI][holderJ] = true;
//     cells[holderI][10] = holderJ;
//     console.log(holderI, holderJ);
//   }

//   setCells([
//     ...cells,
//   ]
//   )
//   // console.log('cells after final refresh:', cells);
//   // console.log('cells after final refresh:', JSON.stringify(cells, '', 2));
//   testContradiction(setfunctionOngoing, cells, setNoContradiction)
//   // setLastTested(false);
//   // refreshNulls(setfunctionOngoing, cells, setCells);
//   // addKnowns(setfunctionOngoing, cells, setCells, setLastTested, setNoContradiction, setSolved);
//   // setSolved(testIsSolved(setfunctionOngoing, cells, setNoContradiction, setSolved));
//   setfunctionOngoing(false);

//   return success;
// }

// // Level 4 Solve

// function solve (setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved) {
//   // console.log('cells before solving:', JSON.stringify(cells, '', 2));
//   let success = false;
//   let done = false;
//   addKnowns(setfunctionOngoing, cells, setCells, setLastTested, setNoContradiction, setSolved);
//   let doneTest = function () {
//     if (testIsSolved(setfunctionOngoing, cells, setNoContradiction, setSolved)) {
//       // console.log('solution found');
//       success = true;
//       return true;
//     }
//     else return false
//   }
//   let changes = 0;
//   let originalArray = [];
//   // let testCount = 0;
//   while (!done) {
//     originalArray = duplicate(cells);
//     // testCount ++;
//     testForKnowns(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells);
//     // console.log(`Test ${testCount}`);
//     addKnowns(setfunctionOngoing, cells, setCells, setLastTested, setNoContradiction, setSolved);
//     if (doneTest()) {
//       success = true;
//       return true;
//     }
//     else {
//       if (testArrayEquivalences(cells, originalArray) === false) changes++;
//     }

//     originalArray = duplicate(cells);
//     // testCount ++;
//     testRows(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells);
//     // console.log(`Test ${testCount}`);
//     addKnowns(setfunctionOngoing, cells, setCells, setLastTested, setNoContradiction, setSolved);
//     if (doneTest()) {
//       success = true;
//       return true;
//     }
//     else {
//       if (testArrayEquivalences(cells, originalArray) === false) changes++;
//     }

//     originalArray = duplicate(cells);
//     // testCount ++;
//     testCols(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells);
//     // console.log(`Test ${testCount}`);
//     addKnowns(setfunctionOngoing, cells, setCells, setLastTested, setNoContradiction, setSolved);
//     if (doneTest()) {
//       success = true;
//       return true;
//     }
//     else {
//       if (testArrayEquivalences(cells, originalArray) === false) changes++;
//     }

//     originalArray = duplicate(cells);
//     // testCount ++;
//     testBlocks(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells);
//     // console.log(`Test ${testCount}`);
//     addKnowns(setfunctionOngoing, cells, setCells, setLastTested, setNoContradiction, setSolved);
//     if (doneTest()) {
//       success = true;
//       return true;
//     }
//     else {
//       if (testArrayEquivalences(cells, originalArray) === false) changes++;
//     }

//     if (changes === 0) {
//       originalArray = duplicate(cells);
//       // testCount ++;
//       testLinkedPairs(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells);
//       // console.log(`Test ${testCount}`);
//       addKnowns(setfunctionOngoing, cells, setCells, setLastTested, setNoContradiction, setSolved);
//       if (doneTest()) {
//         success = true;
//         return true;
//       }
//       else {
//         if (testArrayEquivalences(cells, originalArray) === false) changes++;
//       }
//     }
//     if (changes === 0) {
//       // console.log('could not find solution, yet...');
//       done = true;
//     }
//     else changes = 0;
//   }
//   // console.log('cells after solving:', JSON.stringify(cells, '', 2));
//   return success;
// }

// // Level 5 SolveWithBrute

// // This function will loop endlessly, so it should not be used...
// function bruteSolve (setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved, solved, hasChanged) {
//   // setSolved(false);
//   let solveValue = solve(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved);
//   let functionProgress = true;
// while (solveValue === false && functionProgress === true) {
//   setfunctionOngoing(true);
//   let foundNewInfo = false;
//   solveValue = solve(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved);
//   if (solveValue) {
//     foundNewInfo = true;
//     setSolved(true);
//   }
//   // let success = false;
//   let originalCellsArray = [];
//   originalCellsArray.push(duplicate(cells));
//   let holderI = '';
//   let holderJ = '';
//   while (!foundNewInfo) {
//     // console.log(foundNewInfo);
//     for (let i = 0; i < cells.length; i++) {
//       if (cells[i][10] === ''){
//         for (let j = 1; j<10; j++) {
//           if (cells[i][j] === 'unknown') {
//             // if (cells[i] !== undefined) console.log('pre tests for number', j, 'of', cells[i][0], cells);
//             // console.log(`${i} ${j}`);
//             cells[i][10] = j;
//             solveValue = solve(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved);
//             // console.log('is solved? ', solveValue);
//             let contradictionValue = testContradiction(setfunctionOngoing, cells, setNoContradiction);
//               // console.log("contradictory? ", contradictionValue);
//             if (solveValue === true) {
//               console.log('solution found and inside loop');
//               holderI = i;
//               holderJ = j;
//               j = 10;
//               i = 81;
//               foundNewInfo = true;
//               setNoContradiction(true);
//               setHasChanged(true);
//               setSolved(true);
//               // success = true;
//               makeUnknown(cells);
//               solve(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved);
//             }
//             else {
//               if (contradictionValue === true) {
//                 console.log('contradiction found and inside loop');
//                 // console.log('cell#',i, j);
//                 // console.log('cells after tests',cells);
//                 // console.log('original cells', originalCellsArray[0]);
//                 cells = originalCellsArray[0];
//                 // console.log('cells after direct change',cells);
//                 // setCells([originalCellsArray[0]]);
//                 // console.log('cells after functional change',cells);
//                 // cells = originalCellsArray[0];
//                 originalCellsArray.pop();
//                 originalCellsArray.push(duplicate(cells));
//                 cells[i][j] = false;
//                 cells[i][10] = '';
//                 // console.log('cells after contradiction fix:', cells);
//                 j = 10;
//                 i = 81;
//                 foundNewInfo = true;
//                 setNoContradiction(true);
//                 setHasChanged(true);
//                 // success = true;
//               }
//               else {
//                 cells = originalCellsArray[0];
//                 originalCellsArray.pop();
//                 originalCellsArray.push(duplicate(cells));
//                 // setCells([originalCellsArray[0]]);
//                 // console.log('cells after reset due to no progress:', cells);
//               }
//             }
//           }
//           // console.log(`i = ${i}, j = ${j}, foundNewInfo must be false to esc, it is: ${foundNewInfo}`);
//           if (i === 80 && j === 9 && foundNewInfo === false) {
//             console.log('made no progress with single level guesses');
//             foundNewInfo = true;
//             setNoContradiction(true);
//             setHasChanged(false);
//             cells = originalCellsArray[0];
//             originalCellsArray.pop();
//             originalCellsArray.push(duplicate(cells));
//             functionProgress = false;
//           }
//           // if (cells[i] !== undefined) {
//           //   console.log('post tests', cells[i][0], cells);
//           // }
//         }
//       }
//     }
//     // console.log(foundNewInfo);
//   }
//   solve(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved);
//   if (holderI > 0) {
//     console.log('A different way of solving...');
//     cells[holderI][holderJ] = true;
//     cells[holderI][10] = holderJ;
//     console.log(holderI, holderJ);
//     setSolved(true);
//   }
//   setCells([
//     ...cells,
//   ]
//   )
// }
//   testContradiction(setfunctionOngoing, cells, setNoContradiction)
//   setfunctionOngoing(false);
//   // while (hasChanged){
//   //   console.log('bruting');
//   //   bruteForce(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved);
//   //   if (solved) return solved;
//   //   console.log('bruted');
//   //   // solve(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved);
//   // }
//   // console.log(solveValue);
//   // console.log('cells at end of force', cells);
//   // console.log(JSON.stringify(cells));
//   let returnValue = [solveValue, cells]
//   // return solveValue;
//   return returnValue;
// }

// // Below was an attempt to correct the render delay to the cursor styling.
// // function guessAndBruteSolve (setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved, solved, hasChanged) {
// // document.body.style.cursor = "wait";
// // // guessAndBruteSolve2(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved, solved, hasChanged)
// //   setTimeout(()=> {guessAndBruteSolve2(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved, solved, hasChanged)}, 50);
// // }

// function guessAndBruteSolve (setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved, solved, hasChanged) {
//   // cursor change does not occur until render at end of function, at which time it was reset to default.
//   document.body.style.cursor = "wait";
//   const newFunction = async function (setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved, solved, hasChanged) {
//     setfunctionOngoing(true);
//     let done = bruteSolve(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved, solved, hasChanged)[0];
//     let holderLocation = '';
//     // let holderId = '';
//     let holderValue = '';
//     let solution = [];
//     let solutionCopied = false;
//     let guesses = 0;
//     if (done) {
//       setfunctionOngoing(false);
//       document.body.style.cursor = "default";
//       return;
//     }
//     else {

//       let originalArray = duplicate(cells);
//       // console.log('original array', originalArray);
//       cells.forEach((cell, index)=>{
//         if (solution.length === 0) {
//           for (let i = 1; i < 10; i++) {
//             if (solution.length === 0) {
//               if (cell[i] === 'unknown') {
//                 if (!done) {
//                   cell[10] = toString(i);
//                   // done = bruteSolve(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved, solved, hasChanged)[0];
//                   let solvedHolder = bruteSolve(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved, solved, hasChanged);
//                   guesses ++;
//                   done = solvedHolder[0];
//                   if (done === true) {
//                     holderLocation = index;
//                     // holderId = cell[0];
//                     holderValue = i;
//                     // cells[holderLocation][10] = toString(holderValue);
//                     if (!solutionCopied) {
//                       solution = solvedHolder[1];
//                       // solution[holderLocation][10] = toString(holderValue);
//                       solution[holderLocation][10] = holderValue;
//                       solutionCopied = true;
//                     }
//                   }
//                   else if (guesses > 99) {
//                     console.log('Too many guesses.  Escaping loops to prevent crash.');
//                     done = true;
//                     solution.push('failed');
//                     i = 10;
//                   }
//                   else {
//                     cells = originalArray;
//                     originalArray = duplicate(cells);
//                   }
//                 }
//               }
//             }
//           }
//         }
//       })
//     }
//     // document.getElementById(holderId).value = toString(holderValue);
//     // document.getElementById(holderId).placeholder = toString(holderValue);
//     if (solution.length != 1) {
//       setCells(
//       solution

//       )
//     }
//     setfunctionOngoing(false);
//     document.body.style.cursor = "default";
//     return;
//   }
//   newFunction(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved, solved, hasChanged);

//   return;
// }

export {
  resolveSelectedCellNumberFromBlockNumberAndCellNumber,
  resolveCellNumberFromRowAndColumnNumber,
  resolveIsRealtedToSelectedCellNumber,
  calculateIfBlockIsSolved,
  testIfCellsContainAContradiction,
  testIfSolutionIsFound,
  calculateValuePotentials,
  testPotentialsForNakedSingles,
  testPotentialsForColumnLones,
  testPotentialsForRowLones,
  testPotentialsForBlockLones,
  formNewValueHistoryWithNewKnowns,
  solvePuzzle,
  // addKnowns,
  // testForKnowns,
  // testCols,
  // testRows,
  // testBlocks,
  // testLinkedPairs,
  // bruteForce,
  // solve,
  // bruteSolve,
  // guessAndBruteSolve,
  // resetEverything
};
