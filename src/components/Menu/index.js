import styled from "styled-components";

function Menu({ themeNumber }) {
  return (
    <Container>
      <Label>Select New Puzzle Type</Label>
      <ButtonsContainer>
        <button>custom</button>
        <button>easy</button>
        <button>medium</button>
        <button>hard</button>
        <button>very hard</button>
        <button>challenge</button>
        <button>extreme</button>
        <button>epic</button>
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
