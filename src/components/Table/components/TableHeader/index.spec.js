import React from 'react';

import TableHeader from '.';
import { ASCENDING, DESCENDING } from '../../constants';

const children = 'Foo';

describe('TableHeader', () => {
  describe('Style tests', () => {
    it('should render with default styles', () => {
      const actual = create(<TableHeader>{children}</TableHeader>);
      expect(actual).toMatchSnapshot();
    });

    it('should render with row styles', () => {
      const actual = create(
        <TableHeader scope={TableHeader.ROW}>{children}</TableHeader>
      );
      expect(actual).toMatchSnapshot();
    });

    it('should render with sortable styles', () => {
      const actual = create(<TableHeader sortable>{children}</TableHeader>);
      expect(actual).toMatchSnapshot();
    });

    it('should render with hovered styles', () => {
      const actual = create(<TableHeader isHovered>{children}</TableHeader>);
      expect(actual).toMatchSnapshot();
    });

    describe('sortable + sorted', () => {
      it('should render with sortable + sorted ascending styles', () => {
        const actual = create(
          <TableHeader sortable isSorted sortDirection={ASCENDING}>
            {children}
          </TableHeader>
        );
        expect(actual).toMatchSnapshot();
      });

      it('should render with sortable + sorted descending styles', () => {
        const actual = create(
          <TableHeader sortable isSorted sortDirection={DESCENDING}>
            {children}
          </TableHeader>
        );
        expect(actual).toMatchSnapshot();
      });
    });
  });

  describe('Accessibility tests', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(
        <TableHeader sortable>{children}</TableHeader>
      );
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
