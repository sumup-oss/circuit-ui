/**
 * Copyright 2024, SumUp Ltd.
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

import { Temporal } from 'temporal-polyfill';

import { Stack } from '../../../../.storybook/components/Stack.js';

import { Timestamp, type TimestampProps } from './Timestamp.js';

export default {
  title: 'Components/Timestamp',
  component: Timestamp,
  tags: ['status:experimental'],
};

const datetimes = [
  Temporal.Now.zonedDateTimeISO().add({ months: 4 }),
  Temporal.Now.zonedDateTimeISO().add({ seconds: 64 }),
  Temporal.Now.zonedDateTimeISO().subtract({ minutes: 7 }),
  Temporal.Now.zonedDateTimeISO().subtract({ days: 1 }),
  Temporal.Now.zonedDateTimeISO().subtract({ weeks: 5 }),
] as const;
const locales = ['en-US', 'de-DE', 'pt-BR'] as const;
const variants = ['absolute', 'relative'] as const;
const formatStyles = ['long', 'short', 'narrow'] as const;

export const Base = (args: TimestampProps) => <Timestamp {...args} />;

Base.args = {
  datetime: datetimes[2].toString(),
};

export const Relative = (args: TimestampProps) => (
  <Stack>
    {locales.map((locale) => (
      <Stack vertical key={locale}>
        {datetimes.map((datetime) => (
          <Timestamp
            {...args}
            key={datetime.toString()}
            datetime={datetime.toString()}
            locale={locale}
          />
        ))}
      </Stack>
    ))}
  </Stack>
);

Relative.args = {
  variant: 'relative',
};

export const Absolute = (args: TimestampProps) => (
  <Stack>
    {locales.map((locale) => (
      <Stack vertical key={locale}>
        {datetimes.map((datetime) => (
          <Timestamp
            {...args}
            key={datetime.toString()}
            datetime={datetime.toString()}
            locale={locale}
          />
        ))}
      </Stack>
    ))}
  </Stack>
);

Absolute.args = {
  variant: 'absolute',
};

export const FormatStyles = (args: TimestampProps) => (
  <table style={{ textAlign: 'center' }}>
    <thead>
      <tr>
        <th />
        {variants.map((variant) => (
          <th key={variant} scope="col">
            {variant}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {formatStyles.map((formatStyle) => (
        <tr key={formatStyle}>
          <th scope="row">{formatStyle}</th>
          {variants.map((variant) => (
            <td key={formatStyle} style={{ padding: '8px' }}>
              <Timestamp
                {...args}
                variant={variant}
                formatStyle={formatStyle}
              />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

FormatStyles.args = {
  datetime: datetimes[2].toString(),
  includeTime: true,
};
