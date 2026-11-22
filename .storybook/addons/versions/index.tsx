// @ts-expect-error React isn't injected globally in this file
// biome-ignore lint/correctness/noUnusedImports: React isn't injected globally in this file
import React from 'react';
import {
  ActionList,
  Button,
  PopoverProvider,
} from 'storybook/internal/components';
import { ChevronSmallDownIcon } from '@storybook/icons';
import { useParameter } from 'storybook/manager-api';

type Version = {
  name:
    | `v${number}`
    | `v${number}.${number}`
    | `v${number}.${number}.${number}`;
  url: string;
};

type VersionsParameter = { current?: string; previous: Version[] };

export const PARAM_KEY = 'versions';
const DEFAULT_CONFIG: VersionsParameter = { previous: [] };

export function Versions() {
  const config = useParameter<VersionsParameter>(PARAM_KEY, DEFAULT_CONFIG);

  if (!config.current) {
    return null;
  }

  return (
    <PopoverProvider
      ariaLabel="Previous documentation versions"
      padding={0}
      popover={({ onHide }) => (
        <ActionList>
          {config.previous.map((version) => (
            <ActionList.Item key={version.name}>
              <ActionList.Link
                ariaLabel={false}
                href={version.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onHide}
              >
                <ActionList.Text>{version.name}</ActionList.Text>
              </ActionList.Link>
            </ActionList.Item>
          ))}
        </ActionList>
      )}
    >
      <Button
        ariaLabel={`Switch documentation version, currently ${config.current}`}
        variant="ghost"
        padding="small"
      >
        {config.current} <ChevronSmallDownIcon aria-hidden="true" />
      </Button>
    </PopoverProvider>
  );
}
