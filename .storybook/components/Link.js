import React from 'react';
import LinkTo from '@storybook/addon-links/react';
import { css } from '@emotion/core';

import { isStoryName, splitStoryName } from '../util/story-helpers';

import { Text } from '../../src';

const styles = css`
  font: inherit;
`;

const Link = ({ children, href, ...props }) => {
  const storyName = decodeURIComponent(href);

  if (isStoryName(storyName)) {
    const [group, component, name = 'page'] = splitStoryName(storyName);
    const kind = `${group}|${component}`;
    return (
      <LinkTo {...props} kind={kind} story={name}>
        {children}
      </LinkTo>
    );
  }

  return (
    <a css={styles} href={href} target="_blank" {...props}>
      {children}
    </a>
  );
};

export default Link;
