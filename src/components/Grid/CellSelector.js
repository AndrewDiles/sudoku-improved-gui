import { useEffect } from "react";

function CellSelector({ setSelectedCellNumber }) {
  const handleKeyDown = (e) => {
    if (e.key && parseInt(e.key) > 0 && parseInt(e.key) < 10) {
      let buttonElementToPress = document.getElementById(
        `Button Number ${parseInt(e.key)}`
      );
      if (buttonElementToPress) {
        buttonElementToPress.click();
      }
    } else if (
      e.code === "Backspace" ||
      e.code === "Delete" ||
      e.code === "Space"
    ) {
      let buttonElementToPress = document.getElementById("clear cell button");
      if (buttonElementToPress) {
        buttonElementToPress.click();
      }
    } else {
      setSelectedCellNumber((currentLocation) => {
        if (e.code === "KeyS" || e.code === "ArrowDown") {
          return currentLocation > 71
            ? currentLocation - 72
            : currentLocation + 9;
        } else if (e.code === "KeyW" || e.code === "ArrowUp") {
          return currentLocation < 9
            ? currentLocation + 72
            : currentLocation - 9;
        } else if (e.code === "KeyA" || e.code === "ArrowLeft") {
          return currentLocation % 9 === 0
            ? currentLocation + 8
            : currentLocation - 1;
        } else if (e.code === "KeyD" || e.code === "ArrowRight") {
          return (currentLocation - 8) % 9 === 0
            ? currentLocation - 8
            : currentLocation + 1;
        } else {
          return currentLocation;
        }
      });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
  }, []);

  return null;
}

export default CellSelector;
