// Add group and story names to the sort order to explicitly order them.
// Items that are not included in the list are shown below the sorted items.
const SORT_ORDER = {
  Introduction: ['Welcome'],
  Styles: [],
  Icons: [],
  Typography: [],
  Forms: [],
  Layout: [],
  Grid: [],
  Components: []
};

const GROUPS = Object.keys(SORT_ORDER);

function getElements(kind) {
  const [group, story] = kind.split('|');
  const [component, ...rest] = story.split('/');
  return [group, component, ...rest];
}

function position(item, array = []) {
  const index = array.indexOf(item);
  // Show unsorted items at the bottom.
  return index === -1 ? 10000 : index;
}

export default function storySort(a, b) {
  const aKind = a[1].kind;
  const bKind = b[1].kind;
  const [aGroup, aComponent] = getElements(aKind);
  const [bGroup, bComponent] = getElements(bKind);

  // Preserve story sort order.
  if (aKind === bKind) {
    return 0;
  }

  // Sort stories in a group.
  if (aGroup === bGroup) {
    const group = SORT_ORDER[aGroup];

    return position(aComponent, group) - position(bComponent, group);
  }

  // Sort groups.
  return position(aGroup, GROUPS) - position(bGroup, GROUPS);
}
