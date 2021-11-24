import styled from "styled-components";

function SetColorButton({ n, colorName, isSelected, setThemeNumber }) {
  return (
    <Button
      n={n}
			isSelected = {isSelected}
      aria-label={`Set color to ${colorName} button`}
      title={`Set color to ${colorName} button`}
      onClick={() => {
        setThemeNumber(n);
        const colorPref = {
          n,
        };
        window.localStorage.setItem("colorPref", JSON.stringify(colorPref));
      }}
    >
      {colorName}
    </Button>
  );
}

export default SetColorButton;
const Button = styled.button`
  font-size: 0.7rem;
  margin: 0 5px 10px;
  background: ${(p) => `var(--bg-${p.n})`};
  border: ${(p) => `2px solid var(--border-${p.n})`};
  color: ${(p) => `var(--text-${p.n})`};
	text-decoration: ${p => p.isSelected && "underline"};
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
	outline: ${p=>p.isSelected && `3px solid var(--text-${p.n})`};
	padding: 5px 10px;
  @media screen and (min-width: 500px) {
    padding: 8px 15px;
    font-size: 1rem;
  }
  :hover {
    outline: 2px solid ${(p) => `var(--hover-${p.n})`};
    cursor: pointer;
  }
  :focus {
    outline: 2px solid ${(p) => `var(--focus-${p.n})`};
  }
  :active {
    outline: 2px solid ${(p) => `var(--focus-${p.n})`};
    transform: scale(0.95);
  }
  transition: transform 0.3s ease-in-out;
  
`;
