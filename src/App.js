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
    // <>
		// <TVWall>
		// 	<Picture />
		// 	<HalfGap/>
		// 	<UpPicture/>
		// 	<HalfGap/>
		// 	<Picture />
		// 	<HalfGap/>
		// 	{/* <LowPicture /> */}
		// 	<Gap/>
		// 	<HalfGap/>
		// 	<Picture />
		// 	<HalfGap/>
		// 	<UpPicture/>
		// 	<HalfGap/>
		// 	<Picture />
		// </TVWall>
    //   {/* <TVWall>
    //     <Picture />
    //     <Gap />
    //     <Picture />
    //     <Gap />
    //     <Picture />
    //     <Gap />
    //     <Picture />
    //     <Gap />
    //     <Picture />
    //     <Gap />
    //   </TVWall>
    //   <br></br>
    //   <OtherWall>
    //     <Picture />
    //     <Gap />
    //     <Picture />
    //     <Gap />
    //     <Picture />
    //     <Gap />
    //     <Picture />
    //     <Gap />
    //     <Picture />
    //     <Gap />
    //   </OtherWall>
		// 	<br></br>
		// 	<br></br>
		// 	<TVWall>
    //     <Picture />
    //     <HalfGap />
    //     <Picture />
    //     <HalfGap />
    //     <Picture />
    //     <HalfGap />
    //     <Picture />
    //     <HalfGap />
    //     <Picture />
    //     <HalfGap />
		// 		<Picture />
    //     <HalfGap />
		// 		<Picture />
    //     <HalfGap />
    //   </TVWall>
    //   <br></br>
    //   <OtherWall>
    //     <Picture />
    //     <HalfGap />
    //     <Picture />
    //     <HalfGap />
    //     <Picture />
    //     <HalfGap />
    //     <Picture />
    //     <HalfGap />
    //     <Picture />
    //     <HalfGap />
		// 		<Picture />
    //     <HalfGap />
		// 		<Picture />
    //     <HalfGap />
    //   </OtherWall> */}
    // </>
  );
}

export default App;
const TVWall = styled.div`
position: relative;
  display: flex;
  width: 354.33px;
  background-color: palegreen;
  height: 150px;
  padding-top: 22.5px;
	padding-left: 16px;
`;
const OtherWall = styled.div`
position: relative;
  display: flex;
  width: 346.33px;
  background-color: pink;
  height: 150px;
  padding-top: 22.5px;
	padding-left: 16px;
`;
const Picture = styled.div`
  background-color: blue;
  height: 45px;
  width: 32px;
`;
const UpPicture=styled.div`
background-color: blue;
  height: 45px;
  width: 32px;
	position: relative;
	bottom: 11.25px;
`
const LowPicture = styled.div`
background-color: blue;
  height: 45px;
  width: 32px;
	position: relative;
	bottom: -11.25px;
`
const Gap = styled.div`
  width: 32px;
`;
const HalfGap = styled.div`
width: 16px;
`
const MasterContainer = styled.main`
  text-align: center;
  box-sizing: border-box;
  min-height: 100vh;
  min-width: 100vw;
  background: ${(p) => `var(--bg-${p.themeNumber})`};
  color: ${(p) => `var(--text-${p.themeNumber})`};
`;
