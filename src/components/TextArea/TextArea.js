import React from 'react';
import { css } from 'react-emotion';

import Input from '../Input';

const className = css`
  label: textarea;
  overflow: auto;
  resize: vertical;
`;

/**
 * TextArea component for forms.
 */
const TextArea = props => (
  <Input {...{ ...props, className }} element="textarea" />
);

TextArea.LEFT = Input.LEFT;
TextArea.RIGHT = Input.RIGHT;

/**
 * @component
 */
export default TextArea;
