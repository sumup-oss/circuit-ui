import React from 'react';
import TextMaskInput from 'react-text-mask';

import Input from '../Input';

/**
 * An input supporting text masks to format
 * the input value. Refer to the
 * [README](https://github.com/text-mask/text-mask/tree/master/react#readme)
 * of text-mask for details regarding usage.
 *
 * React Text Mask uses `defaultValue` instead of `value`, which
 * causes issues with controlled inputs. We remap it to make it
 * work more nicely with Final Form.
 * This might cause issues with IE10 (https://github.com/text-mask/text-mask/issues/349#issuecomment-282612339).
 * There are some more discussions around this problem (https://github.com/text-mask/text-mask/issues/530).
 */
const MaskedInput = props => (
  <TextMaskInput
    guide={false}
    {...props}
    render={(ref, { defaultValue, ...renderProps }) => (
      <Input value={defaultValue} {...renderProps} deepRef={ref} />
    )}
  />
);

/**
 * @component
 */
export default MaskedInput;
