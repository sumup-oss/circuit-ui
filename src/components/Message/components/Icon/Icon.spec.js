import React from 'react';

import { MessageIcon } from '../..';

describe('MessageIcon', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<MessageIcon />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with error icon', () => {
    const actual = create(<MessageIcon type={MessageIcon.ERROR} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with warning icon', () => {
    const actual = create(<MessageIcon type={MessageIcon.WARNING} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with custom icon content', () => {
    const actual = create(
      <MessageIcon>
        <div>Custom content</div>
      </MessageIcon>
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<MessageIcon />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
