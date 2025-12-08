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

import { forwardRef } from 'react';
import { Close } from '@sumup-oss/icons';

import { IconButton, type IconButtonProps } from '../Button/index.js';
import { useI18n } from '../../hooks/useI18n/useI18n.js';
import { translations } from './translations/index.js';

export type CloseButtonProps = Omit<IconButtonProps, 'icon'>;

/**
 * A generic close button.
 */

export const CloseButton = forwardRef<any, CloseButtonProps>((props, ref) => {
  const { label, children = label, ...rest } = useI18n(props, translations);
  return (
    <IconButton
      type="button"
      variant="tertiary"
      {...rest}
      icon={Close}
      ref={ref}
    >
      {children}
    </IconButton>
  );
});

CloseButton.displayName = 'CloseButton';
