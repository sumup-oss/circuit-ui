import React from 'react';
import { css } from 'emotion';

import Input from '../Input';

const inputClassName = css`
  label: textarea;
  overflow: auto;
  resize: vertical;
`;

/**
 * TextArea component for forms.
 */
const TextArea = props => (
  <Input {...{ ...props, inputClassName }} element="textarea" />
);

TextArea.LEFT = Input.LEFT;
TextArea.RIGHT = Input.RIGHT;

/**
 * @component
 */
export default TextArea;
