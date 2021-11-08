import { useState } from "react";
import styled from "styled-components";
import Grid from "../Grid";
import Menu from "../Menu"

function Sudoku({ themeNumber }) {
  const [difficulty, setDifficulty] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  return (
    <GridAndMenuContainer>
			<Menu
			themeNumber={themeNumber}
			difficulty={difficulty}
			setDifficulty={setDifficulty}
			hasStarted={hasStarted}
			setHasStarted={setHasStarted}
			/>
      <Grid themeNumber={themeNumber} />
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
