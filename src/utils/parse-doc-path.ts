import { DocProps } from '../lib';
import { encodePath } from './encode-path';

export const parseDocPath = (href: string, extension: string): DocProps => {
  const path = new RegExp(`(?:/).+(?=.${extension})`);
  const matchedPath = href.match(path) as [string];
  const matchedPathArray = matchedPath[0].split('/');

  return {
    path: encodePath(matchedPathArray.slice(1, -1).join('/')),
    docName: matchedPathArray.slice(-1)[0],
  };
};
