import styled from "styled-components";

function OptionButton({
  themeNumber,
  label,
  title,
  isSelected,
	id,
  handleClick,
  height,
	isDisabled,
  children,
}) {
  return (
    <Button
      n={themeNumber}
      aria-label={label}
      title={title}
			id = {id && id}
      isSelected={isSelected}
      height={height}
			isDisabled = {isDisabled}
			// disabled = {isDisabled}
      onClick={() => {
        isDisabled ? console.log("button disabled") : handleClick ? handleClick() : console.log("no handleClick function");
      }}
    >
      {children}
    </Button>
  );
}

export default OptionButton;

const Button = styled.button`
  font-size: 0.7rem;
  text-align: center;
  margin: 0 5px 10px;
  background: ${(p) => `var(--bg-${p.n})`};
  border: ${(p) => `2px solid var(--border-${p.n})`};
  color: ${(p) => `var(--text-${p.n})`};
  outline: ${(p) => p.isSelected && `3px solid var(--text-${p.n})`};
  transform: scale(1);
  outline-offset: -2px;
  text-decoration: ${(p) => p.isSelected && "underline"};
	opacity: ${p => p.isDisabled && "0.5"};
  height: ${(p) => p.height && p.height};
  flex: 0;
	white-space: nowrap;
  :hover {
    outline: 2px solid ${(p) => `var(--hover-${p.n})`};
    background: ${(p) => `var(--bg2-${p.n})`};
    cursor: ${p => p.isDisabled ? "not-allowed" : "pointer"};
  }
  :focus {
    outline: 2px solid ${(p) => `var(--focus-${p.n})`};
  }
  :active {
    outline: 2px solid ${(p) => `var(--focus-${p.n})`};
    transform: scale(0.95);
    background: ${(p) => `var(--bg3-${p.n})`};
  }
  transition: transform 0.3s ease-in-out;
  padding: 5px 10px;
  @media screen and (min-width: 500px) {
    padding: 8px 15px;
    font-size: 1rem;
  }
`;
