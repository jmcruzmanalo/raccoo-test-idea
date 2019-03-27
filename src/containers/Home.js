import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSprings } from 'react-spring';
import MaxDiv from '../components/UI/MaxDiv';
import HalfDiv from '../components/Home/HalfDiv';
import Reset from '../components/Home/Reset';
import SmallLogo from '../components/Home/SmallLogo';
import BigLogo from '../components/Home/BigLogo';
import mobile from '../assets/mobile.jpg';
import office from '../assets/office.jpg';
import rpmLogo from '../assets/rpmLogo.png';
import packLogo from '../assets/packLogo.png';
import packLogoBig from '../assets/packLogoBig.png';

const Content = styled('div')`
  position: absolute;
  top: 0;
  width: 75vw;
  height: 100%;
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
        delay: isActive ? 0 : 75,
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
    setActiveIndex(-1);
  };

  // Big Logo positions;
  let firstLogoPos = 'default';
  let secondLogoPos = 'default';
  if (activeIndex === 0) {
    firstLogoPos = 'hidden';
    secondLogoPos = 'show';
  } else if (activeIndex === 1) {
    firstLogoPos = 'show';
    secondLogoPos = 'hidden';
  }

  return (
    <MaxDiv style={{ overflow: 'hidden', backgroundColor: 'black' }}>
      <HalfDiv
        style={{
          ...widthSprings[0],
          left: 0,
          backgroundImage: `url(${mobile})`,
        }}
        overlay="rgba(86, 216, 212, 0.8)"
        onClick={() => setActiveIndex(0)}
        // onMouseOver={() => setActiveIndex(0)}
      >
        <Reset style={{ ...resetStyles[0], ...resetSpring[0] }} onClick={reset} />
        <SmallLogo
          src={packLogo}
          isActive={activeIndex === 0}
          animationDirection="left"
          style={{
            left: 0,
          }}
        />
        <BigLogo position={firstLogoPos} style={{ left: 0 }} src={rpmLogo} animationDirection="left" />
      </HalfDiv>
      <HalfDiv
        style={{
          ...widthSprings[1],
          right: 0,
          backgroundImage: `url(${office})`,
        }}
        overlay="rgba(0, 0, 0, 0.8)"
        onClick={() => setActiveIndex(1)}
        // onMouseOver={() => setActiveIndex(1)}
      >
        <Reset style={{ ...resetStyles[1], ...resetSpring[1] }} onClick={reset} />
        <Content style={{ right: 0, paddingLeft: 50 }}>
          <SmallLogo
            isActive={activeIndex === 1}
            animationDirection="right"
            src={rpmLogo}
            style={{ right: 0 }}
          />
          <BigLogo position={secondLogoPos} style={{ right: 0 }} src={packLogoBig} animationDirection="right" />
        </Content>
      </HalfDiv>
    </MaxDiv>
  );
};

export default Home;
