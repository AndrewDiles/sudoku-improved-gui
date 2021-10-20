import styled from "styled-components";

function ColorThemeSelection({ themeNumber, setThemeNumber }) {
  const colorNames = ["violet", "classic"];
	
  return (
    <ButtonsContainer className="App">
      {Array.from(Array(2).keys()).map((n, index) => {
        return (
          <SetColorButton key={index} n={n} onClick = {()=>{setThemeNumber(n)}}>
            {colorNames[n]}
          </SetColorButton>
        );
      })}
    </ButtonsContainer>
  );
}

export default ColorThemeSelection;
const ButtonsContainer = styled.section`
  padding-bottom: 20px;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding: 20px;
  justify-content: center;
`;
const SetColorButton = styled.button`
font-size: 0.7rem;
  margin: 0 5px 10px;
  background: ${(p) => `var(--bg-${p.n})`};
  border: ${(p) => `2px solid var(--border-${p.n})`};
  color: ${(p) => `var(--text-${p.n})`};
  /* background-image: linear-gradient(
      red 5px,
      transparent 0.1em
  ),
  linear-gradient(90deg, transparent 25%, purple 0.1em); */
  background-image: ${(p) => `linear-gradient(
	var(--yes-${p.n}) 16%,
	transparent 1%,
	transparent 80%,
	transparent 1%,
	var(--no-${p.n}) 2%
),
linear-gradient(90deg, transparent 75%, var(--bg2-${p.n}) 25%)`};
transform: scale(1);
:hover {
	outline: 2px solid ${p => `var(--hover-${p.n})`};
	cursor: pointer;
}
:focus {
	outline: 2px solid ${p => `var(--focus-${p.n})`};
}
:active {
	outline: 2px solid ${p => `var(--focus-${p.n})`};
	transform: scale(0.95);
}
transition: transform 0.3s ease-in-out;
padding: 5px 10px;
@media screen and (min-width: 500px) {
	padding: 8px 15px;
	font-size: 1rem;
  }
`;
