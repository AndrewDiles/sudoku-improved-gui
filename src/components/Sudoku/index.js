import { useState } from "react";
import styled from "styled-components";
import {
  createInitialValueHistory,
  createInitialCurrentPotentials,
} from "../../helpers/functions";
import CellSelector from "./CellSelector";

function Sudoku({ themeNumber }) {
  const [inputtingOwnPuzzle, setInputtingOwnPuzzle] = useState(null);
  const [displaySelectedCellIndicator, setDisplaySelectedCellIndicator] =
    useState(false);
  const [selectedCellNumber, setSelectedCellNumber] = useState(0);
  const [valueHistory, setValueHistory] = useState(createInitialValueHistory);
  const [currentPotentials, setCurrentPotentials] = useState(
    createInitialCurrentPotentials
  );

  return (
    <Container>
			<CellSelector selectedCellNumber = {selectedCellNumber} setSelectedCellNumber = {setSelectedCellNumber}/>
      <GridContainer themeNumber={themeNumber}>
        {Array.from(Array(9).keys()).map((blockNumber) => {
          return (
            <Block
              key={blockNumber}
              themeNumber={themeNumber}
              blockNumber={1 + blockNumber}
            >
              {Array.from(Array(9).keys()).map((cellNumber) => {
                return (
                  <Cell
                    key={cellNumber}
                    themeNumber={themeNumber}
                    cellNumber={1 + cellNumber}
                  ></Cell>
                );
              })}
            </Block>
          );
        })}
      </GridContainer>
    </Container>
  );
}

export default Sudoku;
const Container = styled.div`
  padding-bottom: 20px;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding: 20px;
  justify-content: center;
  @media screen and (min-width: 500px) {
    padding: 8px 15px;
    font-size: 1rem;
  }
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border: 1px solid;
  grid-gap: 1px;
  background: ${(p) => `var(--text-${p.themeNumber})`};
`;
const Block = styled.div`
  /* height: 62px;
  width: 62px; */
  height: min(2px + 30vw, 152px);
  width: min(2px + 30vw, 152px);
  grid-gap: 1px;
  background: ${(p) => `var(--border-${p.themeNumber})`};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
const Cell = styled.div`
  height: min(10vw, 50px);
  width: min(10vw, 50px);
  background: ${(p) => `var(--bg-${p.themeNumber})`};
`;
