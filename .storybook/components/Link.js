import LinkTo from '@storybook/addon-links/react';
import { css } from '@emotion/react';

import { isStoryName, splitStoryName } from '../util/story-helpers';

const styles = css`
  font: inherit;
`;

const Link = ({ children, href, ...props }) => {
  const storyName = decodeURIComponent(href);

  if (isStoryName(storyName)) {
    const [group, component, name = 'base'] = splitStoryName(storyName);
    const kind = `${group}/${component}`;
    return (
      <LinkTo {...props} kind={kind} story={name}>
        {children}
      </LinkTo>
    );
  }

  return (
    <a css={styles} href={href} {...props}>
      {children}
    </a>
  );
};

export default Link;
