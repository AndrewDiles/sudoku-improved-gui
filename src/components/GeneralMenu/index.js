import styled from "styled-components";
import OptionButton from "../shared/OptionButton";

function SetupMenu({
  themeNumber,
  difficulty,
  setDifficulty,
  hasStarted,
  setHasStarted,
}) {
  return (
    <Container>
      <ButtonsContainer>
        {difficulty && hasStarted ? (
          <OptionButton
            themeNumber={themeNumber}
            label={"Begin solving puzzle button"}
            title={"Begin solving puzzle button"}
            handleClick={() => setHasStarted(true)}
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
						isDisabled = {!difficulty}
          >
            Begin
          </OptionButton>
        )}
        {difficulty === "custom" && (
          <OptionButton
            themeNumber={themeNumber}
            label={"Clear cell button"}
            title={"Clear cell button"}
            // handleClick={() => setHasStarted(true)}
            handleClick={() => {}}
            height="fit-content"
          >
            Clear Cell
          </OptionButton>
        )}
      </ButtonsContainer>
    </Container>
  );
}

export default SetupMenu;
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
