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
import { isEmpty } from 'lodash/fp';
import { Lock } from '@sumup/icons';

import { isArray } from '../../../../util/type-check';

export const hasSelectedChild = children => {
  if (children) {
    return isArray(children)
      ? !isEmpty(children.filter(item => item.props.selected))
      : children.props.selected;
  }
  return false;
};

export const getIcon = ({ defaultIcon, selected, selectedIcon, disabled }) => {
  const disabledIcon = <Lock />;
  const hasIcon = !!defaultIcon;

  if (hasIcon && disabled) {
    return disabledIcon;
  }
  if (hasIcon && selectedIcon && selected) {
    return selectedIcon;
  }
  if (hasIcon) {
    return defaultIcon;
  }
  return null;
};
