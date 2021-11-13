import styled from "styled-components";
import { makeNextStepInInitialCustomGame } from "../../helpers/functions";

function NumberButton({
  themeNumber,
  selectedCellNumber,
  number,
  difficulty,
  hasStarted,
  isDisabled,
  valueHistory,
  setValueHistory,
  placeInHistory,
  setPlaceInHistory,
}) {
  return (
    <Button
      aria-label={`Set selected cell to ${number} button`}
      title={`Set selected cell to ${number} button`}
      themeNumber={themeNumber}
			id = {`Button Number ${number}`}
      disabled={isDisabled}
      isDisabled={isDisabled}
      onClick={() => {
        if (isDisabled) return;
        if (!hasStarted && difficulty === "custom") {
          setValueHistory(
            makeNextStepInInitialCustomGame(
              valueHistory,
              number,
              selectedCellNumber,
              placeInHistory
            )
          );
					setPlaceInHistory(placeInHistory+1)
        }
      }}
    >
      {number}
    </Button>
  );
}

export default NumberButton;

const Button = styled.button`
  text-align: center;
  background: ${(p) => `var(--bg-${p.themeNumber})`};
  border: ${(p) => `2px solid var(--border-${p.themeNumber})`};
  color: ${(p) => `var(--text-${p.themeNumber})`};
  height: 24px;
  width: 24px;
  margin: 0 1px;
  font-size: 10px;
  @media screen and (min-width: 320px) {
    height: 30px;
    width: 30px;
    margin: 0 2px;
    font-size: 14px;
  }
  @media screen and (min-width: 500px) {
    height: 45px;
    width: 45px;
    margin: 0 5px;
    font-size: 26px;
  }
  outline-offset: -2px;
  opacity: ${(p) => p.isDisabled && "0.5"};
  :hover {
    background: ${(p) => `var(--bg2-${p.themeNumber})`};
    outline: 2px solid ${(p) => `var(--hover-${p.themeNumber})`};
    cursor: ${(p) => (p.isDisabled ? "not-allowed" : "pointer")};
  }
  :focus {
    outline: 2px solid ${(p) => `var(--focus-${p.themeNumber})`};
  }
  :active {
    outline: 2px solid ${(p) => `var(--focus-${p.themeNumber})`};
    font-weight: 900;
    background: ${(p) => `var(--bg3-${p.themeNumber})`};
  }
`;
