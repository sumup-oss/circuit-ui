import * as PaginationService from './PaginationService';

describe('PaginationService', () => {
  describe('Calculate total pages', () => {
    describe('when we have 50 item and 50 per page', () => {
      it('should return 1', () => {
        expect(PaginationService.calculatePages(50, 50)).toBe(1);
      });
    });

    describe('when we have 1 items and 50 per page', () => {
      it('should return 1', () => {
        expect(PaginationService.calculatePages(50, 50)).toBe(1);
      });
    });

    describe('when we have 51 item and 50 per page', () => {
      it('should return 1', () => {
        expect(PaginationService.calculatePages(51, 50)).toBe(2);
      });
    });

    describe('when we have 50 item and 10 per page', () => {
      it('should return 1', () => {
        expect(PaginationService.calculatePages(50, 10)).toBe(5);
      });
    });
  });

  describe('Previous values of Page', () => {
    describe('when page is 1', () => {
      it('should return an empty array', () => {
        const previous = PaginationService.arrayOfPreviousValues(1, 10);
        expect(previous).toEqual([]);
      });
    });

    describe('when page is 2', () => {
      it('should return an empty array', () => {
        const previous = PaginationService.arrayOfPreviousValues(2, 10);
        expect(previous).toEqual([]);
      });
    });

    describe('when page is greater than 2 and smaller than total pages', () => {
      it('should return an array with one value', () => {
        const previous = PaginationService.arrayOfPreviousValues(5, 10);
        expect(previous).toEqual([4]);
      });
    });

    describe('when page is 49 and total pages is 50', () => {
      it('should return an array with two values', () => {
        const previous = PaginationService.arrayOfPreviousValues(49, 50);
        expect(previous).toEqual([47, 48]);
      });
    });

    describe('when page is equals to total pages', () => {
      it('should return an array with three value', () => {
        const previous = PaginationService.arrayOfPreviousValues(50, 50);
        expect(previous).toEqual([47, 48, 49]);
      });
    });
  });

  describe('Include dots before previous values', () => {
    describe('when page is 1', () => {
      it('should return false', () => {
        const previousValues = [2];
        const shouldHaveDots = PaginationService.hasOmittedPreviousPages(
          previousValues
        );
        expect(shouldHaveDots).toBeFalsy();
      });
    });

    describe('when have dots and page is 1', () => {
      it('should return false', () => {
        const previousValues = [2];
        const shouldHaveDots = PaginationService.hasOmittedPreviousPages(
          previousValues
        );
        expect(shouldHaveDots).toBeFalsy();
      });
    });

    describe('when page is greater than 2 and smaller than total pages', () => {
      it('should return true', () => {
        const previousValues = [4];
        const shouldHaveDots = PaginationService.hasOmittedPreviousPages(
          previousValues
        );
        expect(shouldHaveDots).toBeTruthy();
      });
    });

    describe('when page is 49 and total pages is 50', () => {
      it('should return true', () => {
        const previousValues = [48, 47];
        const shouldHaveDots = PaginationService.hasOmittedPreviousPages(
          previousValues
        );
        expect(shouldHaveDots).toBeTruthy();
      });
    });

    describe('when page is equals to total pages', () => {
      it('should return true', () => {
        const previousValues = [47, 48, 49];
        const shouldHaveDots = PaginationService.hasOmittedPreviousPages(
          previousValues
        );
        expect(shouldHaveDots).toBeTruthy();
      });
    });
  });

  describe('Next values of Page', () => {
    describe('when page is 1', () => {
      it('should return an array with three values', () => {
        const nextValues = PaginationService.arrayOfNextValues(1, 10);
        expect(nextValues).toEqual([2, 3, 4]);
      });
    });

    describe('when page is 2', () => {
      it('should return an array with two values', () => {
        const nextValues = PaginationService.arrayOfNextValues(2, 10);
        expect(nextValues).toEqual([3, 4]);
      });
    });

    describe('when page is greater than 2 and smaller than total pages', () => {
      it('should return an array with one value', () => {
        const nextValues = PaginationService.arrayOfNextValues(5, 10);
        expect(nextValues).toEqual([6]);
      });
    });

    describe('when page is 49 and total pages is 50', () => {
      it('should return an empty array', () => {
        const nextValues = PaginationService.arrayOfNextValues(49, 50);
        expect(nextValues).toEqual([]);
      });
    });

    describe('when page is equals to total pages', () => {
      it('should return an empty array', () => {
        const nextValues = PaginationService.arrayOfNextValues(50, 50);
        expect(nextValues).toEqual([]);
      });
    });
  });

  describe('Include dots after next values', () => {
    describe('when page is 1', () => {
      it('should return false', () => {
        const nextValues = [];
        const shouldHaveDots = PaginationService.hasOmittedNextPages(
          nextValues,
          50
        );
        expect(shouldHaveDots).toBeFalsy();
      });
    });

    describe('when have dots after and page is 1', () => {
      it('should return false', () => {
        const nextValues = [2];
        const shouldHaveDots = PaginationService.hasOmittedNextPages(
          nextValues,
          50
        );
        expect(shouldHaveDots).toBeTruthy();
      });
    });

    describe('when page is greater than 2 and smaller than total pages', () => {
      it('should return true', () => {
        const nextValues = [7];
        const shouldHaveDots = PaginationService.hasOmittedNextPages(
          nextValues,
          10
        );
        expect(shouldHaveDots).toBeTruthy();
      });
    });

    describe('when page is equals to total pages', () => {
      it('should return true', () => {
        const nextValues = [47, 48, 49];
        const shouldHaveDots = PaginationService.hasOmittedNextPages(
          nextValues,
          50
        );
        expect(shouldHaveDots).toBeFalsy();
      });
    });

    describe('when page is equals to total pages and array is messy', () => {
      it('should return true', () => {
        const nextValues = [47, 48, 49];
        const shouldHaveDots = PaginationService.hasOmittedNextPages(
          nextValues,
          50
        );
        expect(shouldHaveDots).toBeFalsy();
      });
    });
  });
});
