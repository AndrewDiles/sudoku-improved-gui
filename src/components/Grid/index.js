import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  createInitialValueHistory,
  createInitialCurrentPotentials,
  resolveSelectedCellNumberFromBlockNumberAndCellNumber,
} from "../../helpers/functions";
import NumberSelection from "./NumberSelection";
import CellSelector from "./CellSelector";

function Grid({
  themeNumber,
  hasStarted,
  difficulty,
  valueHistory,
  setValueHistory,
  placeInHistory,
  setPlaceInHistory,
  selectedCellNumber,
  setSelectedCellNumber,
  isSolved,
}) {
  const [currentPotentials, setCurrentPotentials] = useState(
    createInitialCurrentPotentials
  );

  return (
    <Container>
      <NumberSelection
        hasStarted={hasStarted}
        difficulty={difficulty}
        themeNumber={themeNumber}
        selectedCellNumber={selectedCellNumber}
        valueHistory={valueHistory}
        setValueHistory={setValueHistory}
        placeInHistory={placeInHistory}
        setPlaceInHistory={setPlaceInHistory}
      />
      <CellSelector
        selectedCellNumber={selectedCellNumber}
        setSelectedCellNumber={setSelectedCellNumber}
      />
      <GridContainer themeNumber={themeNumber} isSolved={isSolved}>
        {Array.from(Array(9).keys()).map((blockNumber) => {
          return (
            <Block
              key={blockNumber}
              themeNumber={themeNumber}
              blockNumber={1 + blockNumber}
            >
              {Array.from(Array(9).keys()).map((cellNumber) => {
                let innerContent = "";
                let testValue =
                  valueHistory[placeInHistory][
                    resolveSelectedCellNumberFromBlockNumberAndCellNumber(
                      1 + blockNumber,
                      1 + cellNumber
                    )
                  ];
                if (testValue) {
                  innerContent = testValue;
                }
                return (
                  <Cell
                    key={cellNumber}
                    className="centered"
                    themeNumber={themeNumber}
                    cellNumber={1 + cellNumber}
                    originalNumber={
                      hasStarted &&
                      valueHistory[0][
                        resolveSelectedCellNumberFromBlockNumberAndCellNumber(
                          1 + blockNumber,
                          1 + cellNumber
                        )
                      ]
                    }
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
                  >
                    {innerContent}
                  </Cell>
                );
              })}
            </Block>
          );
        })}
      </GridContainer>
    </Container>
  );
}

export default Grid;
const Container = styled.div`
  margin-bottom: 60px;
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
  @media screen and (min-width: 1000px) {
    justify-content: flex-end;
  }
`;
const GridContainer = styled.div`
  /* padding: 3px; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border: 1px solid;
  border-color: ${(p) => p.isSolved && `var(--yes-${p.themeNumber})`};
  grid-gap: 1px;
  background: ${(p) => `var(--text-${p.themeNumber})`};
  /* background: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3); */
  /* background-size: 1800% 1800%; */
`;
const Block = styled.div`
  height: min(2px + 30vw, 152px);
  width: min(2px + 30vw, 152px);
  grid-gap: 1px;
  /* background: ${(p) =>
    p.blockIsSolved
      ? `var(--yes-${p.themeNumber})`
      : `var(--border-${p.themeNumber})`}; */
  background: ${(p) => `var(--border-${p.themeNumber})`};
  outline: 2px solid blue;
  outline-offset: -2px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
const Cell = styled.div`
  height: min(10vw, 50px);
  width: min(10vw, 50px);
  font-weight: ${(p) => p.originalNumber && "600"};
  background: ${(p) =>
    p.isSelected
      ? `radial-gradient(var(--bg2-${p.themeNumber}), var(--bg-${p.themeNumber}))`
      : `var(--bg-${p.themeNumber})`};
  outline: ${(p) => p.isSelected && `1px solid var(--hover-${p.themeNumber})`};
  outline-offset: -2px;
  transform: scale(1);
  :hover {
    cursor: pointer;
    outline: ${(p) => `1px solid var(--hover-${p.themeNumber})`};
    transform: scale(1.05);
    background: ${(p) =>
      p.isSelected
        ? `radial-gradient(var(--bg3-${p.themeNumber}), var(--bg-${p.themeNumber}))`
        : `radial-gradient(var(--bg2-${p.themeNumber}), var(--bg-${p.themeNumber}))`};
  }
  :active {
    background: ${(p) =>
      `radial-gradient(var(--bg3-${p.themeNumber}), var(--bg-${p.themeNumber}))`};
    outline: ${(p) => `1px solid var(--focus-${p.themeNumber})`};
  }
  font-size: min(10px + 3vw, 40px);
`;
