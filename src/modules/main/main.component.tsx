import React, { FC, useEffect } from 'react';

import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useRequest } from 'honks';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import Spinner from 'ustudio-ui/components/Spinner';

import { Markdown } from '../../shared/components/markdown';
import { CenteredContainer } from '../../shared/components/centered-container';
import { FadeIn } from '../../shared/components/fade-in';
import { useAppConfig } from '../../shared/services/app-config';

import { useRequestConfig } from '../../shared/services/request-config';
import { Wrapper } from './wrapper';

export const Main: FC = () => {
  const { name } = useAppConfig();
  const { getMainMarkdownConfig } = useRequestConfig();

  const { sendRequest, onSuccess, onFail, onPending } = useRequest(
    async (): Promise<string> => {
      const {
        data: { content: source },
      } = await axios(getMainMarkdownConfig());

      return source;
    }
  );

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <>
      <Helmet>
        <title>{name} documentation</title>
      </Helmet>

      <Wrapper>
        <FadeIn>
          {onPending(() => {
            return (
              <CenteredContainer>
                <Flex alignment={{ horizontal: 'center' }}>
                  <Spinner appearance={{ size: 48 }} />
                </Flex>
              </CenteredContainer>
            );
          })}

          {onSuccess((data) => {
            return <Markdown source={data} />;
          })}

          {onFail((error) => {
            return (
              <CenteredContainer>
                <Text variant="h5" color="var(--c-negative)" align="center">
                  {`${error.message} ☹️`}
                </Text>
              </CenteredContainer>
            );
          })}
        </FadeIn>
      </Wrapper>
    </>
  );
};
