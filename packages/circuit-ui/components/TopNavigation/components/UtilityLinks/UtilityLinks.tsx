/**
 * Copyright 2021, SumUp Ltd.
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

import type {
  MouseEvent,
  KeyboardEvent,
  AnchorHTMLAttributes,
  ReactNode,
} from 'react';
import type { IconComponentType } from '@sumup-oss/icons';

import type { AsPropType } from '../../../../types/prop-types.js';
import { Body } from '../../../Body/index.js';
import { useComponents } from '../../../ComponentsContext/index.js';
import { Skeleton } from '../../../Skeleton/index.js';
import { clsx } from '../../../../styles/clsx.js';
import { utilClasses } from '../../../../styles/utility.js';
import { sharedClasses } from '../../../../styles/shared.js';

import classes from './UtilityLinks.module.css';

export interface UtilityLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Display an icon in addition to the text to help to identify the link.
   * On narrow viewports, only the icon is displayed.
   */
  icon: IconComponentType;
  /**
   * Display a different icon when the link is active.
   */
  activeIcon?: IconComponentType;
  /**
   * Short label to describe the target of the link.
   */
  label: string;
  /**
   * A valid path or URL to the link target.
   */
  href: string;
  /**
   * Function that's called when the link is clicked.
   */
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
  /**
   * Whether the link is the currently active page.
   */
  isActive?: boolean;
}

function UtilityLink({
  icon: Icon,
  label,
  isActive,
  className,
  ...props
}: UtilityLinkProps) {
  const { Link } = useComponents();
  const Element = props.href ? (Link as AsPropType) : 'button';

  return (
    <Element
      {...props}
      aria-current={isActive ? 'page' : undefined}
      className={clsx(
        classes.anchor,
        sharedClasses.navigationItem,
        utilClasses.focusVisibleInset,
        className,
      )}
    >
      <Skeleton className={classes.icon}>
        <Icon aria-hidden="true" size="24" />
      </Skeleton>
      <Skeleton>
        <Body as="span" className={classes.label} weight="semibold">
          {label}
        </Body>
      </Skeleton>
    </Element>
  );
}

type CustomLinkProps = {
  /**
   * A string or a number that uniquely identifies the link among other links.
   *
   * See https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key
   */
  key: string | number;
  /**
   * A custom component. Ensure that the element's styles fit in with the rest
   * of the TopNavigation. If the element is interactive, it should match the
   * hover, focus, and active styles of the regular links.
   */
  children: ReactNode;
};

export interface UtilityLinksProps {
  links: (UtilityLinkProps | CustomLinkProps)[];
}

export function UtilityLinks({ links }: UtilityLinksProps) {
  return (
    <ul className={classes.list}>
      {links.map((link) =>
        isUtilityLink(link) ? (
          <li key={link.label} className={classes.item}>
            <UtilityLink {...link} />
          </li>
        ) : (
          <li key={link.key} className={classes.item}>
            {link.children}
          </li>
        ),
      )}
    </ul>
  );
}

function isUtilityLink(
  link: UtilityLinkProps | CustomLinkProps,
): link is UtilityLinkProps {
  return 'label' in link;
}
