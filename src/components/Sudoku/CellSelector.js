import { useEffect } from "react";

function CellSelector({
  setSelectedCellNumber,
}) {
  const handleKeyDown = (e) => {
    if (e.code === "KeyS" || e.code === "ArrowDown") {
      setSelectedCellNumber((currentLocation) => { return currentLocation > 71 ? currentLocation-72 : currentLocation+9 });
    } else if (e.code === "KeyW" || e.code === "ArrowUp") {
			setSelectedCellNumber((currentLocation) => { return currentLocation < 9 ? currentLocation+72 : currentLocation-9 });
    } else if (e.code === "KeyA" || e.code === "ArrowLeft") {
			setSelectedCellNumber((currentLocation) => { return currentLocation % 9 === 0 ? currentLocation+8 : currentLocation-1 });
    } else if (e.code === "KeyD" || e.code === "ArrowRight") {
			setSelectedCellNumber((currentLocation) => { return (currentLocation -8) % 9 === 0 ? currentLocation-8 : currentLocation+1 });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
  }, []);

  return null;
}

export default CellSelector;
