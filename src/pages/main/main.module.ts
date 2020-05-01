import axios from 'axios';

import { getMainMarkdownConfig } from '../../lib';

export const getMarkdownDocument = async (): Promise<string> => {
  const {
    data: { content: source },
  } = await axios(getMainMarkdownConfig());

  return source;
};
