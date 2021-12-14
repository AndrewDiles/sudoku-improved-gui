import { useState } from "react";
import styled from "styled-components";
import ColorThemeSelection from "./components/ColorThemeSelection";
import Header from "./components/Header";
import Sudoku from "./components/Sudoku";

function App() {
  const [themeNumber, setThemeNumber] = useState(0);
  return (
    <MasterContainer themeNumber={themeNumber}>
      <Header />
      <ColorThemeSelection
        themeNumber={themeNumber}
        setThemeNumber={setThemeNumber}
      />
      <Sudoku themeNumber={themeNumber} />
    </MasterContainer>
  );
}

export default App;
const MasterContainer = styled.main`
  text-align: center;
  box-sizing: border-box;
  min-height: 100vh;
  min-width: 100vw;
  background: ${(p) => `var(--bg-${p.themeNumber})`};
  color: ${(p) => `var(--text-${p.themeNumber})`};
`;
