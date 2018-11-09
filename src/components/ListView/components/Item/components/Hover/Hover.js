import styled, { css } from 'react-emotion';

const baseStyles = ({ theme }) => css`
  label: wrapper__item__hover;

  display: none;
  box-shadow: 0px 0px 0px 2px ${theme.colors.b500};
  border-radius: ${theme.borderRadius.mega};
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1;
`;

const Hover = styled('div')(baseStyles);

export default Hover;
