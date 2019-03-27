import React from 'react';
import styled from 'styled-components';
import { useSpring, animated as a } from 'react-spring';
import PropTypes from 'prop-types';

const Container = styled(a.div)`
  position: absolute;
  right: 0;
  width: 100vw;
  bottom: 0;

  img {
    position: absolute;
    left: 50vw;
    transform: translateX(${({ direction }) => (direction === 'right' ? -100 : 0)}%);
    transform-origin: ${({ direction }) => (direction === 'right' ? 100 : -100)}%;
    width: 150px;
    bottom: 0;
    margin-bottom: 10%;
  }
`;

const BigLogo = ({
  src, animationDirection, style, position,
}) => {
  // Position Springs
  let value = 0;
  const shownPosition = `${animationDirection === 'right' ? 40 : -1 * 40}%`;
  const hiddenPosition = `${animationDirection === 'right' ? -1 * 40 : 40}%`;
  if (position === 'hidden') {
    value = hiddenPosition;
  } else if (position === 'show') {
    value = shownPosition;
  }

  const positionSpring = useSpring({
    transform: `translateX(${value}%)`,
    delay: position === 'hidden' ? 0 : 250,
  });

  // Scale Springs
  const transformValueDefault = animationDirection === 'right' ? -100 : 0;
  const transformValueActive = animationDirection === 'right' ? -50 : -100;
  const transformValueHidden = animationDirection === 'right' ? -100 : 100;
  let transformValue = transformValueDefault;
  let scaleValue = 1;
  if (position === 'hidden') {
    transformValue = transformValueHidden;
  } else if (position === 'show') {
    transformValue = transformValueActive;
    scaleValue = 1.5;
  }
  const scaleSpring = useSpring({
    transform: `translateX(${transformValue}%) scale(${scaleValue})`,
    delay: 250,
  });

  return (
    <Container style={{ ...style, ...positionSpring }} direction={animationDirection}>
      <a.img style={scaleSpring} src={src} alt="" />
    </Container>
  );
};

BigLogo.propTypes = {
  position: PropTypes.oneOf(['hidden', 'default', 'show']).isRequired,
  animationDirection: PropTypes.oneOf(['right', 'left']).isRequired,
};

export default BigLogo;
