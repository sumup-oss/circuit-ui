import {
  getIllustrationUrl,
  IllustrationManifest,
  Illustration,
  type Category,
} from '@sumup-oss/illustrations';
import { useNotificationToast } from '../../packages/circuit-ui/components/NotificationToast/index.js';
import * as iconComponents from '@sumup-oss/icons';
import classes from './Illustrations.module.css';
import { clsx } from '../../packages/circuit-ui/styles/clsx.js';
import { IconButton } from '../../packages/circuit-ui/components/Button/index.js';
import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useState,
} from 'react';
import illustrationsManifest from '@sumup-oss/illustrations/manifest.json' with {
  type: 'json',
};
import { Unstyled } from '@storybook/blocks';
import { ToastProvider } from '../../packages/circuit-ui/components/ToastContext/index.js';
import { utilClasses } from '../../packages/circuit-ui/styles/utility.js';
import { SearchInput } from '../../packages/circuit-ui/components/SearchInput/index.js';
import { Select } from '../../packages/circuit-ui/components/Select/index.js';
import { Body } from '../../packages/circuit-ui/components/Body/Body.js';
import { Headline } from '../../packages/circuit-ui/components/Headline/index.js';
import { slugify } from '../slugify.js';

/* eslint-disable compat/compat */

function groupByCategory(illustrations: IllustrationManifest['illustrations']) {
  return illustrations.reduce(
    (groups, illustration) => {
      groups[illustration.category] = groups[illustration.category] || [];
      groups[illustration.category].push(illustration);
      return groups;
    },
    {} as Record<Category, IllustrationManifest['illustrations']>,
  );
}

function sortByName(illustrations: IllustrationManifest['illustrations']) {
  return illustrations.sort((illustrationA, illustrationB) =>
    illustrationA.name.localeCompare(illustrationB.name),
  );
}

function IllustrationPreview({
  illustration,
}: {
  illustration: IllustrationManifest['illustrations'][number];
}) {
  const { setToast } = useNotificationToast();

  const id = `${illustration.name}-${illustration.size}-${illustration.theme}`;

  const copyIllustrationURL = () => {
    const illustrationURL = getIllustrationUrl(
      illustration.name,
      illustration.size,
      illustration.theme,
    );
    navigator.clipboard
      .writeText(illustrationURL)
      .then(() => {
        setToast({
          variant: 'success',
          body: `Copied the ${illustration.name} (${illustration.size}) illustration in the ${illustration.theme} theme URL to the clipboard.`,
        });
      })
      .catch((error) => {
        console.error(error);
        setToast({
          variant: 'danger',
          body: `Failed to copy the ${illustration.name} (${illustration.size}) illustration in the ${illustration.theme} theme URL to the clipboard.`,
        });
      });
  };

  return (
    <div className={classes.wrapper}>
      <div className={clsx(classes['illustration-wrapper'])}>
        <Illustration
          variant={illustration.name}
          size={illustration.size}
          theme={illustration.theme}
        />
      </div>
      <span id={id} className={classes.label}>
        {illustration.name}
        <span className={classes.size}>{illustration.size}</span>
      </span>
      <div className={classes.actions}>
        {navigator.clipboard && (
          <IconButton
            variant="tertiary"
            size="s"
            icon={iconComponents.Link}
            onClick={copyIllustrationURL}
          >
            Copy URL
          </IconButton>
        )}
      </div>
    </div>
  );
}

export function Illustrations() {
  const [search, setSearch] = useState('');
  const [size, setSize] = useState('m');
  const [theme, setTheme] = useState('light');

  const handleChange =
    (setState: Dispatch<SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setState(event.target.value);
    };

  const sizeOptions = [
    { label: 's', value: 's' },
    { label: 'm', value: 'm' },
    { label: 'l', value: 'l' },
  ];

  const themeOptions = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'Consumer', value: 'consumer' },
  ];

  const lowerCaseSearch = search.toLowerCase();
  const activeIllustrations = (
    illustrationsManifest as IllustrationManifest
  ).illustrations.filter((illustration) => {
    const matchesKeyword = [
      illustration.name,
      ...(illustration.keywords || []),
    ].some((keyword) => {
      const lowerCaseKeyword = keyword.toLowerCase();
      return (
        lowerCaseKeyword.includes(lowerCaseSearch) ||
        lowerCaseKeyword.replace(/_/g, '').includes(lowerCaseSearch)
      );
    });
    const matchesSize = size === 'all' || size === illustration.size;
    const matchesTheme = theme === illustration.theme;
    return matchesKeyword && matchesSize && matchesTheme;
  });

  return (
    <Unstyled>
      <ToastProvider>
        <fieldset className={classes.filters}>
          <legend className={utilClasses.hideVisually}>
            Illustration filters
          </legend>
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
            label="Theme"
            options={themeOptions}
            value={theme}
            onChange={handleChange(setTheme)}
          />
        </fieldset>

        {activeIllustrations.length <= 0 ? (
          <Body>No illustrations found</Body>
        ) : (
          Object.entries<IllustrationManifest['illustrations']>(
            groupByCategory(activeIllustrations),
          ).map(([category, items]) => (
            <section key={category} className={classes.category}>
              <Headline as="h2" size="m" id={slugify(category)}>
                {category}
              </Headline>
              <div data-color-scheme={theme} className={classes.list}>
                {sortByName(items).map((illustration) => (
                  <IllustrationPreview
                    key={`${illustration.name}-${illustration.size}`}
                    illustration={illustration}
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
