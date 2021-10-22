import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  createInitialValueHistory,
  createInitialCurrentPotentials,
  resolveSelectedCellNumberFromBlockNumberAndCellNumber,
} from "../../helpers/functions";
import CellSelector from "./CellSelector";

function JoshTest() {
  const range = (start, end, step = 1) => {
    let output = [];
    if (typeof end === "undefined") {
      end = start;
      start = 0;
    }
    for (let i = start; i < end; i += step) {
      output.push(i);
    }
    return output;
  };

  const [activeCell, setActiveCell] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleKeydown(e) {
      if (e.code === "KeyS" || e.code === "ArrowDown") {
        if (activeCell.y === 9) {
          setActiveCell((activeCell)=>{return{ x: activeCell.x, y: 0 }});
        } else {
          setActiveCell((activeCell)=>{ return{x: activeCell.x, y: activeCell.y + 1 }});
        }
      } else if (e.code === "KeyW" || e.code === "ArrowUp") {
        if (activeCell.y === 0) {
          setActiveCell((activeCell)=>{ return{x: activeCell.x, y: 9 }});
        } else {
          setActiveCell((activeCell)=>{ return{x: activeCell.x, y: activeCell.y - 1 }});
        }
      } else if (e.code === "KeyA" || e.code === "ArrowLeft") {
        if (activeCell.x === 0) {
					setActiveCell((activeCell)=>{ return{x: 9, y: activeCell.y}});
        } else {
					setActiveCell((activeCell)=>{ return{x: activeCell.x-1, y: activeCell.y}});
        }
      } else if (e.code === "KeyD" || e.code === "ArrowRight") {
        if (activeCell.x === 9) {
					setActiveCell((activeCell)=>{ return{x: 0, y: activeCell.y}});
        } else {
          setActiveCell((activeCell)=>{ return{x: activeCell.x+1, y: activeCell.y}});
        }
      }
    }
		window.addEventListener("keydown", handleKeydown);
  }, []);

  return (
    range(9).map((y) =>
		<Row>
      {range(9).map((x) => (
        <Button
          isActive={x === activeCell.x && y === activeCell.y}
          onClick={() => setActiveCell({ x, y })}
        />
      ))}
			</Row>
    )
  );
}

export default JoshTest;

const Button = styled.button`
height: 40px;
width: 40px;
border: ${p => p.isActive && "3px solid lime"};
:hover {
	cursor: pointer;
	border: 3px solid purple;
}
`;
const Row = styled.div`
	display: grid;
	grid-template-columns: repeat(9, 42px);
`
