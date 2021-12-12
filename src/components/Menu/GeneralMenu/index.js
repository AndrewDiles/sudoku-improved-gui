import styled from "styled-components";
import OptionButton from "../OptionButton";
import {
  testPotentialsForNakedSingles,
  formNewValueHistoryWithNewKnowns,
  testPotentialsForColumnLones,
  testPotentialsForRowLones,
	testPotentialsForBlockLones,
	searchForXWings,
	solvePuzzle,
} from "../../../helpers/functions";
import Loader from "../../Loader";

function GeneralMenu({
  themeNumber,
  difficulty,
  setDifficulty,
  hasStarted,
  setHasStarted,
  valueHistory,
  setValueHistory,
  placeInHistory,
  setPlaceInHistory,
  selectedCellNumber,
  solverOptionsOpen,
  setSolverOptionsOpen,
  solverPotentials,
  setSolverPotentials,
  testsOngoing,
  setTestsOngoing,
  newInfoFound,
  setNewInfoFound,
}) {
  // console.log({ solverPotentials });
  return (
    <Container>
      <ButtonsContainer>
        {difficulty && hasStarted ? (
          <OptionButton
            themeNumber={themeNumber}
            label={"Return to puzzle selection button"}
            title={"Return to puzzle selection button"}
            handleClick={() => setHasStarted(false)}
            height="fit-content"
          >
            Clear Puzzle
          </OptionButton>
        ) : (
          <OptionButton
            themeNumber={themeNumber}
            label={"Begin solving puzzle button"}
            title={"Begin solving puzzle button"}
            handleClick={() => setHasStarted(true)}
            height="fit-content"
            isDisabled={!difficulty}
          >
            Begin
          </OptionButton>
        )}
        {((difficulty === "custom" && !hasStarted) || hasStarted) && (
          <OptionButton
            themeNumber={themeNumber}
            label={"Clear cell button"}
            title={"Clear cell button"}
            id="clear cell button"
            isDisabled={
              !valueHistory[placeInHistory][selectedCellNumber] ||
              (hasStarted && valueHistory[0][selectedCellNumber])
            }
            handleClick={() => {
              if (valueHistory[placeInHistory][selectedCellNumber]) {
                let nextStep = [...valueHistory[placeInHistory]];
                nextStep[selectedCellNumber] = null;
                setValueHistory([...valueHistory, nextStep]);
                setPlaceInHistory(placeInHistory + 1);
              }
            }}
            height="fit-content"
          >
            Clear Cell
          </OptionButton>
        )}
        {hasStarted ? (
          solverOptionsOpen ? (
            <OptionButton
              themeNumber={themeNumber}
              label={"Close solver button"}
              title={"Close solver button"}
              handleClick={() => {
                setSolverOptionsOpen(false);
              }}
              height="fit-content"
            >
              Close Solver
            </OptionButton>
          ) : (
            <OptionButton
              themeNumber={themeNumber}
              label={"Open solver button"}
              title={"Open solver button"}
              handleClick={() => {
                setSolverOptionsOpen(true);
              }}
              height="fit-content"
            >
              Open Solver
            </OptionButton>
          )
        ) : null}
        {testsOngoing && <Loader themeNumber={themeNumber} />}
        {solverOptionsOpen &&
          solverPotentials &&
          !newInfoFound &&
          !testsOngoing && (
            <Span>
              <OptionButton
                themeNumber={themeNumber}
                label={"Naked singles test button"}
                title={"Naked singles test button"}
                isDisabled={testsOngoing}
                handleClick={() => {
                  setTestsOngoing(true);
                  const testResults =
                    testPotentialsForNakedSingles(solverPotentials);
                  setSolverPotentials(testResults.potentialsArray);
                  setNewInfoFound(testResults.newInfoFound);
                  setTestsOngoing(false);
                }}
                height="fit-content"
              >
                Naked Singles Test
              </OptionButton>
              <OptionButton
                themeNumber={themeNumber}
                label={"Test columns button"}
                title={"Test columns button"}
                isDisabled={testsOngoing}
                handleClick={() => {
                  setTestsOngoing(true);
                  const testResults =
                    testPotentialsForColumnLones(solverPotentials);
                  setSolverPotentials(testResults.potentialsArray);
                  setNewInfoFound(testResults.newInfoFound);
                  setTestsOngoing(false);
                }}
                height="fit-content"
              >
                Test Columns
              </OptionButton>
              <OptionButton
                themeNumber={themeNumber}
                label={"Test rows button"}
                title={"Test rows button"}
                isDisabled={testsOngoing}
                handleClick={() => {
                  setTestsOngoing(true);
                  const testResults =
                    testPotentialsForRowLones(solverPotentials);
                  setSolverPotentials(testResults.potentialsArray);
                  setNewInfoFound(testResults.newInfoFound);
                  setTestsOngoing(false);
                }}
                height="fit-content"
              >
                Test Rows
              </OptionButton>
							<OptionButton
                themeNumber={themeNumber}
                label={"Test blocks button"}
                title={"Test blocks button"}
                isDisabled={testsOngoing}
                handleClick={() => {
                  setTestsOngoing(true);
                  const testResults =
									testPotentialsForBlockLones(solverPotentials);
                  setSolverPotentials(testResults.potentialsArray);
                  setNewInfoFound(testResults.newInfoFound);
                  setTestsOngoing(false);
                }}
                height="fit-content"
              >
                Test Blocks
              </OptionButton>
							
							<OptionButton
                themeNumber={themeNumber}
                label={"X button"}
                title={"X button"}
                isDisabled={testsOngoing}
                handleClick={() => {
                  setTestsOngoing(true);
									searchForXWings(solverPotentials)
                  // const testResults =
									// testPotentialsForBlockLones(solverPotentials);
                  // setSolverPotentials(testResults.potentialsArray);
                  // setNewInfoFound(testResults.newInfoFound);
                  setTestsOngoing(false);
                }}
                height="fit-content"
              >
                X WINGS
              </OptionButton>

							<OptionButton
                themeNumber={themeNumber}
                label={"Solve puzzle button"}
                title={"Solve puzzle button"}
                isDisabled={testsOngoing}
                handleClick={() => {
                  setTestsOngoing(true);
									setTimeout(()=>{
										const testResults =
										solvePuzzle(solverPotentials);
										setSolverPotentials(testResults.potentialsArray);
										console.log(testResults.potentialsArray)
										if (testResults.newInfoFound) {
											setValueHistory(
												formNewValueHistoryWithNewKnowns(
													valueHistory,
													placeInHistory,
													testResults.potentialsArray
												)
											);
											setPlaceInHistory(placeInHistory + 1);
										}
										setTestsOngoing(false);
									},1)
                }}
                height="fit-content"
              >
                Solve Puzzle
              </OptionButton>
            </Span>
          )}
        {solverOptionsOpen && solverPotentials && newInfoFound && (
          <Span>
            <OptionButton
              themeNumber={themeNumber}
              label={"Insert new knowns button"}
              title={"Insert new knowns button"}
              handleClick={() => {
                setValueHistory(
                  formNewValueHistoryWithNewKnowns(
                    valueHistory,
                    placeInHistory,
                    solverPotentials
                  )
                );
                setPlaceInHistory(placeInHistory + 1);
                setNewInfoFound(false);
              }}
              height="fit-content"
            >
              Insert New Knowns
            </OptionButton>
          </Span>
        )}
        <Span>
          <OptionButton
            themeNumber={themeNumber}
            label={"Previous step button"}
            title={"Previous step button"}
            isDisabled={placeInHistory === 0}
            handleClick={() => {
              if (placeInHistory > 0) {
                setPlaceInHistory(placeInHistory - 1);
              }
            }}
            height="fit-content"
          >
            Previous
          </OptionButton>
          {/* {placeInHistory+1}/{valueHistory.length} */}
          <OptionButton
            themeNumber={themeNumber}
            label={"Next step button"}
            title={"Next step button"}
            isDisabled={placeInHistory === valueHistory.length - 1}
            handleClick={() => {
              if (placeInHistory !== valueHistory.length) {
                setPlaceInHistory(placeInHistory + 1);
              }
            }}
            height="fit-content"
          >
            Next
          </OptionButton>
        </Span>
        {/* ⤺ */}
        {/* ⇽ ⇾ */}
        {/* ⇦ ⇨ */}
        {/* ⬅ ⮕ */}
        {/* ⤑ ⤅  ➝*/}
      </ButtonsContainer>
    </Container>
  );
}

export default GeneralMenu;
const Container = styled.div`
  display: flex;
  text-align: center;
  display: flex;
  /* justify-content: flex-start; */
  justify-content: center;
  flex-direction: row;
`;
const Label = styled.p`
  width: fit-content;
  margin: 0;
  padding: 0 20px;
  @media screen and (min-width: 500px) {
    padding-left: 0;
  }
  @media screen and (min-width: 1000px) {
    padding: 0 0 0 20px;
    font-size: 1.5rem;
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* margin-right: 10px; */
  justify-content: center;
  /* @media screen and (min-width: 500px) {
    margin-right: 20px;
  } */
  @media screen and (min-width: 1000px) {
    /* margin-right: 0px; */
    margin-top: 22px;
  }
`;
const Span = styled.span`
  width: 100%;
`;
