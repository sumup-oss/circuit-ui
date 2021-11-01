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
import { entries, includes, isEmpty, groupBy, sortBy } from 'lodash/fp';
import { light } from '@sumup/design-tokens';
import * as iconComponents from '@sumup/icons';
import { icons } from '@sumup/icons/manifest.json';
import {
  Headline,
  Body,
  InlineElements,
  Label,
  SearchInput,
  Select,
} from '@sumup/circuit-ui';

function group(key, collection) {
  const grouped = groupBy(key, collection);
  return entries(grouped).map(([name, items]) => ({ [key]: name, items }));
}

function getComponentName(name) {
  // Split on non-word characters
  const words = name.split(/[^a-z0-9]/i);
  // Uppercase the first letter and lowercase the rest
  const pascalCased = words.map(
    (part) => part.charAt(0).toUpperCase() + part.substr(1).toLowerCase(),
  );
  return pascalCased.join('');
}

const Filters = styled(InlineElements)`
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
`;

const Size = styled.p`
  color: ${(p) => p.theme.colors.n700};
  font-style: italic;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px; /* 2 * 32px icon */
`;

const iconStyles = (color) => (theme) => css`
  transform: scale(2);
  max-width: 3rem;
  color: ${theme.colors[color]};
  background-color: ${color === 'white'
    ? theme.colors.black
    : theme.colors.bodyBg};
`;

const Icons = () => {
  const [search, setSearch] = useState('');
  const [size, setSize] = useState('all');
  const [color, setColor] = useState('n900');

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
    { label: 'Black', value: 'black' },
    { label: 'Gray', value: 'n500' },
    { label: 'White', value: 'white' },
    { label: 'Primary', value: 'p500' },
    { label: 'Success', value: 'success' },
    { label: 'Warning', value: 'warning' },
    { label: 'Danger', value: 'danger' },
  ];

  const activeIcons = icons.filter(
    (icon) =>
      includes(search, icon.name) && (size === 'all' || size === icon.size),
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

      {isEmpty(activeIcons) ? (
        <Body>No icons found</Body>
      ) : (
        group('category', activeIcons).map(({ category, items }) => (
          <Category key={category}>
            <Headline as="h3" size="three">
              {category}
            </Headline>
            <List>
              {sortBy('name', items).map((icon) => {
                const id = `${icon.name}-${icon.size}`;
                const componentName = getComponentName(icon.name);
                const Icon = iconComponents[componentName];
                return (
                  <Wrapper key={id}>
                    <IconWrapper>
                      <Icon
                        id={id}
                        size={icon.size}
                        css={iconStyles(color)}
                      />
                    </IconWrapper>
                    <Label htmlFor="id">
                      {icon.name}
                      {size === 'all' && <Size>{icon.size}</Size>}
                    </Label>
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
