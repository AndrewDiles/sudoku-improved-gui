import styled from "styled-components";

function ColorThemeSelection({ themeNumber, setThemeNumber }) {
	console.log(Array.from(Array(10).keys()))
  return (
    <ButtonsContainer className="App" themeNumber={themeNumber}>
      {(Array.from(
        Array(10).keys()).map((number, index) => {
          return <p key={index}>{number}</p>;
        })
      )}
    </ButtonsContainer>
  );
}

export default ColorThemeSelection;
const ButtonsContainer = styled.div`
  padding-bottom: 20px;
  text-align: center;
  box-sizing: border-box;
	display: flex;
	width: 100%;
	padding: 20px;
	justify-content: center;
`;
