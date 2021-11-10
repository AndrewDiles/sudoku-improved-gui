import { useState } from "react";
import styled from "styled-components";
import Grid from "../Grid";
import Menu from "../Menu";
import LogicListeners from "../LogicListeners";
import {createInitialValueHistory} from "../../helpers/functions";

function Sudoku({ themeNumber }) {
  const [difficulty, setDifficulty] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [valueHistory, setValueHistory] = useState(createInitialValueHistory);
  return (
    <GridAndMenuContainer>
      <Menu
        themeNumber={themeNumber}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        hasStarted={hasStarted}
        setHasStarted={setHasStarted}
      />
      <Grid
        themeNumber={themeNumber}
        hasStarted={hasStarted}
        difficulty={difficulty}
      />
      <LogicListeners
        difficulty={difficulty}
        hasStarted={hasStarted}
        setHasStarted={setHasStarted}
				valueHistory = {valueHistory}
				setValueHistory = {setValueHistory}
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
