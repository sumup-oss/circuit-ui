import LinkTo from '@storybook/addon-links/react';

const LINK_PREFIXES = ['/', 'http', 'mailto', '#', 'tel'];

const Link = ({ children, href, ...props }) => {
  const storyName = decodeURIComponent(href);

  const isStoryName = !LINK_PREFIXES.some((prefix) =>
    storyName.startsWith(prefix),
  );

  if (isStoryName) {
    const [group, component, name = 'base'] = storyName.split('/');
    const kind = `${group}/${component}`;
    return (
      <LinkTo {...props} kind={kind} story={name}>
        {children}
      </LinkTo>
    );
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
};

export default Link;
