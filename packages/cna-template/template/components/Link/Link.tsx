import { ReactNode } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

export type LinkProps = NextLinkProps & {
  children: ReactNode;
  className?: string;
};

export function Link({
  children,
  className,
  ...props
}: LinkProps): JSX.Element {
  return (
    <NextLink {...props}>
      <a className={className}>{children}</a>
    </NextLink>
  );
}
