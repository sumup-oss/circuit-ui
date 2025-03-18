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

import { utilClasses } from '../../../../styles/utility.js';

import classes from './BooleanValue.module.css';

interface BooleanValueProps {
  /**
   * A label describing the boolean value.
   */
  label: string;
  /**
   * The boolean value. `true` displays a checkmark, `false` displays a dash.
   */
  value: boolean;
}

export const BooleanValue = ({ label, value }: BooleanValueProps) => (
  <div className={classes.base}>
    <span className={utilClasses.hideVisually}>{label}</span>
    {value ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        data-testid="boolean-value-true"
      >
        <path
          d="M0.000244141 12C0.000244141 5.37258 5.37283 0 12.0002 0C18.6277 0 24.0002 5.37258 24.0002 12C24.0002 18.6274 18.6277 24 12.0002 24C5.37283 24 0.000244141 18.6274 0.000244141 12Z"
          fill="var(--cui-bg-success)"
        />

        <path
          d="M10.0002 16.4L6.00024 12.4L7.40024 11L10.0002 13.6L16.6002 7L18.0002 8.4L10.0002 16.4Z"
          fill="var(--cui-fg-success)"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        data-testid="boolean-value-false"
      >
        <rect
          x="6"
          y="11"
          width="12"
          height="2"
          fill="var(--cui-fg-placeholder)"
        />
      </svg>
    )}
  </div>
);
