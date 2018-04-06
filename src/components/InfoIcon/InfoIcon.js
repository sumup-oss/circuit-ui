import styled, { css } from 'react-emotion';
import { size } from 'polished';

import Icon from './info.svg';

const baseStyles = ({ theme }) => {
  const color = theme.colors.n500;
  const iconSize = theme.iconSizes.kilo;
  return css`
    label: info-icon;
    border: 1px solid ${color};
    border-radius: ${iconSize};
    fill: ${color};
    ${size(iconSize)};
  `;
};

/**
 * A small info icon used for triggering tooltips
 * and other informational content.
 */
const InfoIcon = styled(Icon)(baseStyles);

/**
 * @component
 */
export default InfoIcon;
