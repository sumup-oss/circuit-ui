import hasSelectedChild from './utils';

describe('hasSelectedChild', () => {
  it('should return true for an array with a selected child', () => {
    const children = [
      { props: { selected: false } },
      { props: { selected: true } },
      { props: { selected: false } }
    ];

    const hasSelected = hasSelectedChild(children);
    expect(hasSelected).toBe(true);
  });

  it('should return false for an array with no selected child', () => {
    const children = [
      { props: { selected: false } },
      { props: { selected: false } },
      { props: { selected: false } }
    ];

    const hasSelected = hasSelectedChild(children);
    expect(hasSelected).toBe(false);
  });

  it('should return false for an unselected single child', () => {
    const children = { props: { selected: false } };

    const hasSelected = hasSelectedChild(children);
    expect(hasSelected).toBe(false);
  });

  it('should return true for an selected single child', () => {
    const children = { props: { selected: true } };

    const hasSelected = hasSelectedChild(children);
    expect(hasSelected).toBe(true);
  });
});
