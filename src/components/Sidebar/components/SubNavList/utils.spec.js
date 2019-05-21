import getSelectedChildIndex from './utils';

describe('getSelectedChildIndex', () => {
  it('should return the correct index of the selected child on an array', () => {
    const children = [
      { props: { selected: false } },
      { props: { selected: true } },
      { props: { selected: false } }
    ];
    const selectedChild = getSelectedChildIndex(children);

    expect(selectedChild).toEqual(1);
  });

  it('should return 0 for a single child', () => {
    const children = { props: { selected: true } };
    const selectedChild = getSelectedChildIndex(children);

    expect(selectedChild).toEqual(0);
  });

  it('should return the first selected index for multiple selected children', () => {
    const children = [
      { props: { selected: true } },
      { props: { selected: false } },
      { props: { selected: true } }
    ];
    const selectedChild = getSelectedChildIndex(children);

    expect(selectedChild).toEqual(0);
  });
});
