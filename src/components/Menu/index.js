import styled from "styled-components";

function Menu({ themeNumber }) {
  return (
    <Container>
      <p>Some information</p>
      <button>useless</button>
      <button>buttons</button>
    </Container>
  );
}

export default Menu;
const Container = styled.div`
  padding-bottom: 20px;
  display: flex;
  text-align: center;
  display: flex;
  width: 100%;
  padding: 0 0 20px;
  justify-content: center;
  flex-direction: row;
  @media screen and (min-width: 500px) {
		padding: 0 20px 20px;
    font-size: 1rem;
  }
  @media screen and (min-width: 1000px) {
		justify-content: flex-start;
    flex-direction: column;
  }
`;
