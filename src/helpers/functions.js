  const isUnknown = (element) => element === null;
  const isTrue = (element) => element === true;
	const isFalse = (element) => element === false;

  function duplicate (object) {
    return JSON.parse(JSON.stringify(object));
  };

  function testArrayEquivalence (arr1, arr2) {
		for (let i1 = 0; i1 < arr1.length; i1++) {
			for (let i2 = 0; i2 < arr2.length; i2++) {
				if (arr1[i1] !== arr2[i2]) return false
			}
		}
    return true
  };

  //  Initiation of Puzzle

  function createInitialValueHistory () {
		let result = [];
		let cellArray = [];
		for (let i = 0; i < 81; i ++) {
			cellArray[i] = 0;
		}
		result.push(cellArray);
		return result
	}

	function createInitialCurrentPotentials () {
  	let result = [];
    for (let row=1; row<10; row++) {
      for (let col=1; col<10; col++) {
        let block = 0;
        if (row<=3 && col<=3)                     {block = 1;}
        else if (row<=3 && col>3 && col<=6)         {block = 2;}
        else if (row<=3 && col>6)                 {block = 3;}
        else if (row>3 && row<=6 && col<=3)         {block = 4;}
        else if (row>3 && row<=6 && col>3 && col<=6)  {block = 5;}
        else if (row>3 && row<=6 && col>6)          {block = 6;}
        else if (row>6 && col<=3)                 {block = 7;}
        else if (row>6 && col>3 && col<=6)          {block = 8;}
        else if (row>6 && col>6)                  {block = 9;}
				result.push({row, col, block, solved: false, potentials: ["",null,null,null,null,null,null,null,null,null]});
      }
    }
    return result;
	}

	function returnCellNumberGivenInitial(initial, cellNumber){
		switch(cellNumber){
			case 1 : return initial;
			case 2 : return initial+1;
			case 3 : return initial+2;
			case 4 : return initial+9;
			case 5 : return initial+10;
			case 6 : return initial+11;
			case 7 : return initial+18;
			case 8 : return initial+19;
			case 9 : return initial+20;
		}
	}

	function resolveSelectedCellNumberFromBlockNumberAndCellNumber (blockNumber, cellNumber) {
		switch(blockNumber){
			case 1 : return returnCellNumberGivenInitial(0, cellNumber);
			case 2 : return returnCellNumberGivenInitial(3, cellNumber);
			case 3 : return returnCellNumberGivenInitial(6, cellNumber);
			case 4 : return returnCellNumberGivenInitial(27, cellNumber);
			case 5 : return returnCellNumberGivenInitial(30, cellNumber);
			case 6 : return returnCellNumberGivenInitial(33, cellNumber);
			case 7 : return returnCellNumberGivenInitial(54, cellNumber);
			case 8 : return returnCellNumberGivenInitial(57, cellNumber);
			case 9 : return returnCellNumberGivenInitial(60, cellNumber);
		}
	}

  function setArrayForGivens (setfunctionOngoing, valueHistory, currentPotentials, setCurrentPotentials) {
    setfunctionOngoing(true);
		let replacementCurrentPotentials = duplicate(currentPotentials);
		valueHistory[0].forEach((value, index)=>{
			if (value) {
				replacementCurrentPotentials.solved = true;
				for (let i=1; i<10; i++) {
      		i === value ? replacementCurrentPotentials.potentials[i] = true : replacementCurrentPotentials.potentials[i] = false;
     		}
			}
		})
		setCurrentPotentials(replacementCurrentPotentials);
		setfunctionOngoing(false);
  }

  // function confirmInputs (setfunctionOngoing, setCells, cells, setInputted, setNoContradiction) {
  //   setfunctionOngoing(true);
  //   // console.log('cells pre function', cells);
  //   for (let r=1; r<10; r++) {
  //     for (let c=1; c<10; c++) {
  //       let temp = document.getElementById(`r${r}c${c}`).value;
  //       if (temp.length === 1 && temp>0 && temp <10) {
  //         let arrayindex = c + 9*(r-1) -1;
  //         cells[arrayindex][10] = parseInt(temp);
  //       }
  //       setCells([
  //         ...cells,
  //         // cells[arrayindex][10] = temp
  //         // `r${i}c${j}[10]`: {temp}
  //       ]
  //       )
  //       // console.log(`updated r${r}c${c} `);
  //     }
  //   }
  //   setInputted(true);
  //   // console.log('81', cells[81]);
  //   // console.log('cells post function', cells);
  //   // console.log(document.getElementById('r2c2').value);
  //   setfunctionOngoing(false);
  //   setArrayForGivens(setfunctionOngoing, cells, setCells);
  //   refreshNulls(setfunctionOngoing, cells, setCells);
  //   testContradiction(setfunctionOngoing, cells, setNoContradiction);
  // };

  function initiateEasyPuzzle () {
		let result = [];
		let cellArray = [];
    cellArray[0] = 5;
    cellArray[3] = 1;
    cellArray[6] = 7;
    cellArray[10] = 2;
    cellArray[14] = 7;
    cellArray[15] = 1;
    cellArray[18] = 3;
    cellArray[20] = 1;
    cellArray[21] = 4;
    cellArray[24] = 8;
    cellArray[25] = 5;
    cellArray[26] = 2
    cellArray[27] = 6;
    cellArray[28] = 1;
    cellArray[30] = 5;
    cellArray[31] = 7;
    cellArray[32] = 2;
    cellArray[33] = 4;
    cellArray[35] = 8;
    cellArray[38] = 2;
    cellArray[39] = 9;
    cellArray[40] = 6;
    cellArray[46] = 4;
    cellArray[49] = 3;
    cellArray[51] = 6;
    cellArray[52] = 2;
    cellArray[53] = 7;
    cellArray[54] = 4;
    cellArray[55] = 5;
    cellArray[56] = 9;
    cellArray[58] = 8;
    cellArray[61] = 7;
    cellArray[63] = 1;
    cellArray[64] = 3;
    cellArray[69] = 9;
    cellArray[70] = 8;
    cellArray[71] = 6;
    cellArray[72] = 2;
    cellArray[76] = 1;
    cellArray[79] = 4;
    cellArray[80] = 3;
		result.push(cellArray);
    return result
  };

  // function testMedium (setCells, cells, setInputted, setfunctionOngoing, setNoContradiction) {
  //   cells[1][10] = 4;
  //   cells[2][10] = 1;
  //   cells[5][10] = 8;
  //   cells[9][10] = 3;
  //   cells[11][10] = 6;
  //   cells[12][10] = 2;
  //   cells[13][10] = 4;
  //   cells[14][10] = 9;
  //   cells[16][10] = 8;
  //   cells[25][10] = 7;
  //   cells[30][10] = 4;
  //   cells[31][10] = 7;
  //   cells[33][10] = 2;
  //   cells[34][10] = 1;
  //   cells[36][10] = 7;
  //   cells[39][10] = 3;
  //   cells[42][10] = 4;
  //   cells[44][10] = 6;
  //   cells[46][10] = 2;
  //   cells[52][10] = 5;
  //   cells[53][10] = 3;
  //   cells[56][10] = 7;
  //   cells[58][10] = 9;
  //   cells[60][10] = 5;
  //   cells[65][10] = 3;
  //   cells[67][10] = 2;
  //   cells[73][10] = 5;
  //   cells[74][10] = 4;
  //   cells[76][10] = 6;
  //   cells[77][10] = 3;
  //   setCells([
  //     ...cells,
  //   ]
  //   )
  //   setInputted(true);
  //   setArrayForGivens(setfunctionOngoing, cells, setCells);
  //   refreshNulls(setfunctionOngoing, cells, setCells);
  //   testContradiction(setfunctionOngoing, cells, setNoContradiction);
  // };

  // function testHard (setCells, cells, setInputted, setfunctionOngoing, setNoContradiction) {
  //   cells[1][10] = 6;
  //   cells[4][10] = 1;
  //   cells[6][10] = 4;
  //   cells[11][10] = 3;
  //   cells[14][10] = 2;
  //   cells[18][10] = 5;
  //   cells[19][10] = 8;
  //   cells[20][10] = 1;
  //   cells[21][10] = 6;
  //   cells[27][10] = 9;
  //   cells[29][10] = 2;
  //   cells[38][10] = 6;
  //   cells[39][10] = 9;
  //   cells[41][10] = 7;
  //   cells[42][10] = 8;
  //   cells[51][10] = 6;
  //   cells[53][10] = 1;
  //   cells[59][10] = 6;
  //   cells[60][10] = 7;
  //   cells[61][10] = 5;
  //   cells[62][10] = 4;
  //   cells[66][10] = 2;
  //   cells[69][10] = 1;
  //   cells[74][10] = 4;
  //   cells[76][10] = 9;
  //   cells[79][10] = 3;
  //   setCells([
  //     ...cells,
  //   ]
  //   )
  //   setInputted(true);
  //   setArrayForGivens(setfunctionOngoing, cells, setCells);
  //   refreshNulls(setfunctionOngoing, cells, setCells);
  //   testContradiction(setfunctionOngoing, cells, setNoContradiction);
  // };

  // function testVeryHard (setCells, cells, setInputted, setfunctionOngoing, setNoContradiction) {
  //   cells[0][10] = 7;
  //   cells[2][10] = 2;
  //   cells[4][10] = 4;
  //   cells[5][10] = 3;
  //   cells[10][10] = 6;
  //   cells[15][10] = 3;
  //   cells[18][10] = 3;
  //   cells[21][10] = 1;
  //   cells[29][10] = 1;
  //   cells[30][10] = 8;
  //   cells[31][10] = 3;
  //   cells[33][10] = 9;
  //   cells[35][10] = 7;
  //   cells[36][10] = 4;
  //   cells[39][10] = 7;
  //   cells[41][10] = 6;
  //   cells[44][10] = 2;
  //   cells[45][10] = 5;
  //   cells[47][10] = 7;
  //   cells[49][10] = 1;
  //   cells[50][10] = 9;
  //   cells[51][10] = 6;
  //   cells[59][10] = 2;
  //   cells[62][10] = 9;
  //   cells[65][10] = 4;
  //   cells[70][10] = 1;
  //   cells[75][10] = 3;
  //   cells[76][10] = 9;
  //   cells[78][10] = 4;
  //   cells[80][10] = 5;
  //   setCells([
  //     ...cells,
  //   ]
  //   )
  //   setInputted(true);
  //   setArrayForGivens(setfunctionOngoing, cells, setCells);
  //   refreshNulls(setfunctionOngoing, cells, setCells);
  //   testContradiction(setfunctionOngoing, cells, setNoContradiction);
  // };

  // function testChallenge (setCells, cells, setInputted, setfunctionOngoing, setNoContradiction) {
  //   cells[2][10] = 2;
  //   cells[8][10] = 6;
  //   cells[10][10] = 4;
  //   cells[11][10] = 5;
  //   cells[14][10] = 9;
  //   cells[19][10] = 1;
  //   cells[21][10] = 2;
  //   cells[22][10] = 8;
  //   cells[26][10] = 3;
  //   cells[27][10] = 6;
  //   cells[34][10] = 7;
  //   cells[39][10] = 5;
  //   cells[40][10] = 6;
  //   cells[41][10] = 7;
  //   cells[46][10] = 5;
  //   cells[53][10] = 8;
  //   cells[54][10] = 7;
  //   cells[58][10] = 5;
  //   cells[59][10] = 2;
  //   cells[61][10] = 4;
  //   cells[66][10] = 3;
  //   cells[69][10] = 8;
  //   cells[70][10] = 2;
  //   cells[72][10] = 4;
  //   cells[78][10] = 5;
  //   setCells([
  //     ...cells,
  //   ]
  //   )
  //   setInputted(true);
  //   setArrayForGivens(setfunctionOngoing, cells, setCells);
  //   refreshNulls(setfunctionOngoing, cells, setCells);
  //   testContradiction(setfunctionOngoing, cells, setNoContradiction);
  // };

  // function testExtreme (setCells, cells, setInputted, setfunctionOngoing, setNoContradiction) {
  //   cells[1][10] = 5;
  //   cells[8][10] = 9;
  //   cells[9][10] = 3;
  //   cells[10][10] = 4;
  //   cells[16][10] = 6;
  //   cells[18][10] = 8;
  //   cells[22][10] = 2;
  //   cells[30][10] = 6;
  //   cells[37][10] = 9;
  //   cells[40][10] = 3;
  //   cells[42][10] = 1;
  //   cells[50][10] = 9;
  //   cells[51][10] = 5;
  //   cells[53][10] = 3;
  //   cells[54][10] = 4;
  //   cells[59][10] = 8;
  //   cells[62][10] = 1;
  //   cells[66][10] = 3;
  //   cells[68][10] = 2;
  //   cells[70][10] = 7;
  //   cells[71][10] = 8;
  //   cells[72][10] = 6;
  //   cells[79][10] = 4;
  //   setCells([
  //     ...cells,
  //   ]
  //   )
  //   setInputted(true);
  //   setArrayForGivens(setfunctionOngoing, cells, setCells);
  //   refreshNulls(setfunctionOngoing, cells, setCells);
  //   testContradiction(setfunctionOngoing, cells, setNoContradiction);
  // };

  // function testEpic (setCells, cells, setInputted, setfunctionOngoing, setNoContradiction) {
  //   cells[0][10] = 8;
  //   cells[11][10] = 3;
  //   cells[12][10] = 6;
  //   cells[19][10] = 7;
  //   cells[22][10] = 9;
  //   cells[24][10] = 2;
  //   cells[28][10] = 5;
  //   cells[32][10] = 7;
  //   cells[40][10] = 4;
  //   cells[41][10] = 5;
  //   cells[42][10] = 7;
  //   cells[48][10] = 1;
  //   cells[52][10] = 3;
  //   cells[56][10] = 1;
  //   cells[61][10] = 6;
  //   cells[62][10] = 8;
  //   cells[65][10] = 8;
  //   cells[66][10] = 5;
  //   cells[70][10] = 1;
  //   cells[73][10] = 9;
  //   cells[78][10] = 4;

  //   setCells([
  //     ...cells,
  //   ]
  //   )
  //   setInputted(true);
  //   setArrayForGivens(setfunctionOngoing, cells, setCells);
  //   refreshNulls(setfunctionOngoing, cells, setCells);
  //   testContradiction(setfunctionOngoing, cells, setNoContradiction);
  // };

  // function resetInputValues () {
  //   for (let r = 1; r < 10; r++) {
  //     for (let c = 1; c < 10; c++) {
  //       if (document.getElementById(`r${r}c${c}`) !== null) {
  //         document.getElementById(`r${r}c${c}`).value = '';
  //         document.getElementById(`r${r}c${c}`).placeholder = '';
  //       }
  //     }
  //   }
  //   return
  // }

  // function resetEverything (setHasChanged, setfunctionOngoing, setCells, setInputted, setLastTested, setNoContradiction, setSolved, cells, setPlaying) {
  //   setHasChanged(true);
  //   setfunctionOngoing(true);
  //   setCells(generateIntialCellsArray());
  //   setInputted(false);
  //   setLastTested(false);
  //   setNoContradiction(true);
  //   setSolved(true);
  //   setPlaying(true);
  //   // setCells([
  //   //   ...cells,
  //   // ]
  //   // )
  //   resetInputValues();
  //   setSolved(false);
  //   setfunctionOngoing(false);
  // };

  // //  Base Solving Functions

  // function refreshNulls (setfunctionOngoing, cells, setCells) {
  //   setfunctionOngoing(true);
  //   cells.forEach((cellOut) => {
  //     // console.log('does it have a number?: ',cellOut[10]);
  //     // console.log(cellOut[10] !== '');
  //     if (cellOut[10] !== '') {
  //       let row = cellOut[0][1];
  //       let col = cellOut[0][3];
  //       let block = cellOut[11];
  //       let val = cellOut[10];
  //       cells.forEach((cellIn) => {
  //         if (cellIn[10] === '' && (cellIn[0][1] === row || cellIn[0][3] === col || cellIn[11] === block)) {
  //           cellIn[val] = false;
  //         }
  //       })
  //     }
  //   })
  //   setCells([
  //     ...cells,
  //   ]
  //   )
  //   // console.log(cells);
  //   setfunctionOngoing(false);
  // };

  // function addKnowns (setfunctionOngoing, cells, setCells, setLastTested, setNoContradiction, setSolved) {
  //   setfunctionOngoing(true);
  //   cells.forEach((cell)=> {
  //     if (cell[10] === '' || cell[10] === '') {
  //       if (cell.findIndex(isTrue) > 0) {
  //         cell[10] = cell.findIndex(isTrue);
  //         for (let i=1; i<10; i++) {
  //           i === cell[10] ? cell[i] = true : cell[i] = false;
  //         }
  //       }
  //     }
  //   })
  //   setCells([
  //     ...cells,
  //   ]
  //   )
  //   setfunctionOngoing(false);
  //   setLastTested(false);
  //   refreshNulls(setfunctionOngoing, cells, setCells);
  //   testContradiction(setfunctionOngoing, cells, setNoContradiction);
  //   setSolved(testIsSolved(setfunctionOngoing, cells, setNoContradiction, setSolved));
  // }

  // function makeUnknown (cells) {
  //   for (let cellIndex = 0; cellIndex < cells.length; cellIndex ++) {
  //     for (let unknownIndex = 1; unknownIndex < 10; unknownIndex ++) {
  //       cells[cellIndex][unknownIndex] = 'unknown';
  //     }
  //   }
  //   // console.log(cells);
  //   return
  // }

  // function testContradiction (setfunctionOngoing, cells, setNoContradiction) {
  //   setfunctionOngoing(true);
  //   let countradictionFound = false
  //   cells.forEach((cellOut)=> { 
  //     if (cellOut[10] !== '') {
  //       cells.forEach((cellIn)=>{
  //         if (cellIn[0] !== cellOut[0] && cellIn[10] === cellOut[10] && (cellIn[0][1] === cellOut[0][1] || cellIn[0][3] === cellOut[0][3] || cellIn[11] === cellOut[11])){
  //           setNoContradiction(false);
  //           countradictionFound = true;
  //           // console.log(`Contradiction between: ${cellOut[0]} and ${cellIn[0]}`)
  //         }
  //       })
  //     }
  //     if (cellOut.length !== 12){
  //       setNoContradiction(false);
  //       countradictionFound = true;
  //     }
  //     else if (cellOut[1] === false && cellOut[2] === false && cellOut[3] === false && cellOut[4] === false && cellOut[5] === false && cellOut[6] === false && cellOut[7] === false && cellOut[8] === false && cellOut[9] === false){
  //       setNoContradiction(false);
  //       countradictionFound = true;
  //     }
  //   })
  //   if (!countradictionFound) {
  //     setNoContradiction(true);
  //     setfunctionOngoing(false);
  //     return false;
  //   }
  //   else {
  //     setfunctionOngoing(false);
  //     return true;
  //   }
  // }

  // function testIsSolved (setfunctionOngoing, cells, setNoContradiction, setSolved) {    
  //   let count = 0;
  //   let solved = false;
  //   cells.forEach((cell)=> {
  //     if (cell[10] !== '') count ++
  //   })
  //   count === 81 ? solved = true : solved = false;
  //   if (testContradiction(setfunctionOngoing, cells, setNoContradiction)) {
  //     solved = false;
  //     setSolved(false);
  //     // console.log('There is a contradiction.');
  //   }
  //   if (solved) {
  //     console.log('A solution has been found!');
  //     setSolved(true);
  //   }
  //   return solved;
  // }

  // //  Level 1 Tests

  // function testForKnowns (setLastTested, setfunctionOngoing, setHasChanged, cells, setCells) {
  //   setLastTested(true);
  //   setfunctionOngoing(true);
  //   setHasChanged(false);
  //   let originalArray = duplicate(cells);
  //   // console.log(cells);
  //   cells.forEach((cell) => {
  //     // console.log(cell[10], 'is not a ''?: ', cell[10] !== '')
  //     // console.log(cell);
  //     if (cell[10] === '') {
  //       let unknownCounter = 0;
  //       for (let i=1; i<10; i++) {
  //         // console.log('cell[i] is: ', cell[i], ' is this unknown?', cell[i] === "unknown")
  //         if (cell[i] === "unknown") {
  //           unknownCounter++;
  //         }
  //       }
  //       // console.log(unknownCounter);
  //       if (unknownCounter < 2) {
  //         cell[cell.findIndex(isUnknown)] = true;
  //       }
  //     }
  //   })
  //   setCells([
  //     ...cells,
  //   ]
  //   )
  //   testArrayEquivalences(cells, originalArray) ? setHasChanged(false) : setHasChanged(true);
  //   setfunctionOngoing(false);
  //   refreshNulls(setfunctionOngoing, cells, setCells);
  // };

  // function testRows (setLastTested, setfunctionOngoing, setHasChanged, cells, setCells) {
  //   setLastTested(true);
  //   setfunctionOngoing(true);
  //   setHasChanged(false);
  //   let originalArray = duplicate(cells);
  //   for (let r=1; r<10; r++){
  //     for (let num=1; num<10; num++){
  //       let count = 0;
  //       let holder = '';
  //       // for (let i=1; i<10; i++){
  //         cells.forEach((cell, index) => {
  //           // console.log(cell[0][1]);
  //           if (parseInt(cell[0][1]) === r && parseInt(cell[10]) === num) {
  //             count -= -20;
  //             return;
  //           }
  //           else if (parseInt(cell[0][1]) === r && (cell[num] === false || cell[10] !== '')) {
  //             count ++;
  //           }
  //           else if (parseInt(cell[0][1]) === r && cell[num] === 'unknown') {
  //             holder = index;
  //           }
  //         })
  //       // }
  //       // console.log(`count for row ${r}, #${num} is: ${count}`);
  //       if (count === 8) {
  //         cells[holder][num] = true;
  //       }
  //     }
  //   }
  //   setCells([
  //     ...cells,
  //   ]
  //   )
  //   // console.log('cells: ', cells, 'original: ', originalArray, cells === originalArray);
  //   testArrayEquivalences(cells, originalArray) ? setHasChanged(false) : setHasChanged(true);
  //   setfunctionOngoing(false);
  //   refreshNulls(setfunctionOngoing, cells, setCells);
  // };

  // function testCols (setLastTested, setfunctionOngoing, setHasChanged, cells, setCells) {
  //   setLastTested(true);
  //   setfunctionOngoing(true);
  //   setHasChanged(false);
  //   let originalArray = duplicate(cells);
  //   for (let c=1; c<10; c++){
  //     for (let num=1; num<10; num++){
  //       let count = 0;
  //       let holder = '';
  //         cells.forEach((cell, index) => {
  //           if (parseInt(cell[0][3]) === c && parseInt(cell[10]) === num) {
  //             count -= -20;
  //             return;
  //           }
  //           else if (parseInt(cell[0][3]) === c && (cell[num] === false || cell[10] !== '')) {
  //             count ++;
  //           }
  //           else if (parseInt(cell[0][3]) === c && cell[num] === 'unknown') {
  //             holder = index;
  //           }
  //         })
  //       // }
  //       if (count === 8) {
  //         cells[holder][num] = true;
  //       }
  //     }
  //   }
  //   setCells([
  //     ...cells,
  //   ]
  //   )
  //   testArrayEquivalences(cells, originalArray) ? setHasChanged(false) : setHasChanged(true);
  //   setfunctionOngoing(false);
  //   refreshNulls(setfunctionOngoing, cells, setCells);
  // };

  // function testBlocks (setLastTested, setfunctionOngoing, setHasChanged, cells, setCells) {
  //   setLastTested(true);
  //   setfunctionOngoing(true);
  //   setHasChanged(false);
  //   let originalArray = duplicate(cells);
  //   for (let b=1; b<10; b++){
  //     for (let num=1; num<10; num++){
  //       let count = 0;
  //       let holder = '';
  //         cells.forEach((cell, index) => {
  //           if (parseInt(cell[11]) === b && parseInt(cell[10]) === num) {
  //             count -= -20;
  //             return;
  //           }
  //           else if (parseInt(cell[11]) === b && (cell[num] === false || cell[10] !== '')) {
  //             count ++;
  //           }
  //           else if (parseInt(cell[11]) === b && cell[num] === 'unknown') {
  //             holder = index;
  //           }
  //         })
  //       // }
  //       if (count === 8) {
  //         cells[holder][num] = true;
  //       }
  //     }
  //   }
  //   setCells([
  //     ...cells,
  //   ]
  //   )
  //   testArrayEquivalences(cells, originalArray) ? setHasChanged(false) : setHasChanged(true);
  //   setfunctionOngoing(false);
  //   refreshNulls(setfunctionOngoing, cells, setCells);
  // };

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
  createInitialValueHistory,
	createInitialCurrentPotentials,
	resolveSelectedCellNumberFromBlockNumberAndCellNumber,
  // confirmInputs,
  initiateEasyPuzzle,
  // testMedium,
  // testHard,
  // testVeryHard,
  // testChallenge,
  // testExtreme,
  // testEpic,
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