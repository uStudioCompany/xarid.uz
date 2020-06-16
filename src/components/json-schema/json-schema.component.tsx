import React, { useEffect } from 'react';

import { JsonSchemaParser } from 'u-json-docs';

import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';
import Text from 'ustudio-ui/components/Text';

import { useRequest } from 'honks';

import { parseDocPath } from '../../utils';
import { FadeIn } from '../fade-in';

import { getJsonSchemaDocument } from './json-schema.module';
import type { SchemaProps } from './json-schema.types';

export const JsonSchema: React.FC<SchemaProps> = ({ href }) => {
  const { sendRequest, onSuccess, onFail, onPending } = useRequest<string>(() => getJsonSchemaDocument(href));

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
