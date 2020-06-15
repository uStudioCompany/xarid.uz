import axios from 'axios';
import type { JSONSchema7 } from 'json-schema';

import { getJsonSchemaDocumentConfig } from '../../lib';
import { parseDocPath } from '../../utils';

export const getJsonSchemaDocument = async (href: string): Promise<JSONSchema7> => {
  const {
    data: { content },
  } = await axios(getJsonSchemaDocumentConfig(parseDocPath(href, 'schema.json')));

  return JSON.parse(content);
};
