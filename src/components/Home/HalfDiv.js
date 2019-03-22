import styled from 'styled-components';
import { animated as a } from 'react-spring';

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

export default HalfDiv;
