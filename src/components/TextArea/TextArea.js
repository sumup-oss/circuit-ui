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
// const TextArea = styled(Input.withComponent('textarea'))`
//   ${baseStyles};
// `;
const TextArea = () => null;

/**
 * @component
 */
export default TextArea;
