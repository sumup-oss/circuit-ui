/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import TextMaskInput from 'react-text-mask';

import deprecate from '../../util/deprecate';
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

export function InternalMaskedInput(props) {
  deprecate(
    [
      'MaskedInput has been deprecated.',
      'Use react-text-mask directly instead.'
    ].join(' ')
  );

  return <MaskedInput {...props} />;
}

/**
 * @component
 */
export default MaskedInput;
