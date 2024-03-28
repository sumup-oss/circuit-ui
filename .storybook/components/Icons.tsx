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

import {
  type Dispatch,
  type SetStateAction,
  useState,
  ChangeEvent,
} from 'react';
import { Unstyled } from '@storybook/addon-docs';
import * as iconComponents from '@sumup/icons';
import type { IconsManifest } from '@sumup/icons';
import iconsManifest from '@sumup/icons/manifest.json';
import {
  Headline,
  Body,
  SearchInput,
  Select,
  Badge,
  SelectorGroup,
  clsx,
  utilClasses,
} from '../../packages/circuit-ui/index.js';
import { Tooltip } from '../../packages/circuit-ui/experimental.js';
import { slugify } from '../slugify.js';
import classes from './Icons.module.css';

function groupBy(
  icons: IconsManifest['icons'],
  key: 'name' | 'category' | 'size',
) {
  return icons.reduce(
    (groups, icon) => {
      (groups[icon[key]] = groups[icon[key]] || []).push(icon);
      return groups;
    },
    {} as Record<string, IconsManifest['icons']>,
  );
}

function sortBy(
  icons: IconsManifest['icons'],
  key: 'name' | 'category' | 'size',
) {
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

const Icons = () => {
  const [search, setSearch] = useState('');
  const [size, setSize] = useState('all');
  const [color, setColor] = useState('var(--cui-fg-normal)');
  const [scale, setScale] = useState('one-x');

  const handleChange =
    (setState: Dispatch<SetStateAction<string>>) =>
    (event: ChangeEvent<any>) => {
      setState(event.target.value);
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

  const scaleOptions = [
    { label: '1x', value: 'one-x' },
    { label: '2x', value: 'two-x' },
  ];

  const activeIcons = iconsManifest.icons.filter((icon) => {
    const matchesKeyword = [icon.name, ...(icon.keywords || [])].some(
      (keyword) => keyword.toLowerCase().includes(search.toLowerCase()),
    );
    const matchesSize = size === 'all' || size === icon.size;
    return matchesKeyword && matchesSize;
  }) as IconsManifest['icons'];

  return (
    <Unstyled>
      <fieldset className={classes.filters}>
        <legend className={utilClasses.hideVisually}>Icon filters</legend>
        <SearchInput
          label="Search by name or keyword"
          placeholder="Search..."
          value={search}
          onChange={handleChange(setSearch)}
          onClear={() => setSearch('')}
          clearLabel="Clear"
        />
        <Select
          label="Size"
          options={sizeOptions}
          value={size}
          onChange={handleChange(setSize)}
        />
        <Select
          label="Color"
          options={colorOptions}
          value={color}
          onChange={handleChange(setColor)}
        />
        <SelectorGroup
          label="Scale"
          options={scaleOptions}
          value={scale}
          onChange={handleChange(setScale)}
        />
      </fieldset>

      {activeIcons.length <= 0 ? (
        <Body>No icons found</Body>
      ) : (
        Object.entries<IconsManifest['icons']>(
          groupBy(activeIcons, 'category'),
        ).map(([category, items]) => (
          <section key={category} className={classes.category}>
            <Headline as="h2" size="two" id={slugify(category)}>
              {category}
            </Headline>
            <div className={classes.list}>
              {sortBy(items, 'name').map((icon) => {
                const id = `${icon.name}-${icon.size}`;
                const componentName = getComponentName(icon.name);
                const Icon = iconComponents[componentName];
                return (
                  <div key={id} className={classes.wrapper}>
                    <div
                      className={clsx(classes['icon-wrapper'], classes[scale])}
                    >
                      <Icon
                        aria-labelledby={id}
                        size={icon.size}
                        className={classes.icon}
                        style={{
                          color,
                          backgroundColor:
                            color === 'var(--cui-fg-on-strong)'
                              ? 'var(--cui-bg-strong)'
                              : 'var(--cui-bg-normal)',
                        }}
                      />
                    </div>
                    <span id={id} className={classes.label}>
                      {componentName}
                      {size === 'all' && (
                        <span className={classes.size}>{icon.size}</span>
                      )}
                    </span>
                    {icon.deprecation && (
                      <Tooltip
                        type="description"
                        label={icon.deprecation}
                        component={(props) => (
                          <Badge
                            {...props}
                            tabIndex={0}
                            variant="danger"
                            className={classes.badge}
                          >
                            Deprecated
                          </Badge>
                        )}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))
      )}
    </Unstyled>
  );
};

export default Icons;
