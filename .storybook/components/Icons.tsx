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
  useState,
  type Dispatch,
  type SetStateAction,
  type ChangeEvent,
} from 'react';
import { Unstyled } from '@storybook/addon-docs/blocks';
import * as iconComponents from '@sumup-oss/icons';
import { getIconURL, type IconComponentType } from '@sumup-oss/icons';
import type { IconsManifest } from '@sumup-oss/icons';
import iconsManifest from '@sumup-oss/icons/manifest.json';
import { Badge } from '../../packages/circuit-ui/components/Badge/Badge.js';
import { Body } from '../../packages/circuit-ui/components/Body/Body.js';
import { Headline } from '../../packages/circuit-ui/components/Headline/Headline.js';
import { SearchInput } from '../../packages/circuit-ui/components/SearchInput/SearchInput.js';
import { Select } from '../../packages/circuit-ui/components/Select/Select.js';
import { SelectorGroup } from '../../packages/circuit-ui/components/SelectorGroup/SelectorGroup.js';
import { Tooltip } from '../../packages/circuit-ui/components/Tooltip/Tooltip.js';
import { IconButton } from '../../packages/circuit-ui/components/Button/IconButton.js';
import { ToastProvider } from '../../packages/circuit-ui/components/ToastContext/ToastContext.js';
import { useNotificationToast } from '../../packages/circuit-ui/components/NotificationToast/NotificationToast.js';
import { clsx } from '../../packages/circuit-ui/styles/clsx.js';
import { utilClasses } from '../../packages/circuit-ui/styles/utility.js';
import { slugify } from '../slugify.js';
import classes from './Icons.module.css';
import ReactIcon from '../public/images/react.svg';
function groupBy(
  icons: IconsManifest['icons'],
  key: 'name' | 'category' | 'size',
) {
  return icons.reduce(
    (groups, icon) => {
      groups[icon[key]] = groups[icon[key]] || [];
      groups[icon[key]].push(icon);
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

export function Icons() {
  const [search, setSearch] = useState('');
  const [size, setSize] = useState('all');
  const [color, setColor] = useState('var(--cui-fg-normal)');
  const [scale, setScale] = useState('one-x');

  const handleChange =
    (setState: Dispatch<SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const lowerCaseSearch = search.toLowerCase();
  const activeIcons = iconsManifest.icons.filter((icon) => {
    const matchesKeyword = [icon.name, ...(icon.keywords || [])].some(
      (keyword) => {
        const lowerCaseKeyword = keyword.toLowerCase();
        return (
          lowerCaseKeyword.includes(lowerCaseSearch) ||
          lowerCaseKeyword.replace(/_/g, '').includes(lowerCaseSearch)
        );
      },
    );
    const matchesSize = size === 'all' || size === icon.size;
    return matchesKeyword && matchesSize;
  }) as IconsManifest['icons'];

  return (
    <Unstyled>
      <ToastProvider>
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
              <Headline as="h2" size="m" id={slugify(category)}>
                {category}
              </Headline>
              <div className={classes.list}>
                {sortBy(items, 'name').map((icon) => (
                  <Icon
                    key={`${icon.name}-${icon.size}`}
                    icon={icon}
                    scale={scale}
                    color={color}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </ToastProvider>
    </Unstyled>
  );
}

function Icon({
  icon,
  scale,
  color,
}: {
  icon: IconsManifest['icons'][number];
  scale: string;
  color: string;
}) {
  const { setToast } = useNotificationToast();

  const id = `${icon.name}-${icon.size}`;
  const componentName = getComponentName(
    icon.name,
  ) as keyof typeof iconComponents;
  const Icon = iconComponents[componentName] as IconComponentType;

  const copyIconURL = () => {
    const iconURL = `https://circuit.sumup.com/icons/v2/${icon.name}_${icon.size}.svg`;
    navigator.clipboard
      .writeText(iconURL)
      .then(() => {
        setToast({
          variant: 'success',
          body: `Copied the ${componentName} (${icon.size}) icon URL to the clipboard.`,
        });
      })
      .catch((error) => {
        console.error(error);
        setToast({
          variant: 'danger',
          body: `Failed to copy the ${componentName} (${icon.size}) icon URL to the clipboard.`,
        });
      });
  };

  const copyIconReactName = () => {
    const reactName = getComponentName(icon.name);
    navigator.clipboard
      .writeText(reactName)
      .then(() => {
        setToast({
          variant: 'success',
          body: `Copied the ${icon.name} icon's React name to the clipboard.`,
        });
      })
      .catch((error) => {
        console.error(error);
        setToast({
          variant: 'danger',
          body: `Failed to copy the ${icon.name} icon's React name to the clipboard.`,
        });
      });
  };

  return (
    <div className={classes.wrapper}>
      <div className={clsx(classes['icon-wrapper'], classes[scale])}>
        {icon.skipComponentFile ? (
          <img
            src={getIconURL(icon.name)}
            aria-labelledby={id}
            alt={icon.name}
            height={15}
            width={20}
          />
        ) : (
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
        )}
      </div>
      <span id={id} className={classes.label}>
        {icon.name}
        <span className={classes.size}>{icon.size}</span>
      </span>
      {icon.deprecation && (
        <Tooltip
          type="description"
          label={icon.deprecation}
          component={(props) => (
            <Badge
              {...props}
              tabIndex={0}
              variant="warning"
              className={classes.badge}
            >
              Deprecated
            </Badge>
          )}
        />
      )}
      <div className={classes.actions}>
        {navigator.clipboard && (
          <IconButton
            variant="tertiary"
            size="s"
            icon={iconComponents.Link}
            onClick={copyIconURL}
          >
            Copy URL
          </IconButton>
        )}
        {!icon.skipComponentFile && (
          <IconButton
            variant="tertiary"
            size="s"
            icon={ReactIcon}
            onClick={copyIconReactName}
          >
            Copy React component name
          </IconButton>
        )}
      </div>
    </div>
  );
}
