import styled from "styled-components";
import SetupMenu from "./SetupMenu";
import GeneralMenu from "./GeneralMenu";
import Indicators from "./Indicators";

function Menu({
  themeNumber,
  difficulty,
  setDifficulty,
  hasStarted,
  setHasStarted,
  placeInHistory,
  setPlaceInHistory,
  valueHistory,
  setValueHistory,
  selectedCellNumber,
  contradictionExists,
  isSolved,
	solverOptionsOpen,
	setSolverOptionsOpen,
}) {
  return (
    <Container>
      {!hasStarted && (
        <SetupMenu
          themeNumber={themeNumber}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          placeInHistory={placeInHistory}
          setPlaceInHistory={setPlaceInHistory}
        />
      )}
      <GeneralMenu
        themeNumber={themeNumber}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        hasStarted={hasStarted}
        setHasStarted={setHasStarted}
        valueHistory={valueHistory}
        setValueHistory={setValueHistory}
        placeInHistory={placeInHistory}
        setPlaceInHistory={setPlaceInHistory}
        selectedCellNumber={selectedCellNumber}
        solverOptionsOpen={solverOptionsOpen}
        setSolverOptionsOpen={setSolverOptionsOpen}
      />
      <Indicators
        themeNumber={themeNumber}
        contradictionExists={contradictionExists}
        isSolved={isSolved}
      />
    </Container>
  );
}

export default Menu;
const Container = styled.div`
  padding-bottom: 10px;
  display: flex;
  text-align: center;
  display: flex;
  /* padding: 0 0 20px; */
  justify-content: flex-start;
  /* flex-direction: row; */
  flex-direction: column;
  @media screen and (min-width: 500px) {
    padding: 0 20px 20px;
    padding-left: calc(50vw - 230px);
    padding-right: calc(50vw - 230px);
    font-size: 1rem;
  }
  @media screen and (min-width: 1000px) {
    /* flex-direction: column; */
    width: calc(100vw - 460px);
    padding-left: 20px;
    padding-right: 20px;
  }
`;
