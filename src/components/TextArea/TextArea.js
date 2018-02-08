import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import Input from '../Input';

const baseStyles = css`
  label: textarea;
  overflow: auto;
  resize: vertical;
`;

/**
 * TextArea component for forms.
 */
const TextArea = styled(Input.withComponent('textarea'))(baseStyles);

TextArea.propTypes = {
  /**
   * An ID rendered as data-selector attribute on the
   * component. Used for tracking and e2e testing.
   */
  selector: PropTypes.string.isRequired
};

/**
 * @component
 */
export default TextArea;
