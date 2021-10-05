import {useState} from "react";
import styled from "styled-components";
import ColorThemeSelection from "./components/ColorThemeSelection";

function App() {
	const [themeNumber, setThemeNumber] = useState(0);
  return (
    <MasterContainer className="App" themeNumber = {themeNumber}>
			<ColorThemeSelection themeNumber = {themeNumber} setThemeNumber = {setThemeNumber}/>
    </MasterContainer>
  );
}

export default App;
const MasterContainer = styled.div`
	text-align: center;
	box-sizing: border-box;
	min-height: 100vh;
	min-width: 100vw;
	background: ${p=>`var(--bg-${p.themeNumber})`};
	color: ${p=>`var(--text-${p.themeNumber})`};
`
