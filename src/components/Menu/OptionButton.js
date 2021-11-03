import styled from "styled-components";

function OptionButton({
  themeNumber,
  label,
  title,
  isSelected,
  handleClick,
  children,
}) {
  return (
    <Button
      n={themeNumber}
      aria-label={label}
      title={title}
      isSelected={isSelected}
      onClick={() => {
        handleClick ? handleClick() : console.log("no handleClick function");
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

  /* background-image: linear-gradient(
      red 5px,
      transparent 0.1em
  ),
  linear-gradient(90deg, transparent 25%, purple 0.1em); */

  outline: ${(p) => p.isSelected && `3px solid var(--text-${p.n})`};
  transform: scale(1);
	outline-offset: -2px;
	text-decoration: ${(p) => p.isSelected && "underline"};
  :hover {
    outline: 2px solid ${(p) => `var(--hover-${p.n})`};
    background: ${(p) => `var(--bg2-${p.n})`};
    cursor: pointer;
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

// const Button = styled.button`
//   text-align: center;
//   background: ${(p) => `var(--bg-${p.themeNumber})`};
//   border: ${(p) => `2px solid var(--border-${p.themeNumber})`};
//   color: ${(p) => `var(--text-${p.themeNumber})`};
//   height: 24px;
//   width: 24px;
//   margin: 0 1px;
//   font-size: 10px;
//   @media screen and (min-width: 320px) {
//     height: 30px;
//     width: 30px;
//     margin: 0 2px;
//     font-size: 14px;
//   }
//   @media screen and (min-width: 500px) {
//     height: 45px;
//     width: 45px;
//     margin: 0 5px;
//     font-size: 26px;
//   }
//   outline-offset: -2px;
//   :hover {
// 		background: ${(p) => `var(--bg2-${p.themeNumber})`};
//     outline: 2px solid ${(p) => `var(--hover-${p.themeNumber})`};
//     cursor: pointer;
//   }
//   :focus {
//     outline: 2px solid ${(p) => `var(--focus-${p.themeNumber})`};
//   }
//   :active {
//     outline: 2px solid ${(p) => `var(--focus-${p.themeNumber})`};
//     font-weight: 900;
// 		background: ${(p) => `var(--bg3-${p.themeNumber})`};
//   }
// `;
