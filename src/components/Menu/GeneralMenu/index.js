import styled from "styled-components";
import OptionButton from "../OptionButton";

function SetupMenu({
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
}) {
  return (
    <Container>
      <ButtonsContainer>
        {difficulty && hasStarted ? (
          <OptionButton
            themeNumber={themeNumber}
            label={"Begin solving puzzle button"}
            title={"Begin solving puzzle button"}
            handleClick={() => setHasStarted(false)}
            height="fit-content"
          >
            Restart
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
        {difficulty === "custom" && !hasStarted && (
          <OptionButton
            themeNumber={themeNumber}
            label={"Clear cell button"}
            title={"Clear cell button"}
						id = "clear cell button"
            isDisabled={!valueHistory[placeInHistory][selectedCellNumber]}
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
          isDisabled={placeInHistory === valueHistory.length-1}
          handleClick={() => {
            if (placeInHistory !== valueHistory.length) {
              setPlaceInHistory(placeInHistory + 1);
            }
          }}
          height="fit-content"
        >
          Next
        </OptionButton>
				{/* ⤺ */}
        {/* ⇽ ⇾ */}
        {/* ⇦ ⇨ */}
        {/* ⬅ ⮕ */}
				{/* ⤑ ⤅  ➝*/}
      </ButtonsContainer>
    </Container>
  );
}

export default SetupMenu;
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
