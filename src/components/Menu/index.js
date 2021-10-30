import styled from "styled-components";

function Menu({ themeNumber }) {
  return (
    <Container>
      <Label>Some information</Label>
      <ButtonsContainer>
        <button>useless</button>
        <button>buttons</button>
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
  }
`;
const ButtonsContainer = styled.div`
`