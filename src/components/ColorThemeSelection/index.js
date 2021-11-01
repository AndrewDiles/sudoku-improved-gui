import { useEffect } from "react";
import styled from "styled-components";
import SetColorButton from "./SetColorButton";

function ColorThemeSelection({ themeNumber, setThemeNumber }) {
  const colorNames = ["violet", "classic", "green"];
  useEffect(() => {
    const potentialStoredColorPref = JSON.parse(
      window.localStorage.getItem("colorPref")
    );
    if (potentialStoredColorPref) {
      setThemeNumber(potentialStoredColorPref.n);
    }
  }, []);

  return (
    <ButtonsContainer className="App">
      {Array.from(Array(colorNames.length).keys()).map((n, index) => {
        return (
          <SetColorButton
            n={n}
						isSelected={n===themeNumber}
            colorName={colorNames[n]}
            setThemeNumber={setThemeNumber}
          />
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
