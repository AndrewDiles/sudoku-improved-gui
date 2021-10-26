import styled from "styled-components";

function NumberSelection({ selectedCellNumber }) {
  return (
    <Container>
      <Button>1</Button>
      <Button>2</Button>
      <Button>3</Button>
      <Button>4</Button>
      <Button>5</Button>
      <Button>6</Button>
      <Button>7</Button>
      <Button>8</Button>
      <Button>9</Button>
    </Container>
  );
}

export default NumberSelection;
const Container = styled.span`
  position: absolute;
  overflow-x: scroll;
  white-space: nowrap;
  bottom: -10px;
  @media screen and (min-width: 300px) {
    bottom: -20px;
  }
  @media screen and (min-width: 500px) {
    bottom: -40px;
  }
`;
const Button = styled.button`
  text-align: center;
  height: 24px;
  width: 24px;
  margin: 0 1px;
  @media screen and (min-width: 300px) {
    height: 30px;
    width: 30px;
    margin: 0 2px;
  }
  @media screen and (min-width: 500px) {
    height: 45px;
    width: 45px;
    margin: 0 5px;
  }
`;
