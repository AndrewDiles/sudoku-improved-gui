import styled from "styled-components";
import {
  resolveSelectedCellNumberFromBlockNumberAndCellNumber,
  resolveIsRealtedToSelectedCellNumber,
  calculateIfBlockIsSolved,
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
  contradictionExists,
  solverOptionsOpen,
  solverPotentials,
}) {
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
      <GridContainer
        themeNumber={themeNumber}
        isSolved={isSolved}
        contradictionExists={contradictionExists}
      >
        {Array.from(Array(9).keys()).map((blockNumber) => {
          let blockIsSolved;
					console.log({valueHistory});
					console.log({placeInHistory})
          if (contradictionExists) {
            blockIsSolved = false;
          } else {
            blockIsSolved = calculateIfBlockIsSolved(
              blockNumber + 1,
              valueHistory[placeInHistory]
            );
          }
          return (
            <Block
              key={blockNumber}
              themeNumber={themeNumber}
              blockNumber={1 + blockNumber}
              blockIsSolved={blockIsSolved}
              contradictionExists={contradictionExists}
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
                return innerContent || !solverOptionsOpen ? (
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
                    isRelatedToSelectedCell={resolveIsRealtedToSelectedCellNumber(
                      selectedCellNumber,
                      blockNumber + 1,
                      cellNumber + 1
                    )}
                    numberMatchesSelectedCellNumber={
                      valueHistory[placeInHistory][
                        resolveSelectedCellNumberFromBlockNumberAndCellNumber(
                          1 + blockNumber,
                          1 + cellNumber
                        )
                      ] &&
                      valueHistory[placeInHistory][
                        resolveSelectedCellNumberFromBlockNumberAndCellNumber(
                          1 + blockNumber,
                          1 + cellNumber
                        )
                      ] === valueHistory[placeInHistory][selectedCellNumber]
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
                ) : (
                  <Potentials
                    key={cellNumber}
                    themeNumber={themeNumber}
                    containsNewInfo={
                      solverPotentials[
                        resolveSelectedCellNumberFromBlockNumberAndCellNumber(
                          1 + blockNumber,
                          1 + cellNumber
                        )
                      ].containsNewInformation
                    }
                    isSelected={
                      selectedCellNumber ===
                      resolveSelectedCellNumberFromBlockNumberAndCellNumber(
                        1 + blockNumber,
                        1 + cellNumber
                      )
                    }
                    isRelatedToSelectedCell={resolveIsRealtedToSelectedCellNumber(
                      selectedCellNumber,
                      blockNumber + 1,
                      cellNumber + 1
                    )}
										onClick={() => {
                      setSelectedCellNumber(
                        resolveSelectedCellNumberFromBlockNumberAndCellNumber(
                          1 + blockNumber,
                          1 + cellNumber
                        )
                      );
                    }}
                  >
                    {solverPotentials[
                      resolveSelectedCellNumberFromBlockNumberAndCellNumber(
                        1 + blockNumber,
                        1 + cellNumber
                      )
                    ].potentials.map((value, index) => {
                      // console.log({value})
                      return index === 0 ? null : (
                        <Potential
                          key={index}
                          themeNumber={themeNumber}
                          isImpossible={value === false}
                          isFound={value === true}
                        >
                          {index}
                        </Potential>
                      );
                    })}
                  </Potentials>
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
  border-color: ${(p) =>
    p.isSolved
      ? `var(--yes-${p.themeNumber})`
      : p.contradictionExists
      ? `var(--no-${p.themeNumber})`
      : "transparent"};
  /* grid-gap: 1px; */
  background: ${(p) => `var(--text-${p.themeNumber})`};
  /* background: ${(p) =>
    p.isSolved
      ? "linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3)"
      : `var(--text-${p.themeNumber})`}; */
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

  border: ${(p) =>
    p.contradictionExists
      ? `1px var(--no-${p.themeNumber}) solid`
      : p.blockIsSolved
      ? `1px var(--yes-${p.themeNumber}) solid`
      : `1px var(--text-${p.themeNumber}) solid`};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
	@media screen and (min-width: 500px) {
    border: ${(p) =>
    p.contradictionExists
      ? `2px var(--no-${p.themeNumber}) solid`
      : p.blockIsSolved
      ? `2px var(--yes-${p.themeNumber}) solid`
      : `2px var(--text-${p.themeNumber}) solid`};
  }
`;
const Cell = styled.div`
  height: min(10vw, 50px);
  width: min(10vw, 50px);
  font-weight: ${(p) =>
    p.numberMatchesSelectedCellNumber
      ? "800"
      : p.originalNumber
      ? "600"
      : "inherit"};
			/* -webkit-text-fill-color: ${p => p.numberMatchesSelectedCellNumber &&`var(--border-${p.themeNumber})`}; */
    -webkit-text-stroke-width: medium;
    -webkit-text-stroke-color: ${p => p.numberMatchesSelectedCellNumber &&`var(--yes-${p.themeNumber})`};
  background: ${(p) =>
    p.isSelected
      ? `radial-gradient(var(--bg2-${p.themeNumber}), var(--bg2-${p.themeNumber}), var(--bg-${p.themeNumber}))`
      : p.isRelatedToSelectedCell
      ? `radial-gradient(var(--bg2-${p.themeNumber}), var(--bg-${p.themeNumber}))`
      : `var(--bg-${p.themeNumber})`};
  outline: ${(p) => p.isSelected && `2px solid var(--hover-${p.themeNumber})`};
  outline-offset: -2px;
  transform: scale(1);
  :hover {
    cursor: pointer;
    outline: ${(p) =>
      p.isSelected
        ? `2px solid var(--hover-${p.themeNumber})`
        : `1px solid var(--hover-${p.themeNumber})`};
    transform: scale(1.05);
    background: ${(p) =>
      p.isSelected
        ? `radial-gradient(var(--bg3-${p.themeNumber}), var(--bg3-${p.themeNumber}), var(--bg-${p.themeNumber}))`
        : `radial-gradient(var(--bg2-${p.themeNumber}), var(--bg2-${p.themeNumber}), var(--bg-${p.themeNumber}))`};
  }
  :active {
    background: ${(p) =>
      `radial-gradient(var(--bg3-${p.themeNumber}), var(--bg3-${p.themeNumber}), var(--bg-${p.themeNumber}))`};
    outline: ${(p) => `1px solid var(--focus-${p.themeNumber})`};
  }
  font-size: min(10px + 3vw, 40px);
`;

const Potentials = styled.div`
  height: min(10vw, 50px);
  width: min(10vw, 50px);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  background: ${(p) =>
    p.isSelected
      ? `radial-gradient(var(--bg2-${p.themeNumber}), var(--bg2-${p.themeNumber}), var(--bg-${p.themeNumber}))`
      : p.isRelatedToSelectedCell
      ? `radial-gradient(var(--bg2-${p.themeNumber}), var(--bg-${p.themeNumber}))`
      : `var(--bg-${p.themeNumber})`};
  outline: ${(p) =>
    p.containsNewInfo
      ? `2px solid var(--yes-${p.themeNumber})`
      : p.isSelected
      ? `2px solid var(--hover-${p.themeNumber})`
      : ""};
  outline-offset: -2px;
  transform: scale(1);
  :hover {
    cursor: pointer;
    outline: ${(p) =>
      p.isSelected
        ? `2px solid var(--hover-${p.themeNumber})`
        : `1px solid var(--hover-${p.themeNumber})`};
    transform: scale(1.05);
    background: ${(p) =>
      p.isSelected
        ? `radial-gradient(var(--bg3-${p.themeNumber}), var(--bg3-${p.themeNumber}), var(--bg-${p.themeNumber}))`
        : `radial-gradient(var(--bg2-${p.themeNumber}), var(--bg2-${p.themeNumber}), var(--bg-${p.themeNumber}))`};
  }
  :active {
    background: ${(p) =>
      `radial-gradient(var(--bg3-${p.themeNumber}), var(--bg3-${p.themeNumber}), var(--bg-${p.themeNumber}))`};
    outline: ${(p) => `1px solid var(--focus-${p.themeNumber})`};
  }
`;
const Potential = styled.p`
  margin: 0;
  font-size: min(4px + 1vw, 14px);
  color: ${(p) =>
    p.isImpossible
      ? `var(--no-${p.themeNumber})`
      : p.isFound
      ? `var(--yes-${p.themeNumber})`
      : `var(--text-${p.themeNumber})`};
`;
