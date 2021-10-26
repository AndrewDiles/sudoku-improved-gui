import {useState} from "react";
import styled from "styled-components";
import ColorThemeSelection from "./components/ColorThemeSelection";
import Header from "./components/Header";
// import Options from "./components/Options";
import Sudoku from "./components/Sudoku";

function App() {
	const [themeNumber, setThemeNumber] = useState(0);
  return (
    <MasterContainer className="App" themeNumber = {themeNumber}>
			<Header/>
			<ColorThemeSelection setThemeNumber = {setThemeNumber}/>
			
			<SudokuAndOptionsContainer>
				{/* <Options themeNumber = {themeNumber}/> */}
				<Sudoku themeNumber = {themeNumber}/>
			</SudokuAndOptionsContainer>
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
const SudokuAndOptionsContainer = styled.section`
	text-align: center;
  display: flex;
  width: 100%;
  justify-content: center;
	flex-direction: column;
	@media screen and (min-width: 1000px) {
    flex-direction: row;
  }
`