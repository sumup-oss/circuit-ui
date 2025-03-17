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

import type { ThHTMLAttributes } from 'react';

import {
  TierIndicator,
  type TierIndicatorProps,
} from '../../../TierIndicator/TierIndicator.js';
import { Button, type ButtonProps } from '../../../Button/index.js';
import { Body } from '../../../Body/index.js';
import { useMedia } from '../../../../hooks/useMedia/index.js';
import { Compact } from '../../../Compact/index.js';
import { clsx } from '../../../../styles/clsx.js';

import classes from './TableHeader.module.css';

export interface TableHeaderProps
  extends ThHTMLAttributes<HTMLTableCellElement> {
  /**
   * The title of the plan.
   */
  title: string;
  /**
   * The id of the plan.
   */
  id: string;
  /**
   * An optional tier indicator
   */
  tier?: TierIndicatorProps;
  /**
   *  Additional information about the plan
   */
  description: string;
  /**
   *  The call-to-action button props
   */
  action?: ButtonProps;
}

export const TableHeader = ({
  title,
  description,
  tier,
  className,
  action,
  ...props
}: TableHeaderProps) => {
  const isMobile = useMedia('(max-width: 767px)');

  return (
    <th scope="col" className={clsx(classes.wrapper, className)} {...props}>
      <div className={classes.base}>
        <div className={classes.title}>
          {(!isMobile || (isMobile && !tier)) && (
            <Compact size="l" weight="bold">
              {title}
            </Compact>
          )}
          {tier && <TierIndicator {...tier} size="m" />}
        </div>

        <Body size={isMobile ? 's' : 'm'}>{description}</Body>
        {!isMobile && action && (
          <Button
            {...action}
            className={classes.cta}
            variant="secondary"
            size="s"
          />
        )}
      </div>
    </th>
  );
};
