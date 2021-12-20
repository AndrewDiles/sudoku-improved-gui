import { useEffect, useState } from "react";
import styled from "styled-components";

function Loader({ themeNumber }) {
  const [loaderNumbers, setLoaderNumbers] = useState([
    "",
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  function updateLoaderNumbers() {
    setLoaderNumbers((numbers) => {
      let nextIndex = 0;
      for (let i = 1; i < 11; i++) {
        if (numbers[i] === false) {
          nextIndex = i;
          break;
        }
      }
      let result = [""];
      if (nextIndex === 0) {
        for (let i = 0; i < 9; i++) {
          result.push(false);
        }
      } else {
        for (let i = 0; i < 9; i++) {
          if (i < nextIndex) {
            result.push(true);
          } else {
            result.push(false);
          }
        }
      }
      return result;
    });
  }
  useEffect(() => {
    const timer = setInterval(updateLoaderNumbers, 150);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Container className="centered">
      <Potentials themeNumber={themeNumber}>
        {loaderNumbers.map((value, index) => {
          return index === 0 ? null : (
            <Potential
              key={index}
              themeNumber={themeNumber}
              isImpossible={value === false}
              isFound={value === true}
            >
              {index}
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
  color: ${(p) =>
    p.isImpossible
      ? `var(--text-${p.themeNumber})`
      : p.isFound
      ? `var(--yes-${p.themeNumber})`
      : `var(--text-${p.themeNumber})`};
`;

const Container = styled.span`
  width: 100%;
	position: relative;
	top: -5px;
`;
