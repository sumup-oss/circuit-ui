function get(obj, paths, defaultValue) {
  return paths.reduce((acc, path) => {
    try {
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

function getPosition(item, order = []) {
  const array = Array.isArray(order) ? order : Object.keys(order);
  const index = array.indexOf(item);
  // Show unsorted items at the bottom.
  return index === -1 ? 10000 : index;
}

function compareSections(aSections, bSections, sortOrder, depth = 0) {
  // Sort inside of sections
  if (aSections[depth] === bSections[depth]) {
    return compareSections(aSections, bSections, sortOrder, depth + 1);
  }

  let order;

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

export function sortStories(sortOrder) {
  const sections = Object.keys(sortOrder);

  return (a, b) => {
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

export function splitStoryName(storyName) {
  return storyName.split('/');
}

const LINK_PREFIXES = ['/', 'http', 'mailto', '#', 'tel'];

export function isStoryName(name) {
  return !LINK_PREFIXES.some((prefix) => name.startsWith(prefix));
}
