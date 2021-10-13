import { useState } from "react";
import styled from "styled-components";

function Sudoku({ themeNumber }) {
  const [inputtingOwnPuzzle, setInputtingOwnPuzzle] = useState(null);
  const [displaySelectedCellIndicator, setDisplaySelectedCellIndicator] =
    useState(false);
  // const [valueHistory, setValueHistory] = useState(createInitialValueHistory);
  // const [currentPotentials, setCurrentPotentials] = useState(createInitialCurrentPotentials);

  return (
    <Container>
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
  height: 32px;
  width: 32px;
  grid-gap: 1px;
  background: ${(p) => `var(--border-${p.themeNumber})`};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media screen and (min-width: 500px) {
    height: 92px;
    width: 92px;
  }
`;
const Cell = styled.div`
  height: 10px;
  width: 10px;
  background: ${(p) => `var(--bg-${p.themeNumber})`};
  @media screen and (min-width: 500px) {
    height: 30px;
    width: 30px;
  }
`;
