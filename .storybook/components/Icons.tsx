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

import { useState } from 'react';
import styled from '@emotion/styled';
import { css, ThemeProvider } from '@emotion/react';
import { light } from '@sumup/design-tokens';
import * as iconComponents from '@sumup/icons';
import type { IconsManifest } from '@sumup/icons';
import iconsManifest from '@sumup/icons/manifest.json';
import {
  Headline,
  Body,
  SearchInput,
  Select,
  typography,
  Badge,
} from '@sumup/circuit-ui';

function groupBy(icons: IconsManifest['icons'], key: string) {
  return icons.reduce((groups, icon) => {
    (groups[icon[key]] = groups[icon[key]] || []).push(icon);
    return groups;
  }, {});
}

function sortBy(icons: IconsManifest['icons'], key: string) {
  return icons.sort((iconA, iconB) => {
    return iconA[key].localeCompare(iconB[key]);
  });
}

function getComponentName(name: string) {
  // Split on non-word characters
  const words = name.split(/[^a-z0-9]/i);
  // Uppercase the first letter and lowercase the rest
  const pascalCased = words.map(
    (part) => part.charAt(0).toUpperCase() + part.substr(1).toLowerCase(),
  );
  return pascalCased.join('');
}

const Filters = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: ${(p) => p.theme.spacings.kilo};
  margin-top: ${(p) => p.theme.spacings.tera};
  margin-bottom: ${(p) => p.theme.spacings.peta};
`;

const Category = styled.section`
  margin-bottom: ${(p) => p.theme.spacings.tera};
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Wrapper = styled.div`
  width: 7.5rem;
  text-align: center;
  margin-top: ${(p) => p.theme.spacings.giga};
  margin-bottom: ${(p) => p.theme.spacings.giga};
  position: relative;
`;

const Size = styled.span`
  display: block;
  color: var(--cui-fg-subtle);
  font-style: italic;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px; /* 2 * 32px icon */
`;

const iconStyles = (color: string) =>
  css`
    transform: scale(2);
    max-width: 3rem;
    color: ${color};
    background-color: ${color === 'var(--cui-fg-on-strong)'
      ? 'var(--cui-bg-strong)'
      : 'var(--cui-bg-normal)'};
  `;

const badgeStyles = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-30deg);
`;

const Icons = () => {
  const [search, setSearch] = useState('');
  const [size, setSize] = useState('all');
  const [color, setColor] = useState('var(--cui-fg-normal)');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const sizeOptions = [
    { label: 'All sizes', value: 'all' },
    { label: '16', value: '16' },
    { label: '24', value: '24' },
    { label: '32', value: '32' },
  ];

  const colorOptions = [
    { label: 'Normal', value: 'var(--cui-fg-normal)' },
    { label: 'Subtle', value: 'var(--cui-fg-subtle)' },
    { label: 'Accent', value: 'var(--cui-fg-accent)' },
    { label: 'Success', value: 'var(--cui-fg-success)' },
    { label: 'Warning', value: 'var(--cui-fg-warning)' },
    { label: 'Danger', value: 'var(--cui-fg-danger)' },
    { label: 'On Strong', value: 'var(--cui-fg-on-strong)' },
  ];

  const activeIcons = iconsManifest.icons.filter(
    (icon) =>
      icon.name.includes(search) && (size === 'all' || size === icon.size),
  );

  return (
    <ThemeProvider theme={light}>
      <Filters>
        <SearchInput
          label="Filter icons by name"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
          onClear={() => setSearch('')}
          clearLabel="Clear"
        />
        <Select
          label="Select icon size"
          options={sizeOptions}
          value={size}
          onChange={handleSizeChange}
        />
        <Select
          label="Select icon color"
          options={colorOptions}
          value={color}
          onChange={handleColorChange}
        />
      </Filters>

      {activeIcons.length <= 0 ? (
        <Body>No icons found</Body>
      ) : (
        Object.entries<IconsManifest['icons']>(
          groupBy(activeIcons, 'category'),
        ).map(([category, items]) => (
          <Category key={category}>
            <Headline as="h3" size="three">
              {category}
            </Headline>
            <List>
              {sortBy(items, 'name').map((icon) => {
                const id = `${icon.name}-${icon.size}`;
                const componentName = getComponentName(icon.name);
                const Icon = iconComponents[componentName];
                return (
                  <Wrapper key={id}>
                    <IconWrapper>
                      <Icon
                        aria-labelledby={id}
                        size={icon.size}
                        css={iconStyles(color)}
                      />
                    </IconWrapper>
                    <span id={id} css={typography('two')}>
                      {icon.name}
                      {size === 'all' && <Size>{icon.size}</Size>}
                    </span>
                    {icon.deprecation && (
                      <Badge
                        title={icon.deprecation}
                        variant="warning"
                        css={badgeStyles}
                      >
                        Deprecated
                      </Badge>
                    )}
                  </Wrapper>
                );
              })}
            </List>
          </Category>
        ))
      )}
    </ThemeProvider>
  );
};

export default Icons;
