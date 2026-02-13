/**
 * Copyright 2025, SumUp Ltd.
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

'use client';

import type { IconComponentType } from '@sumup-oss/icons';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

import { useComponents } from '../../ComponentsContext/index.js';
import type { AsPropType } from '../../../types/prop-types.js';
import { clsx } from '../../../styles/clsx.js';
import { sharedClasses } from '../../../styles/shared.js';
import type { ClickEvent } from '../../../types/events.js';

import classes from './ActionMenuItem.module.css';

interface ActionMenuItemBaseProps {
  /**
   * The ActionMenu item label.
   */
  children: string;
  /**
   * Function that's called when the item is clicked.
   */
  onClick?: (event: ClickEvent) => void;
  /**
   * Display an icon in addition to the label. Designed for 24px icons from `@sumup-oss/icons`.
   */
  icon?: IconComponentType;
  /**
   * Destructive variant, changes the color of label and icon from blue to red to signal to the user that the action
   * is irreversible or otherwise dangerous. Interactive states are the same for destructive variant.
   */
  destructive?: boolean;
  /**
   * Disabled variant. Visually and functionally disable the button.
   */
  disabled?: boolean;
}

type LinkElProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'>;
type ButtonElProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

export type ActionMenuItemProps = ActionMenuItemBaseProps &
  LinkElProps &
  ButtonElProps;

export const ActionMenuItem = ({
  children,
  icon: Icon,
  destructive,
  className,
  ...props
}: ActionMenuItemProps) => {
  const { Link } = useComponents();

  const Element = props.href ? (Link as AsPropType) : 'button';

  return (
    <Element
      className={clsx(
        classes.item,
        sharedClasses.listItem,
        destructive && sharedClasses.listItemDestructive,
        className,
      )}
      {...props}
    >
      {Icon && <Icon className={classes.icon} size="24" aria-hidden="true" />}
      {children}
    </Element>
  );
};
