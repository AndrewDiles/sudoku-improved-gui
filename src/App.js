import {useState} from "react";
import styled from "styled-components";
import ColorThemeSelection from "./components/ColorThemeSelection";
import Sudoku from "./components/Sudoku";
import JoshTest from "./components/Sudoku/JoshTest";

function App() {
	const [themeNumber, setThemeNumber] = useState(0);
  return (
    <MasterContainer className="App" themeNumber = {themeNumber}>
			<ColorThemeSelection themeNumber = {themeNumber} setThemeNumber = {setThemeNumber}/>
			<Sudoku themeNumber = {themeNumber}/>
			{/* <JoshTest/> */}
    </MasterContainer>
  );
}

export default App;
const MasterContainer = styled.main`
	text-align: center;
	box-sizing: border-box;
	min-height: 100vh;
	min-width: 100vw;
	background: ${p=>`var(--bg-${p.themeNumber})`};
	color: ${p=>`var(--text-${p.themeNumber})`};
`
