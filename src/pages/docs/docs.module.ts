import axios from 'axios';

import { getMarkdownFileConfig } from '../../lib';

export const kebabToHumanCase = (string: string): string => {
  const noDashString = string.replace(/-/, ' ');

  return `${noDashString.slice(0, 1).toUpperCase()}${noDashString.slice(1)}`;
};

export const getMarkdownFile = async (fileName: string): Promise<string> => {
  const {
    data: { content: source },
  } = await axios(getMarkdownFileConfig(fileName));

  return source;
};
