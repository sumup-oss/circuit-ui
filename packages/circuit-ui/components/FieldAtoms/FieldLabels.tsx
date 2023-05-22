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

import type { HTMLAttributes, LabelHTMLAttributes } from 'react';
import { css } from '@emotion/react';

import styled from '../../styles/styled';
import { typography } from '../../styles/style-mixins';

export interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * The identifier of the corresponding form element.
   */
  htmlFor: string;
}

const baseStyles = css`
  display: block;
`;

/**
 * @private
 */
export const FieldLabel = styled.label<FieldLabelProps>(
  baseStyles,
  typography('two'),
);

export type FieldLegendProps = HTMLAttributes<HTMLLegendElement>;

/**
 * @private
 */
export const FieldLegend = styled.legend<FieldLegendProps>(
  baseStyles,
  typography('two'),
);
