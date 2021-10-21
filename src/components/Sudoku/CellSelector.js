import { useEffect, useState } from "react";

function CellSelector({ cellLocation, selectedCellNumber, setSelectedCellNumber }) {
	// const [updated, setUpdated] = useState(true);
	let keyDownFunction = (e) => {
		if (e.code === "KeyS" || e.code === "ArrowDown") {
			if (cellLocation.a > 71) {
				cellLocation.a-=72;
				setSelectedCellNumber(cellLocation.a);
			} else {
				cellLocation.a+=9;
				setSelectedCellNumber(cellLocation.a);
			}
		} else if (e.code === "KeyW" || e.code === "ArrowUp") {
			if (cellLocation.a < 9) {
				cellLocation.a+=72;
				setSelectedCellNumber(cellLocation.a);
			} else {
				cellLocation.a-=9;
				setSelectedCellNumber(cellLocation.a);
			}
		} else if (e.code === "KeyA" || e.code === "ArrowLeft") {
			if (cellLocation.a % 9 === 0) {
				console.log('flip')
				cellLocation.a+=8;
				setSelectedCellNumber(cellLocation.a);
			} else {
				console.log('regular left')
				cellLocation.a--;
				setSelectedCellNumber(cellLocation.a);
			}
		} else if (e.code === "KeyD" || e.code === "ArrowRight") {
			if ((cellLocation.a - 8) % 9 === 0) {
				console.log('flip')
				cellLocation.a-=8;
				setSelectedCellNumber(cellLocation.a);
			} else {
				cellLocation.a++;
				setSelectedCellNumber(cellLocation.a);
			}
		}
		// console.log('setting updated to false')
		// setUpdated(false);
		// console.log({updated})
	}

	// useEffect(()=>{
	// 	console.log({updated})
	// },[updated])

  useEffect(() => {
    window.addEventListener("keydown", keyDownFunction);
  }, []);

	// useEffect(()=>{
	// 	console.log('selectedCellNumber change triggered useEffect:', selectedCellNumber);
	// 	console.log({updated})
	// 	if (updated) return;
	// 	window.removeEventListener("keydown", keyDownFunction);
	// 	setUpdated(true);
	// 	keyDownFunction = (e) => {
	// 		if (e.code === "KeyS" || e.code === "ArrowDown") {
	// 			if (selectedCellNumber > 71) {
	// 				setSelectedCellNumber(selectedCellNumber-72);
	// 			} else {
	// 				setSelectedCellNumber(selectedCellNumber+9);
	// 			}
	// 		} else if (e.code === "KeyW" || e.code === "ArrowUp") {
	// 			if (selectedCellNumber < 9) {
	// 				setSelectedCellNumber(selectedCellNumber+72);
	// 			} else {
	// 				setSelectedCellNumber(selectedCellNumber-9);
	// 			}
	// 		} else if (e.code === "KeyA" || e.code === "ArrowLeft") {
	// 			if (selectedCellNumber % 9 === 0) {
	// 				setSelectedCellNumber(selectedCellNumber+8);
	// 			} else {
	// 				setSelectedCellNumber(selectedCellNumber-1);
	// 			}
	// 		} else if (e.code === "KeyD" || e.code === "ArrowRight") {
	// 			if ((selectedCellNumber - 8) % 9 === 0) {
	// 				setSelectedCellNumber(selectedCellNumber-8);
	// 			} else {
	// 				setSelectedCellNumber(selectedCellNumber+1);
	// 			}
	// 		}
	// 		setUpdated(false);
	// 	}
	// 	window.addEventListener("keydown", keyDownFunction);
	// },[selectedCellNumber])

  return null;
}

export default CellSelector;
