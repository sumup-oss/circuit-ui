import React from 'react';

import { render } from '../../test-utils';

import { Meta, MetaProps } from './Meta';

/**
 * The Head component from Next.js renders its children into the head element
 * as a side-effect, meaning we can't access them unless we mock the component.
 */
// eslint-disable-next-line react/display-name
jest.mock('next/head', () => (props: any) => <div {...props} />);

describe('Meta', () => {
  /**
   * Having a separate rendering function for your components makes it easier
   * to render a separate component for each test and reduces boilerplate.
   */
  function renderMeta(props: MetaProps, options = {}) {
    return render(<Meta {...props} />, options);
  }

  /**
   * Default props help you have sensible defaults that work for most tests.
   * You can pass in custom props to customize rendering for your current test.
   */
  const defaultProps = {
    title: 'Welcome to SumUp Next.js',
    path: '/',
  };

  it('should include base meta tags', () => {
    const { container } = renderMeta(defaultProps);

    expect(container.querySelector('title')).toHaveTextContent(
      'Welcome to SumUp Next.js · SumUp',
    );
    expect(container.querySelector('meta[name="description"]')).toBeNull();
    expect(container.querySelector('meta[name="robots"]')).toHaveAttribute(
      'content',
      'index follow',
    );
    expect(container.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://example.sumup.com/',
    );
    expect(
      container.querySelector('meta[property="og:site_name"]'),
    ).toHaveAttribute('content', 'SumUp');
    expect(container.querySelector('meta[property="og:type"]')).toHaveAttribute(
      'content',
      'website',
    );
    expect(container.querySelector('meta[property="og:url"]')).toHaveAttribute(
      'content',
      'https://example.sumup.com/',
    );
    expect(
      container.querySelector('meta[property="og:locale"]'),
    ).toHaveAttribute('content', 'en');
    expect(
      container.querySelector('meta[property="og:description"]'),
    ).toBeNull();
    expect(container.querySelector('meta[property="og:image"]')).toBeNull();
    expect(container.querySelector('meta[property="og:image:alt"]')).toBeNull();
    expect(container.querySelector('meta[property="og:updated"]')).toBeNull();
    expect(container.querySelector('meta[name="twitter:site"]')).toBeNull();
    expect(
      container.querySelector('meta[name="twitter:image:alt"]'),
    ).toBeNull();
    expect(
      container.querySelector('meta[name="twitter:card"]'),
    ).toHaveAttribute('content', 'summary');
  });

  it('should include all meta tags', () => {
    const props = {
      ...defaultProps,
      description:
        'This is a Next.js-based starter project featuring some SumUp-specific customizations.',
      image: {
        src: 'https://example.sumup.com/preview.png',
        alt: 'A description of the preview image for screenreader users',
      },
      index: false,
      follow: false,
      siteName: 'Custom Name',
      type: 'article',
      updatedAt: 'asdfsf',
      twitter: 'sumup',
    };
    const { container } = renderMeta(props);

    expect(container.querySelector('title')).toHaveTextContent(
      'Welcome to SumUp Next.js · Custom Name',
    );
    expect(container.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      props.description,
    );
    expect(container.querySelector('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex nofollow',
    );
    expect(container.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://example.sumup.com/',
    );
    expect(
      container.querySelector('meta[property="og:site_name"]'),
    ).toHaveAttribute('content', props.siteName);
    expect(container.querySelector('meta[property="og:type"]')).toHaveAttribute(
      'content',
      'article',
    );
    expect(container.querySelector('meta[property="og:url"]')).toHaveAttribute(
      'content',
      'https://example.sumup.com/',
    );
    expect(
      container.querySelector('meta[property="og:locale"]'),
    ).toHaveAttribute('content', 'en');
    expect(
      container.querySelector('meta[property="og:description"]'),
    ).toHaveAttribute('content', props.description);
    expect(
      container.querySelector('meta[property="og:image"]'),
    ).toHaveAttribute('content', props.image.src);
    expect(
      container.querySelector('meta[property="og:image:alt"]'),
    ).toHaveAttribute('content', props.image.alt);
    expect(
      container.querySelector('meta[property="og:updated"]'),
    ).toHaveAttribute('content', props.updatedAt);
    expect(
      container.querySelector('meta[name="twitter:site"]'),
    ).toHaveAttribute('content', '@sumup');
    expect(
      container.querySelector('meta[name="twitter:image:alt"]'),
    ).toHaveAttribute('content', props.image.alt);
    expect(
      container.querySelector('meta[name="twitter:card"]'),
    ).toHaveAttribute('content', 'summary_large_image');
  });

  it('should include additional children', () => {
    const props = {
      ...defaultProps,
      children: (
        <meta
          property="og:video"
          content="https://example.sumup.com/video.mp4"
        />
      ),
    };
    const { container } = renderMeta(props);

    expect(container.querySelector('meta[property="og:video"')).toHaveAttribute(
      'content',
      'https://example.sumup.com/video.mp4',
    );
  });
});
