import React, { useEffect } from 'react';

import axios from 'axios';
import { JsonSchemaParser } from 'u-json-docs';
import { useRequest } from 'honks';

import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';
import Text from 'ustudio-ui/components/Text';

import { useRequestConfig } from '../../../services/request-config';
import { parseDocPath } from '../../../utils';
import { FadeIn } from '../../fade-in';

import type { SchemaProps } from './json-schema.types';

export const JsonSchema: React.FC<SchemaProps> = ({ href }) => {
  const { getJsonSchemaDocumentConfig } = useRequestConfig();

  const { sendRequest, onSuccess, onFail, onPending } = useRequest<string>(
    async (): Promise<string> => {
      const {
        data: { content },
      } = await axios(getJsonSchemaDocumentConfig(parseDocPath(href, 'schema.json')));

      return content;
    }
  );

  useEffect(function getJsonSchemaDocumentOnMount() {
    sendRequest();
  }, []);

  return (
    <>
      {onSuccess((data) => {
        return (
          <FadeIn>
            <Flex direction="column" margin={{ top: 'regular' }}>
              <JsonSchemaParser schema={JSON.parse(data)} title={parseDocPath(href, 'schema.json').docName} />
            </Flex>
          </FadeIn>
        );
      })}

      {onPending(() => (
        <Spinner delay={1000} appearance={{ size: 16 }} />
      ))}

      {onFail(() => {
        return (
          <FadeIn>
            <Text color="var(--c-negative)">
              This JSON Schema was unable to load{' '}
              <span role="img" aria-label=":(">
                ☹️
              </span>
            </Text>
          </FadeIn>
        );
      })}
    </>
  );
};
