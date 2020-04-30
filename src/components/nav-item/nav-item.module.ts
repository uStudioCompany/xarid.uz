import axios from 'axios';

import { getEntriesConfig } from '../../lib';
import type { Node } from '../../types';

export const getEntries = async (path: string): Promise<Node[]> => {
  const { data } = await axios(getEntriesConfig(path));

  return data;
};
