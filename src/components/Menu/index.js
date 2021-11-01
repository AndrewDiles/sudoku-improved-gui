import styled from "styled-components";
import OptionButton from "./OptionButton";

function Menu({ themeNumber, difficulty, setDifficulty }) {
  const difficulties = [
    "custom",
    "easy",
    "medium",
    "hard",
    "very hard",
    "challenge",
    "extreme",
    "epic",
  ];
  return (
    <Container>
      <Label>Select New Puzzle Type</Label>
      <ButtonsContainer>
        {difficulties.map((difficultyName, index) => {
          let label = `Set difficulty to ${difficultyName} button`;
          if (difficultyName === "custom") {
            label = `Enter custom puzzle button`;
          }
          return (
            <OptionButton
              key={index}
              themeNumber={themeNumber}
              label={label}
              title={label}
							isSelected = {difficulty===difficultyName}
              handleClick={() => setDifficulty(difficultyName)}
            >
              {difficultyName}
            </OptionButton>
          );
        })}
      </ButtonsContainer>
    </Container>
  );
}

export default Menu;
const Container = styled.div`
  padding-bottom: 20px;
  display: flex;
  text-align: center;
  display: flex;
  padding: 0 0 20px;
  justify-content: flex-start;
  flex-direction: row;
  @media screen and (min-width: 500px) {
    padding: 0 20px 20px;
    padding-left: calc(50vw - 230px);
    font-size: 1rem;
  }
  @media screen and (min-width: 1000px) {
    flex-direction: column;
    width: calc(100vw - 460px);
    padding-left: 20px;
  }
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
  margin-right: 10px;
  @media screen and (min-width: 500px) {
    margin-right: 20px;
  }
  @media screen and (min-width: 1000px) {
    margin-right: 0px;
    margin-top: 22px;
  }
`;
