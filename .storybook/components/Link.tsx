import type { AnchorHTMLAttributes } from 'react';
import LinkTo from '@storybook/addon-links/react';

const LINK_PREFIXES = ['/', 'http', 'mailto', '#', 'tel'];

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export function Link({ children, href, ...props }: LinkProps) {
  const storyName = decodeURIComponent(href);

  const isStoryName = !LINK_PREFIXES.some((prefix) =>
    storyName.startsWith(prefix),
  );

  if (isStoryName) {
    const parts = storyName.split('/');
    const name = parts.length > 2 ? parts[parts.length - 1] : 'base';
    const components = parts.slice(0, parts.length - 1);
    const title = components.join('/');
    return (
      <LinkTo {...props} title={title} name={name}>
        {children}
      </LinkTo>
    );
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
