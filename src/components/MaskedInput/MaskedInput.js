import React from 'react';
import TextMaskInput from 'react-text-mask';

import Input from '../Input';

/**
 * An input supporting text masks to format
 * the input value. Refer to the
 * [README](https://github.com/text-mask/text-mask/tree/master/react#readme)
 * of text-mask for details regarding usage.
 */
const MaskedInput = props => (
  <TextMaskInput
    {...props}
    render={(ref, renderProps) => <Input {...renderProps} deepRef={ref} />}
  />
);

/**
 * @component
 */
export default MaskedInput;
