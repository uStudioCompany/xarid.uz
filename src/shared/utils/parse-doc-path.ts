import { encodePath } from './encode-path';
import type { Document } from '../entity';

export const parseDocPath = (href: string, extension: string): Document => {
  const path = new RegExp(`(?:/).+(?=.${extension})`);
  const matchedPath = href.match(path) as [string];
  const matchedPathArray = matchedPath[0].split('/');

  return {
    path: encodePath(matchedPathArray.slice(1, -1).join('/')),
    docName: matchedPathArray.slice(-1)[0],
  };
};
