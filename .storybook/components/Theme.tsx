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

import { useEffect, useState, type ComponentType } from 'react';
import { ThemeProvider, useTheme } from '@emotion/react';
import { Unstyled } from '@storybook/addon-docs';
import { light, schema } from '@sumup-oss/design-tokens';
import { SumUpLogomark } from '@sumup-oss/icons';
import {
  Anchor,
  Badge,
  Table,
  ToastProvider,
  useNotificationToast,
  type TableHeaderCell,
  type TableRow,
} from '../../packages/circuit-ui/index.js';
import { Tooltip } from '../../packages/circuit-ui/experimental.js';

type CustomPropertyName = `--cui-${string}`;
type CustomPropertyValue = string;
type CustomProperty = {
  name: CustomPropertyName;
  value: CustomPropertyValue;
  deprecation?: { replacement: CustomPropertyName };
};
type CustomProperties = CustomProperty[];

type PreviewProps = { name: CustomPropertyName };
type PreviewComponent = ComponentType<PreviewProps>;

function filterCustomProperties(namespace: string | string[], type?: string) {
  return schema.filter((token) => {
    const isNamespace =
      typeof namespace === 'string'
        ? token.name.startsWith(`--cui-${namespace}`)
        : namespace.some((ns) => token.name.startsWith(`--cui-${ns}`));
    const isType = type ? token.type === type : true;
    return isNamespace && isType;
  });
}

function getCustomPropertyValue(name: CustomPropertyName): CustomPropertyValue {
  return getComputedStyle(document.documentElement).getPropertyValue(name);
}

function CopyButton({ name }: { name: CustomPropertyName }) {
  const { setToast } = useNotificationToast();
  return (
    <Anchor
      style={{ marginLeft: '1rem' }}
      size="two"
      onClick={() =>
        navigator.clipboard
          .writeText(name)
          .then(() => setToast({ body: 'Copied!', variant: 'success' }))
      }
    >
      Copy
    </Anchor>
  );
}

