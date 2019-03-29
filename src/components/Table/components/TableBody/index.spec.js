import React from 'react';

import TableBody from '.';

const fixtureRows = [['Foo', 'Bar']];

describe('TableBody', () => {
  describe('Style tests', () => {
    it('should render with default styles', () => {
      const actual = create(<TableBody rows={fixtureRows} />);
      expect(actual).toMatchSnapshot();
    });

    it('should render with fixed Header styles', () => {
      const actual = create(<TableBody rowHeaders rows={fixtureRows} />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('rowHeaders', () => {
    describe('no rowHeaders', () => {
      it('should render a TableCell on the first cellIndex of each row', () => {
        const wrapper = shallow(<TableBody rows={fixtureRows} />);

        expect(
          wrapper
            .find('tr')
            .at(0)
            .find('td')
            .at(0).length
        ).toBeTruthy();
      });
    });

    it('should add fixed to first TableHeader', () => {
      const wrapper = shallow(<TableBody rowHeaders rows={fixtureRows} />);

      expect(
        wrapper
          .find('tr')
          .at(0)
          .find('TableHeader')
          .at(0)
          .props().fixed
      ).toBeTruthy();
    });

    describe('presentational TableCell', () => {
      it('should add it to the first header', () => {
        const wrapper = shallow(<TableBody rowHeaders rows={fixtureRows} />);

        expect(
          wrapper
            .find('tr')
            .at(0)
            .find('th')
            .at(0)
        ).toExist();
      });
    });
  });

  describe('sortHover', () => {
    describe('Cell index not relative to sortHover', () => {
      it('should not add isHovered to it', () => {
        const sortHover = 1;
        const wrapper = shallow(
          <TableBody sortHover={sortHover} rows={fixtureRows} />
        );

        expect(
          wrapper
            .find('tr')
            .at(0)
            .find('Styled(td)')
            .at(0)
            .props().isHovered
        ).toBeFalsy();
      });
    });
    describe('relative Cell index to sortHover', () => {
      it('should add isHovered to it', () => {
        const sortHover = 0;
        const wrapper = shallow(
          <TableBody sortHover={sortHover} rows={fixtureRows} />
        );

        expect(
          wrapper
            .find('tr')
            .at(0)
            .find('Styled(td)')
            .at(0)
            .props().isHovered
        ).toBeTruthy();
      });
    });
  });

  describe('Accessibility tests', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<TableBody rowHeader rows={fixtureRows} />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
