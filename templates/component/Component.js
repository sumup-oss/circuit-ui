import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { standard } from '../../themes';

const baseStyles = ({ theme }) => css`
  label: component;
`;

/**
 * Component component for forms.
 */
const Component = styled('element')(baseStyles);

Component.propTypes = {
  /**
   * A Circuit UI theme object. Usually provided by a ThemeProvider.
   */
  theme: PropTypes.object,
  /**
   * An ID passed to the <input> element via a data attribute. This
   * is used as an identifier for analytics tracking and e2e testing.
   */
  analyticsId: PropTypes.string
};

Component.defaultProps = {
  theme: standard
};

/**
 * @component
 */
export default Component;
