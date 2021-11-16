import styled from "styled-components";
import NumberButton from "./NumberButton";

function NumberSelection({
  hasStarted,
  difficulty,
  themeNumber,
  selectedCellNumber,
	valueHistory,
	setValueHistory,
	placeInHistory,
	setPlaceInHistory,
}) {
  return (
    <Container>
      {Array.from(Array(9).keys()).map((n) => {
				const isDisabledWhileNotCustomPreStart = !hasStarted && difficulty !== "custom";
				const isDisabledBecauseSelectedKnownPostStart = hasStarted && valueHistory[0][selectedCellNumber];
        return (
          <NumberButton
            key={n}
            themeNumber={themeNumber}
            selectedCellNumber={selectedCellNumber}
            number={n+1}
						// isDisabled = {!hasStarted && difficulty !== "custom"}
						isDisabled = {isDisabledWhileNotCustomPreStart || isDisabledBecauseSelectedKnownPostStart}
						hasStarted = {hasStarted}
						difficulty = {difficulty}
						valueHistory = {valueHistory}
						setValueHistory = {setValueHistory}
						placeInHistory = {placeInHistory}
						setPlaceInHistory={setPlaceInHistory}
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
