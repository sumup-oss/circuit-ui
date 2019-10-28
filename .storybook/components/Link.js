import React from 'react';
import LinkTo from '@storybook/addon-links/react';
import { isStoryName, splitStoryName } from '../util/story-helpers';

import { Text } from '../../src';

const Link = ({ children, href, size, ...props }) => {
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
    <Text as="a" href={href} target="_blank" size={size} {...props}>
      {children}
    </Text>
  );
};

export default Link;
