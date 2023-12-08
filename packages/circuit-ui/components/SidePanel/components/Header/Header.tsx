/**
 * Copyright 2022, SumUp Ltd.
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

import type { HTMLAttributes } from 'react';
import { ArrowLeft } from '@sumup/icons';

import { clsx } from '../../../../styles/clsx.js';
import IconButton from '../../../IconButton/index.js';
import CloseButton from '../../../CloseButton/index.js';
import Headline from '../../../Headline/index.js';
import type { SidePanelProps } from '../../SidePanel.js';

import classes from './Header.module.css';

type HeaderStickyProps = { isSticky: boolean };

export type HeaderProps = HeaderStickyProps &
  Pick<HTMLAttributes<HTMLDivElement>, 'id'> &
  Pick<
    SidePanelProps,
    'backButtonLabel' | 'closeButtonLabel' | 'headline' | 'onBack' | 'onClose'
  >;

export const Header = ({
  backButtonLabel,
  closeButtonLabel,
  headline,
  id,
  isSticky,
  onBack,
  onClose,
}: HeaderProps): JSX.Element => (
  <div className={clsx(classes.base, isSticky && classes.sticky)}>
    {onBack && backButtonLabel && (
      <IconButton
        className={classes.button}
        type="button"
        onClick={onBack}
        icon={ArrowLeft}
      >
        {backButtonLabel}
      </IconButton>
    )}
    <Headline id={id} size="four" as="h2" className={classes.headline}>
      {headline}
    </Headline>
    {closeButtonLabel && (
      <CloseButton className={classes.button} onClick={onClose}>
        {closeButtonLabel}
      </CloseButton>
    )}
  </div>
);
