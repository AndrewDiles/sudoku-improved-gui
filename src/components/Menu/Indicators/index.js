import styled from "styled-components";

function Indicators({
  themeNumber,
  contradictionExists,
  isSolved,
  solverOptionsOpen,
  newInfoFound,
}) {
  return (
    <Container>
      {isSolved ? null : contradictionExists ? (
        <P themeNumber={themeNumber} no={contradictionExists}>
          !!CONTRADICTION!!
        </P>
      ) : (
        <P>NO ISSUES</P>
      )}
      {solverOptionsOpen && (
        <>
          {isSolved ? null : newInfoFound ? (
            <P themeNumber={themeNumber} yes={1}>
              NEW INFORMATION
            </P>
          ) : (
            <P>NO NEW INFORMATION</P>
          )}
        </>
      )}
      {isSolved ? (
        <P themeNumber={themeNumber} yes={isSolved}>
          !PUZZLE SOLVED!
        </P>
      ) : (
        <P>PUZZLE INCOMPLETE</P>
      )}
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
  flex-direction: column;
`;
const P = styled.p`
  font-weight: 900;
  color: ${(p) =>
    p.no
      ? `var(--no-${p.themeNumber})`
      : p.yes
      ? `var(--yes-${p.themeNumber})`
      : "inherit"};
  margin: 5px 0;
`;
