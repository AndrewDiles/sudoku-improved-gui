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
    font-size: 1rem;
  }
  @media screen and (min-width: 1000px) {
    flex-direction: column;
  }
`;
const Label = styled.p`
padding: 0 10px;
width: fit-content;
`;
const ButtonsContainer = styled.div`
`