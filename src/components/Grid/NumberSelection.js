import styled from "styled-components";
import NumberButton from "./NumberButton";

function NumberSelection({ themeNumber, selectedCellNumber }) {
  return (
    <Container>
      {Array.from(Array(9).keys()).map((n) => {
        return (
          <NumberButton
            key={n}
            themeNumber={themeNumber}
            selectedCellNumber={selectedCellNumber}
            number={n}
          />
        );
      })}
    </Container>
  );
}

export default NumberSelection;
const Container = styled.span`
  position: absolute;
  overflow-x: scroll;
  white-space: nowrap;
  bottom: -10px;
  /* right: auto; */
  @media screen and (min-width: 300px) {
    bottom: -20px;
  }
  @media screen and (min-width: 500px) {
    bottom: -40px;
  }
  @media screen and (min-width: 1000px) {
    right: -16px;
  }
`;