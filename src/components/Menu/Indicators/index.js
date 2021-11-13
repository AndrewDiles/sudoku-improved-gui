import styled from "styled-components";
import OptionButton from "../OptionButton";

function Indicators({ themeNumber, contradictionExists, isSolved }) {
  return (
    <Container>
      <ButtonsContainer>
        {contradictionExists ? <P themeNumber = {themeNumber} no={contradictionExists}>!!CONTRADICTION!!</P> : <P>NO ISSUES</P>}
				{isSolved ? <P themeNumber = {themeNumber} yes={isSolved}>!PUZZLE SOLVED!</P> : <P>PUZZLE INCOMPLETE</P>}
      </ButtonsContainer>
    </Container>
  );
}

export default Indicators;
const Container = styled.div`
  display: flex;
  text-align: center;
  display: flex;
  /* justify-content: flex-start; */
  justify-content: center;
  flex-direction: row;
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* margin-right: 10px; */
  justify-content: center;
  /* @media screen and (min-width: 500px) {
    margin-right: 20px;
  } */
  @media screen and (min-width: 1000px) {
    /* margin-right: 0px; */
    margin-top: 22px;
  }
`;
const P =styled.p`
	font-weight: 900;
	color: ${p => p.no && `var(--no-${p.themeNumber})`};
	color: ${p => p.yes && `var(--yes-${p.themeNumber})`};
`