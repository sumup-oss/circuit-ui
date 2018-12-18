import styled from '@emotion/styled';
import { css } from 'emotion';

import { childrenPropType } from '../../util/shared-prop-types';

const baseStyles = () => css`
  label: message;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

/**
 * A Message component for alerts, updates and notifications.
 */
const Message = styled('div')`
  ${baseStyles};
`;

Message.propTypes = {
  /**
   * Content to be rendered inside the Message.
   * Supports a special MessageIcon and MessageButton.
   */
  children: childrenPropType
};

/**
 * @component
 */
export default Message;
