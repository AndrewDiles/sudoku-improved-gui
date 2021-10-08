import styled from "styled-components";

function ColorThemeSelection({ themeNumber, setThemeNumber }) {
  const colorNames = ["violet", "classic"];
  return (
    <ButtonsContainer className="App" themeNumber={themeNumber}>
      {Array.from(Array(2).keys()).map((n, index) => {
        return (
          <P key={index} n={n}>
            {colorNames[n]}
          </P>
        );
      })}
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
const P = styled.button`
  margin: 0 20px;
  padding: 10px 20px;
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
:hover {
	outline: 2px solid ${p => `var(--hover-${p.n})`};
	cursor: pointer;
}
:focus {
	outline: 2px solid ${p => `var(--focus-${p.n})`};
}
:active {
	outline: 2px solid ${p => `var(--focus-${p.n})`};
}
`;

// background-image: ${ p=> `linear-gradient(
// 	red 5px,
// 	transparent 0.1em
// ),
// linear-gradient(90deg, transparent 20px, var(--bg2-${p.n}) 20px,)`};
