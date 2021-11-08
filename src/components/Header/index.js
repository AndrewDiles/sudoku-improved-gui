import styled from "styled-components";

function Header() {
  return <H1>Sudoku Solver 2.0</H1>;
}

export default Header;
const H1 = styled.h1`
  margin: 0;
  padding-top: 10px;
  @media screen and (min-width: 500px) {
    padding-top: 20px;
  }
`;
