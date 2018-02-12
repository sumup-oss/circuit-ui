import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { childrenPropType } from '../../util/shared-prop-types';

const baseStyles = () => css`
  label: alert;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

/**
 * Describe your component here.
 */
const Alert = styled('div')(baseStyles);

Alert.propTypes = {
  /**
   * Content to be rendered inside the Card.
   */
  children: childrenPropType
};

Alert.defaultProps = {};

/**
 * @component
 */
export default Alert;
