import type { Node } from '../types';

export const sortDocsByName = (entryA: Node, entryB: Node) => {
  return entryA.name
    .toLowerCase()
    .localeCompare(entryB.name.toLowerCase(), undefined, { numeric: true, sensitivity: 'base' });
};
