import React from 'react';
import { css } from 'react-emotion';
import { withTheme } from 'emotion-theming';

import { themePropType } from '../../util/shared-prop-types';
import { svgKilo } from '../../styles/style-helpers';
import SvgButton from '../SvgButton';
import Icon from './close-icon.svg';

const className = ({ theme }) => css`
  label: close-button;
  ${svgKilo({ theme })};
`;

/**
 * A generic close button.
 */
const CloseButton = ({ theme, ...props }) => (
  <SvgButton className={className({ theme })} {...props}>
    <Icon />
  </SvgButton>
);

CloseButton.propTypes = {
  theme: themePropType.isRequired
};

/**
 * @component
 */
export default withTheme(CloseButton);
