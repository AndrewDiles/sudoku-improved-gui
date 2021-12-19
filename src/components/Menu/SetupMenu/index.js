import styled from "styled-components";
import OptionButton from "../OptionButton";

function SetupMenu({
  themeNumber,
  difficulty,
  setDifficulty,
	placeInHistory,
  setPlaceInHistory,
}) {
  const difficulties = [
    "custom",
    "easy",
    "medium",
    "hard",
    "very hard",
    "challenge",
    "extreme",
    "epic",
		"solved-test",
		// "x-wing-columns",
  ];
  return (
    <Container>
      <Label className="centered">Select New Puzzle Type</Label>
      <ButtonsContainer>
        {difficulties.map((difficultyName, index) => {
          let label = `Set difficulty to ${difficultyName} button`;
          if (difficultyName === "custom") {
            label = "Enter custom puzzle button";
          }
          return (
            <OptionButton
              key={index}
              themeNumber={themeNumber}
              label={label}
              title={label}
              isSelected={difficulty === difficultyName}
              handleClick={() => {
                if (difficultyName !== difficulty) {
                  setPlaceInHistory(0);
                  setDifficulty(difficultyName);
                }
              }}
            >
              {difficultyName}
            </OptionButton>
          );
        })}
      </ButtonsContainer>
    </Container>
  );
}

export default SetupMenu;
const Container = styled.div`
  /* padding-bottom: 10px; */
  display: flex;
  text-align: center;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  /* @media screen and (min-width: 500px) {
    padding-bottom: 20px;
  } */
`;
const Label = styled.p`
  width: fit-content;
  margin: auto;
  padding-bottom: 10px;
  @media screen and (min-width: 500px) {
    padding-bottom: 20px;
    font-size: 1.5rem;
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media screen and (min-width: 1000px) {
    margin-top: 22px;
  }
`;
