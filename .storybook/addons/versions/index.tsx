// @ts-expect-error React isn't injected globally in this file
// biome-ignore lint/correctness/noUnusedImports: React isn't injected globally in this file
import React, { useState } from 'react';
import {
  IconButton,
  WithTooltip,
  TooltipLinkList,
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

  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  if (!config.current) {
    return null;
  }

  return (
    <WithTooltip
      placement="top"
      closeOnOutsideClick
      tooltip={() => (
        <TooltipLinkList
          links={config.previous.map((version) => ({
            id: version.name,
            title: version.name,
            onClick: () => {
              window.open(version.url, '_blank');
              setIsTooltipVisible(false);
            },
            value: version.name,
          }))}
        />
      )}
      onVisibleChange={setIsTooltipVisible}
    >
      {/* eslint-disable-next-line circuit-ui/no-renamed-props */}
      <IconButton
        key="versions"
        title="Switch to previous versions of the documentation"
        active={isTooltipVisible}
      >
        {config.current} <ChevronSmallDownIcon aria-hidden="true" />
      </IconButton>
    </WithTooltip>
  );
}
