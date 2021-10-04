import {useState} from "react";
import styled from "styled-components";

function App() {
	const [themeNumber, setThemeNumber] = useState(0);
  return (
    <MasterContainer className="App" themeNumber = {themeNumber}>
			Here is some stuff
    </MasterContainer>
  );
}

export default App;
const MasterContainer = styled.div`
	text-align: center;
	box-sizing: border-box;
	min-height: 100vh;
	min-width: 100vw;
	background: ${p=>`var(--bg${p.themeNumber})`};
`
