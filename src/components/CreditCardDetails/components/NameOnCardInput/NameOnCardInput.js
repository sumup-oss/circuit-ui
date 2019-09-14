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

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import deprecate from '../../../../util/deprecate';
import Label from '../../../Label';
import Input from '../../../Input';

/**
 * A conveniance input for the card holder.
 */
const NameOnCardInput = ({ label, id, ...props }) => {
  deprecate(
    [
      'NameOnCardInput has been deprecated.',
      `Use SumUp's card widget instead:`,
      'https://developer.sumup.com/docs/widgets-card-v2.'
    ].join(' ')
  );
  return (
    <Fragment>
      <Label htmlFor={id}>{label}</Label>
      <Input autoComplete="cc-name" type="text" {...{ ...props, id }} />
    </Fragment>
  );
};

NameOnCardInput.propTypes = {
  /**
   * The label to be used (for i18n purposes).
   */
  label: PropTypes.string,
  /**
   * Id to be used for the input.
   */
  id: PropTypes.string
};

NameOnCardInput.defaultProps = {
  label: 'Name on card',
  id: 'cui-cc-name-on-card'
};

/**
 * @component
 */
export default NameOnCardInput;
