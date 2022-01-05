import styled from "styled-components";

function Loader({ themeNumber }) {
  return (
    <Container className="centered">
      <Potentials themeNumber={themeNumber}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => {
          return (
            <Potential key={number} themeNumber={themeNumber} number={number}>
              {number}
            </Potential>
          );
        })}
      </Potentials>
    </Container>
  );
}

export default Loader;

const Potentials = styled.div`
  height: min(10vw, 48px);
  width: min(10vw, 48px);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  background: ${(p) => `var(--bg-${p.themeNumber})`};
  outline: ${(p) => `2px solid var(--border-${p.themeNumber})`};
  outline-offset: -1px;
`;
const Potential = styled.p`
  margin: 0;
  font-size: min(4px + 1vw, 13px);
  /* animation: potential-expand infinite 4s linear; */
  /* animation: ${(p) => `loader-theme-${p.themeNumber} infinite 4s linear`}; */
  color: ${(p) => `var(--text-${p.themeNumber})`};
  animation: rotate-hue infinite 4s linear;
  animation-delay: ${(p) => p.number / 3}s;
`;
const Container = styled.span`
  width: 100%;
  position: relative;
  top: -5px;
`;
