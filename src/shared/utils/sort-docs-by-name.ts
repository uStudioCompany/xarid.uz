import type { Node } from '../entity';

export const sortDocsByName = (entryA: Node, entryB: Node) => {
  return entryA.name
    .toLowerCase()
    .localeCompare(entryB.name.toLowerCase(), undefined, { numeric: true, sensitivity: 'base' });
};
