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
import PropTypes from 'prop-types';
import { withTheme } from 'emotion-theming';

import { CardHeader } from '../../../Card';
import Heading from '../../../Heading';

const ModalHeader = ({ title, onClose, labelCloseButton }) => (
  <CardHeader onClose={onClose} labelCloseButton={labelCloseButton}>
    {title && (
      <Heading size={Heading.KILO} noMargin>
        {title}
      </Heading>
    )}
  </CardHeader>
);

ModalHeader.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string.isRequired,
  /**
   * Text label for the close button for screen readers.
   * Important for accessibility.
   */
  labelCloseButton: PropTypes.string
};

ModalHeader.defaultProps = {
  onClose: null
};

/**
 * @component
 */
export default withTheme(ModalHeader);
