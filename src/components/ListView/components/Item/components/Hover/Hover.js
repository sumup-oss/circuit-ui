import styled, { css } from 'react-emotion';
import { shadowBorder } from '../../../../../../styles/style-helpers';

const baseStyles = ({ theme }) => css`
  label: wrapper__item__hover;

  display: none;
  ${shadowBorder(theme.colors.b500, theme.borderWidth.mega)};
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
