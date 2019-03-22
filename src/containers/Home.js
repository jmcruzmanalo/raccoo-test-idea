import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSprings, animated as a } from 'react-spring';
import useDimensions from 'react-use-dimensions';
import MaxDiv from '../components/UI/MaxDiv';
import HalfDiv from '../components/Home/HalfDiv';
import Reset from '../components/Home/Reset';
import mobile from '../assets/mobile.jpg';
import office from '../assets/office.jpg';
import rpmLogo from '../assets/rpmLogo.png';
import packLogo from '../assets/packLogo.png';

const Content = styled('div')`
  position: absolute;
  top: 0;
  width: 75vw;
  height: 100%;
`;

const RpmLogo = styled(a.div)`
  position: absolute;
  bottom: 100px;
  width: 100vw;
  right: 0;
  height: auto;
  user-select: none;
  img {
    position: absolute;
    bottom: 0;
    transform: translateX(50%);
    width: 150px;
    height: auto;
    right: 50vw;
  }
`;

const PackLogo = styled(a.div)`
  position: absolute;
  bottom: 100px;
  width: 100vw;
  left: 0;
  height: auto;
  user-select: none;
  img {
    position: absolute;
    bottom: 0;
    transform: translateX(-50%);
    width: 150px;
    height: auto;
    left: 50vw;
  }
`;

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [ref, { width }] = useDimensions();

  // react-spring
  const [widthSprings, widthSet] = useSprings(2, () => ({
    width: '50%',
    zIndex: 1,
  }));

  const [resetSpring, resetSet] = useSprings(2, i => ({
    transform: `translateX(${i === 0 ? '100%' : '-100%'})`,
    opacity: 0,
  }));

  const [smallLogoPos, setSmallLogoPos] = useSprings(2, i => ({}));

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
    setSmallLogoPos((i) => {
      const pos = width * 0.33;
      const p = (pos / width) * 100;
      const t = `${i === 0 ? p : -1 * p}%`;
      const v = '0%';
      const isActive = i === activeIndex;
      const transform = `translateX(${isActive ? t : v})`;
      return {
        transform,
        delay: 300,
      };
    });
  }, [activeIndex, width]);
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

  return (
    <MaxDiv ref={ref} style={{ overflow: 'hidden', backgroundColor: 'black' }}>
      <HalfDiv
        style={{
          ...widthSprings[0],
          left: 0,
          backgroundImage: `url(${mobile})`,
        }}
        overlay="rgba(86, 216, 212, 0.8)"
        onClick={() => setActiveIndex(0)}
      >
        <Reset style={{ ...resetStyles[0], ...resetSpring[0] }} onClick={reset} />
        <PackLogo style={smallLogoPos[0]}>
          <img src={packLogo} alt="" />
        </PackLogo>
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
        <Reset style={{ ...resetStyles[1], ...resetSpring[1] }} onClick={reset} />
        <Content style={{ right: 0, paddingLeft: 50 }}>
          <RpmLogo style={smallLogoPos[1]}>
            <img src={rpmLogo} alt="" />
          </RpmLogo>
        </Content>
      </HalfDiv>
    </MaxDiv>
  );
};

export default Home;
