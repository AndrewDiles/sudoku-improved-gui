import { useState } from "react";
import styled from "styled-components";
import Grid from "../Grid";
import Menu from "../Menu";
import LogicListeners from "../LogicListeners";
import { createInitialValueHistory } from "../../helpers/functions";

function Sudoku({ themeNumber }) {
  const [difficulty, setDifficulty] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [valueHistory, setValueHistory] = useState(createInitialValueHistory());
  const [placeInHistory, setPlaceInHistory] = useState(0);
	const [selectedCellNumber, setSelectedCellNumber] = useState(0);
	const [contradictionExists, setContradictionExists] = useState(false);
	const [isSolved, setIsSolved] = useState(false);
	const [solverOptionsOpen, setSolverOptionsOpen] = useState(false);
  return (
    <GridAndMenuContainer>
      <Menu
        themeNumber={themeNumber}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        hasStarted={hasStarted}
        setHasStarted={setHasStarted}
				placeInHistory = {placeInHistory}
				setPlaceInHistory = {setPlaceInHistory}
				valueHistory = {valueHistory}
				setValueHistory = {setValueHistory}
				selectedCellNumber = {selectedCellNumber}
				contradictionExists = {contradictionExists}
				isSolved = {isSolved}
      />
      <Grid
        themeNumber={themeNumber}
        hasStarted={hasStarted}
        difficulty={difficulty}
        valueHistory={valueHistory}
        placeInHistory={placeInHistory}
        setPlaceInHistory={setPlaceInHistory}
        setValueHistory={setValueHistory}
				selectedCellNumber = {selectedCellNumber}
				setSelectedCellNumber = {setSelectedCellNumber}
				isSolved = {isSolved}
      />
      <LogicListeners
        difficulty={difficulty}
				setDifficulty = {setDifficulty}
        hasStarted={hasStarted}
        setHasStarted={setHasStarted}
        valueHistory={valueHistory}
        setValueHistory={setValueHistory}
				placeInHistory = {placeInHistory}
				setPlaceInHistory = {setPlaceInHistory}
				contradictionExists = {contradictionExists}
				setContradictionExists={setContradictionExists}
				setIsSolved = {setIsSolved}
				setSolverOptionsOpen = {setSolverOptionsOpen}
      />
    </GridAndMenuContainer>
  );
}

export default Sudoku;

const GridAndMenuContainer = styled.section`
  text-align: center;
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  @media screen and (min-width: 1000px) {
    flex-direction: row-reverse;
  }
`;
