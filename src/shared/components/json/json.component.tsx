import React, { useEffect } from 'react';

import axios from 'axios';
import { useRequest } from 'honks';

import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';
import Text from 'ustudio-ui/components/Text';

import { useRequestConfig } from '../../services/request-config';
import { parseDocPath } from '../../utils';
import { FadeIn } from '../fade-in';
import { Code } from '../code';

export const Json: React.FC<{ href: string }> = ({ href }) => {
  const { getJsonDocumentConfig } = useRequestConfig();

  const { sendRequest, onSuccess, onFail, onPending } = useRequest<string>(
    async (): Promise<string> => {
      const {
        data: { content },
      } = await axios(getJsonDocumentConfig(parseDocPath(href, 'json')));

      return content;
    }
  );

  useEffect(function getJsonDocumentOnMount() {
    sendRequest();
  }, []);

  return (
    <>
      {onSuccess((data) => {
        return (
          <FadeIn>
            <Flex direction="column" margin={{ top: 'regular' }}>
              <Code value={data} language="json" />
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
              This JSON was unable to load{' '}
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
