import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  useSpring, animated as a, useSprings, useChain,
} from 'react-spring';
import MaxDiv from '../components/UI/MaxDiv';
import mobile from '../assets/mobile.jpg';
import office from '../assets/office.jpg';

const HalfDiv = styled(a.div)`
  height: 100%;
  width: 100%;
  top: 0;
  position: absolute;
  background-size: cover;
  background-position: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ overlay }) => overlay};
  }
`;

const Reset = styled(a.div)`
  height: 100%;
  width: 50px;
  position: absolute;
  top: 0;
  background-color: black;
  z-index: 10;
`;

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  // react-spring
  const [widthSprings, widthSet] = useSprings(2, () => ({
    width: '50%',
    zIndex: 1,
  }));

  const [resetSpring, resetSet] = useSprings(2, i => ({
    transform: `translateX(${i === 0 ? '100%' : '-100%'})`,
    opacity: 0,
  }));

  useEffect(() => {
    widthSet((i) => {
      const isActive = activeIndex === i;
      let p = '50%';
      if (activeIndex !== -1) {
        p = isActive ? '75%' : '25%';
      }
      return {
        width: p,
        // delay: isActive ? 0 : 75,
      };
    });
    resetSet((i) => {
      const isActive = i === activeIndex;
      const opposite = i === 0 ? '100%' : '-100%';
      return {
        transform: `translateX(${isActive ? '0%' : opposite})`,
        opacity: isActive ? 1 : 0,
      };
    });
  }, [activeIndex]);
  // end of react-spring

  // Separated because of weird editor lag
  const resetStyles = [
    { right: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)' },
    { left: 0, backgroundColor: 'rgba(86, 216, 212, 0.8)' },
  ];

  const reset = (e) => {
    e.stopPropagation();
    console.log('Trying to reset');
    setActiveIndex(-1);
  };

  return (
    <MaxDiv style={{ overflow: 'hidden' }}>
      <HalfDiv
        style={{
          ...widthSprings[0],
          left: 0,
          backgroundImage: `url(${mobile})`,
        }}
        overlay="rgba(86, 216, 212, 0.8)"
        onClick={() => setActiveIndex(0)}
      >
        <Reset
          style={{ ...resetStyles[0], ...resetSpring[0] }}
          onClick={reset}
        />
        Left
      </HalfDiv>
      <HalfDiv
        style={{
          ...widthSprings[1],
          right: 0,
          backgroundImage: `url(${office})`,
        }}
        overlay="rgba(0, 0, 0, 0.8)"
        onClick={() => setActiveIndex(1)}
      >
        <Reset
          style={{ ...resetStyles[1], ...resetSpring[1] }}
          onClick={reset}
        />
        Right
      </HalfDiv>
    </MaxDiv>
  );
};

export default Home;
