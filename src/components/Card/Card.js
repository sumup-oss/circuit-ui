import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { childrenPropType } from '../../util/shared-prop-types';
import { shadowSingle } from '../../styles/style-helpers';

const baseStyles = ({ theme }) => css`
  label: card;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.mega};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${shadowSingle({ theme })};
  min-width: 460px;
  padding: ${theme.spacings.mega} ${theme.spacings.giga};
`;

/**
 * Card component that is used for displaying content on a grid.
 */
const Card = styled('div')(baseStyles);

Card.propTypes = {
  /**
   * An ID rendered as data-selector attribute on the
   * component. Used for tracking and e2e testing.
   */
  selector: PropTypes.string.isRequired,
  /**
   * Content to be rendered inside the Card.
   */
  children: childrenPropType
};

/**
 * @component
 */
export default Card;