function getRows(
  customProperties: CustomProperties,
  Preview?: PreviewComponent,
) {
  return customProperties.map(({ name, value, deprecation }) => {
    const row: TableRow = [
      {
        children: (
          <div style={{ display: 'flex' }}>
            <code
              style={{
                whiteSpace: 'nowrap',
                maxWidth: '320px',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {name}
            </code>
            {!deprecation && <CopyButton name={name} />}
            {deprecation && (
              <Tooltip
                type="description"
                label={`Use the \`${deprecation.replacement}\` custom property instead.`}
                component={(props) => (
                  <Badge
                    {...props}
                    tabIndex={0}
                    variant="warning"
                    style={{ marginLeft: '1rem' }}
                  >
                    Deprecated
                  </Badge>
                )}
              />
            )}
          </div>
        ),
      },
      { children: <code>{value}</code> },
    ];

    if (Preview) {
      row.push({
        align: 'right',
        children: <Preview name={name} />,
      });
    }

    return row;
  });
}

interface CustomPropertiesTableProps {
  namespace: string | string[];
  preview?: PreviewComponent;
  type?: string;
}

export function CustomPropertiesTable({
  namespace,
  type,
  preview,
}: CustomPropertiesTableProps) {
  const [customProperties, setCustomProperties] = useState<CustomProperties>();

  useEffect(() => {
    const tokens = filterCustomProperties(namespace, type);
    setCustomProperties(
      tokens.map((token) => ({
        ...token,
        value: getCustomPropertyValue(token.name),
      })),
    );
  }, [namespace, type]);

  const headers: TableHeaderCell[] = ['Property name', 'Value'];

  if (preview) {
    headers.push({ children: 'Preview', align: 'right' });
  }

  return (
    <ToastProvider>
      <Unstyled>
        {customProperties && (
          <Table
            condensed
            headers={headers}
            rows={getRows(customProperties, preview)}
          />
        )}
      </Unstyled>
    </ToastProvider>
  );
}

export function BorderRadius({ name }: PreviewProps) {
  return (
    <div
      style={{
        display: 'inline-block',
        width: 'var(--cui-spacings-tera)',
        height:
          name === '--cui-border-radius-pill'
            ? 'var(--cui-spacings-mega)'
            : 'var(--cui-spacings-tera)',
        borderRadius: `var(${name})`,
        backgroundColor: 'var(--cui-bg-accent-strong)',
      }}
    />
  );
}

export function BorderWidth({ name }: PreviewProps) {
  return (
    <div
      style={{
        display: 'inline-block',
        width: 'var(--cui-spacings-tera)',
        height: 'var(--cui-spacings-tera)',
        backgroundColor: 'var(--cui-bg-normal)',
        borderRadius: 'var(--cui-border-radius-bit)',
        border: `var(${name}) solid var(--cui-border-accent)`,
      }}
    />
  );
}

export function Color({ name }: PreviewProps) {
  return (
    <span
      style={{
        display: 'block',
        width: 'auto',
        height: '1.25em',
        background: `var(${name})`,
        border: '1px solid var(--cui-border-normal)',
      }}
    />
  );
}

export function FontStack({ name }: PreviewProps) {
  return (
    <p style={{ fontFamily: `var(${name})`, whiteSpace: 'nowrap' }}>
      Lorem ipsum
    </p>
  );
}

export function FontWeight({ name }: PreviewProps) {
  return (
    // @ts-expect-error A CSS custom property is a valid font weight
    <p style={{ fontWeight: `var(${name})`, whiteSpace: 'nowrap' }}>
      Lorem ipsum
    </p>
  );
}

export function Typography({ name }: PreviewProps) {
  if (name.includes('font-size')) {
    return (
      <p style={{ fontSize: `var(${name})`, lineHeight: 1 }}>Lorem ipsum</p>
    );
  }
  if (name.includes('line-height')) {
    return <p style={{ lineHeight: `var(${name})` }}>Lorem ipsum</p>;
  }
  if (name.includes('letter-spacing')) {
    return <p style={{ letterSpacing: `var(${name})` }}>Lorem ipsum</p>;
  }
  return null;
}

export function IconSize({ name }: PreviewProps) {
  return (
    <SumUpLogomark
      style={{
        width: `var(${name})`,
        height: `var(${name})`,
        color: 'var(--cui-bg-strong)',
      }}
    />
  );
}

export function Spacing({ name }: PreviewProps) {
  return (
    <div
      style={{
        display: 'inline-block',
        width: `var(${name})`,
        height: `var(${name})`,
        backgroundColor: 'var(--cui-bg-accent-strong)',
      }}
    />
  );
}

export function Transition({ name }: PreviewProps) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setScale((prev) => (prev === 100 ? 50 : 100));
    }, 2000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div
      style={{
        display: 'inline-block',
        width: 'var(--cui-spacings-tera)',
        height: 'var(--cui-spacings-tera)',
        backgroundColor: 'var(--cui-bg-accent-strong)',
        borderRadius: 'var(--cui-border-radius-circle)',
        transition: `transform var(${name})`,
        transform: `scale(${scale}%)`,
      }}
    />
  );
}

const HEADERS = ['Media query name', 'Value'];

function TableWrapper() {
  const theme = useTheme();
  return (
    <Unstyled>
      <Table
        headers={HEADERS}
        rows={Object.keys(theme.mq).map((bp) => [
          { children: <code>{`theme.mq.${bp}`}</code> },
          {
            children: <code>{theme.mq[bp as keyof typeof theme.mq]}</code>,
          },
        ])}
      />
    </Unstyled>
  );
}

export function MediaQueriesTable() {
  return (
    <ThemeProvider theme={light}>
      <TableWrapper />
    </ThemeProvider>
  );
}
