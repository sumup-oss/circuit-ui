/**
 * Copyright 2023, SumUp Ltd.
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

import { useEffect, useState } from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { light } from '@sumup/design-tokens';
import {
  Anchor,
  spacing,
  Table,
  ToastProvider,
  useNotificationToast,
} from '@sumup/circuit-ui';

const getCustomProperty = (property: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(property);
};

function Copy({ property }: { property: string }) {
  const { setToast } = useNotificationToast();
  return (
    <Anchor
      css={spacing({ left: 'kilo' })}
      size="two"
      /* https://caniuse.com/mdn-api_clipboard_writetext */
      onClick={() =>
        navigator.clipboard
          .writeText(property)
          .then(() => setToast({ body: 'Copied!', variant: 'confirm' }))
      }
    >
      Copy
    </Anchor>
  );
}

const getRows = (customProperties: string[][]) => {
  return customProperties.map(([property, value]) => [
    {
      children: (
        <div
          css={css`
            display: flex;
          `}
        >
          <code>{property}</code>
          <Copy property={property} />
        </div>
      ),
    },
    { children: <code>{value}</code> },
    {
      align: 'right' as const,
      children: (
        <span
          css={css`
            display: block;
            width: auto;
            height: 1em;
            background: var(${property});
            border: 1px solid var(--cui-border-normal);
          `}
        />
      ),
    },
  ]);
};

function ColorsTable({ customProperties }: { customProperties: string[] }) {
  const [colors, setColors] = useState<string[][]>();

  useEffect(() => {
    setColors(
      customProperties.map((property) => [
        property,
        getCustomProperty(property),
      ]),
    );
  }, []);

  return (
    <ThemeProvider theme={light}>
      <ToastProvider>
        <div className="sb-unstyled">
          {colors && (
            <Table
              condensed
              headers={['Property name', 'Color value', 'Preview']}
              rows={getRows(colors)}
            />
          )}
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default ColorsTable;
