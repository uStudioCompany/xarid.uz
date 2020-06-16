import axios from 'axios';

import { getJsonSchemaDocumentConfig } from '../../lib';
import { parseDocPath } from '../../utils';

export const getJsonSchemaDocument = async (href: string): Promise<string> => {
  const {
    data: { content },
  } = await axios(getJsonSchemaDocumentConfig(parseDocPath(href, 'schema.json')));

  return content;
};
