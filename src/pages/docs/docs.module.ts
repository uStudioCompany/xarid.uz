import axios from 'axios';

import { getMarkdownDocumentConfig } from '../../lib';

export const kebabToHumanCase = (string: string): string => {
  const noDashString = string.replace(/-/, ' ');

  return `${noDashString.slice(0, 1).toUpperCase()}${noDashString.slice(1)}`;
};

export const getMarkdownDocument = async ({ path, docName }: { path: string; docName: string }): Promise<string> => {
  const {
    data: { content: source },
  } = await axios(getMarkdownDocumentConfig({ path, docName }));

  return source;
};
