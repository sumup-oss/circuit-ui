interface RecursiveObject {
  [key: string]: RecursiveObject;
}

function get(obj: RecursiveObject, paths: string[]): RecursiveObject {
  const defaultValue = null;
  // @ts-expect-error
  return paths.reduce((acc, path) => {
    try {
      // @ts-expect-error
      acc =
        acc[path] !== undefined && acc[path] !== null
          ? acc[path]
          : defaultValue;
    } catch (e) {
      return defaultValue;
    }
    return acc;
  }, obj);
}

function getPosition(item: string, order: RecursiveObject) {
  const index = Object.keys(order).indexOf(item);
  // Show unsorted items at the bottom.
  return index === -1 ? 10000 : index;
}

function compareSections(
  aSections: string[],
  bSections: string[],
  sortOrder: RecursiveObject,
  depth = 0,
): number {
  // Sort inside of sections
  if (aSections[depth] === bSections[depth]) {
    return compareSections(aSections, bSections, sortOrder, depth + 1);
  }

  let order: RecursiveObject;

  if (depth > 0) {
    const pathToSection = aSections.slice(0, depth);
    order = get(sortOrder, pathToSection);
  } else {
    order = sortOrder;
  }

  return (
    getPosition(aSections[depth], order) - getPosition(bSections[depth], order)
  );
}

export function sortStories(sortOrder: RecursiveObject) {
  return (a: any, b: any) => {
    const aStoryName = a[1].kind;
    const bStoryName = b[1].kind;

    // Preserve story sort order.
    if (aStoryName === bStoryName) {
      return 0;
    }

    const aSections = splitStoryName(aStoryName);
    const bSections = splitStoryName(bStoryName);

    return compareSections(aSections, bSections, sortOrder);
  };
}

export function splitStoryName(storyName: string) {
  return storyName.split('/');
}

const LINK_PREFIXES = ['/', 'http', 'mailto', '#', 'tel'];

export function isStoryName(name: string) {
  return !LINK_PREFIXES.some((prefix) => name.startsWith(prefix));
}
