import { useState } from "react";
import styled from "styled-components";
import {
  createInitialValueHistory,
  createInitialCurrentPotentials,
  resolveSelectedCellNumberFromBlockNumberAndCellNumber,
} from "../../helpers/functions";
import NumberSelection from "./NumberSelection";
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
      <NumberSelection
        themeNumber={themeNumber}
        selectedCellNumber={selectedCellNumber}
      />
      <CellSelector
        selectedCellNumber={selectedCellNumber}
        setSelectedCellNumber={setSelectedCellNumber}
      />
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
                    className="centered"
                    themeNumber={themeNumber}
                    cellNumber={1 + cellNumber}
                    isSelected={
                      selectedCellNumber ===
                      resolveSelectedCellNumberFromBlockNumberAndCellNumber(
                        1 + blockNumber,
                        1 + cellNumber
                      )
                    }
                    onClick={() => {
                      setSelectedCellNumber(
                        resolveSelectedCellNumberFromBlockNumberAndCellNumber(
                          1 + blockNumber,
                          1 + cellNumber
                        )
                      );
                    }}
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
  /* box-sizing: border-box; */
  display: flex;
  width: 100%;
  padding-bottom: 20px;
  justify-content: center;
  position: relative;
  @media screen and (min-width: 500px) {
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
  background: ${(p) =>
    p.isSelected
      ? `radial-gradient(var(--bg2-${p.themeNumber}), var(--bg-${p.themeNumber}))`
      : `var(--bg-${p.themeNumber})`};
  outline: ${(p) => p.isSelected && `1px solid var(--hover-${p.themeNumber})`};
  outline-offset: -2px;
  :hover {
    cursor: pointer;
    outline: ${(p) => `1px solid var(--hover-${p.themeNumber})`};
  }
`;
