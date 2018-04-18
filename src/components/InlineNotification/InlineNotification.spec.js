import React from 'react';

import InlineNotification from '.';

describe('InlineNotification', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<InlineNotification />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with success styles', () => {
    const actual = create(
      <InlineNotification type={InlineNotification.SUCCESS} />
    );
    expect(actual).toMatchSnapshot();
  });

  it('should render with warning styles', () => {
    const actual = create(
      <InlineNotification type={InlineNotification.WARNING} />
    );
    expect(actual).toMatchSnapshot();
  });

  it('should render with danger styles', () => {
    const actual = create(
      <InlineNotification type={InlineNotification.DANGER} />
    );
    expect(actual).toMatchSnapshot();
  });

  it('should render with giga spacing', () => {
    const actual = create(
      <InlineNotification
        type={InlineNotification.DANGER}
        size={InlineNotification.GIGA}
      />
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<InlineNotification />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
