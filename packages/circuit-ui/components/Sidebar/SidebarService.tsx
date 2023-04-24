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

import { Children, ReactElement } from 'react';
import { SecurePayments } from '@sumup/icons';

import { isArray } from '../../util/type-check.js';
import { isEmpty } from '../../util/helpers.js';

export type Child = {
  props: {
    selected?: boolean;
    secondary?: boolean;
    visible?: boolean;
  };
};

export function hasSelectedChild(children: Child[] | Child): boolean {
  if (children) {
    const childArray = isArray(children) ? children : [children];
    const selectedChildren = childArray.filter((item) => item.props.selected);
    return !isEmpty(selectedChildren);
  }
  return false;
}

export function getSelectedChildIndex(children?: Child[] | Child): number {
  if (!children) {
    return -1;
  }

  const childArray = isArray(children) ? children : [children];

  return childArray.findIndex((child: Child) => Boolean(child.props.selected));
}

export function getSecondaryChildren(
  children?: Child[] | Child,
  visible?: boolean,
): Child[] | undefined {
  if (!children) {
    return undefined;
  }

  const childArray = isArray(children) ? children : [children];

  return childArray.map((child: Child) => ({
    ...child,
    props: { ...child.props, secondary: true, visible },
  }));
}

export function getChildrenLength(children?: Child[] | Child): number {
  if (!children) {
    return 0;
  }
  return Children.count(children);
}

export function getIcon({
  defaultIcon,
  selectedIcon,
  selected,
  disabled,
}: {
  defaultIcon?: ReactElement;
  selectedIcon?: ReactElement;
  selected?: boolean;
  disabled?: boolean;
}): ReactElement | null {
  const disabledIcon = <SecurePayments />;
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
}
