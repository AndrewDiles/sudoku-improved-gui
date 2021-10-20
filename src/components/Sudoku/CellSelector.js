import { useEffect } from "react";

function CellSelector({ selectedCellNumber, setSelectedCellNumber }) {
	let scopedSelectedCellNumber = 0;
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.code === "KeyS" || e.code === "ArrowDown") {
				console.log({scopedSelectedCellNumber})
        if (scopedSelectedCellNumber > 71) {
          // console.log("bottom row on down");
          scopedSelectedCellNumber -= 72;
          setSelectedCellNumber(scopedSelectedCellNumber);
        } else {
          // console.log("normal down press");
          scopedSelectedCellNumber += 9;
          setSelectedCellNumber(scopedSelectedCellNumber);
        }
      } else if (e.code === "KeyW" || e.code === "ArrowUp") {
        if (scopedSelectedCellNumber < 9) {
          // console.log("top row on up");
          scopedSelectedCellNumber += 72;
          setSelectedCellNumber(scopedSelectedCellNumber);
        } else {
          // console.log("normal up press");
          scopedSelectedCellNumber -= 9;
          setSelectedCellNumber(scopedSelectedCellNumber);
        }
      } else if (e.code === "KeyA" || e.code === "ArrowLeft") {
        if (scopedSelectedCellNumber % 9 === 0) {
          // console.log("left col on left");
          scopedSelectedCellNumber += 8;
          setSelectedCellNumber(scopedSelectedCellNumber);
        } else {
          // console.log("normal left press");
          scopedSelectedCellNumber--;
          setSelectedCellNumber(scopedSelectedCellNumber);
        }
      } else if (e.code === "KeyD" || e.code === "ArrowRight") {
        if ((scopedSelectedCellNumber - 8) % 9 === 0) {
          // console.log("right col on right");
          scopedSelectedCellNumber -= 8;
          setSelectedCellNumber(scopedSelectedCellNumber);
        } else {
          // console.log("normal right press");
          scopedSelectedCellNumber++;
          setSelectedCellNumber(scopedSelectedCellNumber);
        }
      }
    });
  }, []);

	useEffect(()=>{
		scopedSelectedCellNumber=selectedCellNumber;
		console.log('changed scopedSelectedCellNumber to ', selectedCellNumber)
	},[selectedCellNumber])

  useEffect(() => {
    console.log(selectedCellNumber);
  }, [selectedCellNumber]);

  return null;
}

export default CellSelector;
