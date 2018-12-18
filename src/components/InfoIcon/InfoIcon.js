/** @jsx jsx */

import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';

import Icon from './info.svg';

const baseStyles = ({ theme }) => css`
  label: info-icon;
  border: 1px solid ${theme.colors.n500};
  border-radius: 100%;
  fill: ${theme.colors.n500};
`;

/**
 * A small info icon used for triggering tooltips
 * and other informational content.
 */
const StyledIcon = styled(Icon)(baseStyles);
const InfoIcon = props => <StyledIcon role="img" {...props} />;

/**
 * @component
 */
export default InfoIcon;
