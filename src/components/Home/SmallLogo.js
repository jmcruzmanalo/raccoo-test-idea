import React from 'react';
import styled from 'styled-components';
import { useSpring, animated as a } from 'react-spring';

const AnimatedDiv = styled(a.div)`
  position: absolute;
  bottom: 0;
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
    margin-bottom: 10%;
  }
`;

const SmallLogo = ({
  isActive, src, style, animationDirection,
}) => {
  const p = 40;
  const t = `${animationDirection === 'left' ? p : -1 * p}%`;
  const v = '0%';
  const transform = `translateX(${isActive ? t : v})`;
  // const transform = `translateX(${isActive ? t : v}) scale(${isActive ? 1.5 : 1})`;
  const springProps = useSpring({
    transform,
    delay: 250,
  });

  console.log();
  return (
    <AnimatedDiv style={{ ...springProps, ...style }}>
      <img src={src} alt="" />
    </AnimatedDiv>
  );
};

export default SmallLogo;
