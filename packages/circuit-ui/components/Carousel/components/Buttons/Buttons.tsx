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

import { HTMLAttributes } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from '@sumup/icons';

import IconButton, { IconButtonProps } from '../../../IconButton/index.js';
import { clsx } from '../../../../styles/clsx.js';

import classes from './Buttons.module.css';

type ButtonListProps = HTMLAttributes<HTMLDivElement>;

export const ButtonList = ({ className, ...props }: ButtonListProps) => (
  <div className={clsx(classes['button-list'], className)} {...props} />
);

type ButtonProps = Omit<IconButtonProps, 'icon'>;

export const NextButton = (props: ButtonProps) => (
  <IconButton
    {...props}
    className={clsx(classes.button, props.className)}
    size="s"
    icon={ChevronRight}
  />
);

export const PrevButton = (props: ButtonProps) => (
  <IconButton
    {...props}
    className={clsx(classes.button, props.className)}
    size="s"
    icon={ChevronLeft}
  />
);

export const PlayButton = ({
  paused,
  ...props
}: ButtonProps & { paused?: boolean }) => (
  <IconButton
    {...props}
    className={clsx(classes.button, props.className)}
    size="s"
    icon={paused ? Play : Pause}
  />
);
