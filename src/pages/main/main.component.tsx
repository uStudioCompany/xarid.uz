import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useRequest } from 'honks';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import Spinner from 'ustudio-ui/components/Spinner';

import { Markdown } from '../../components/markdown';
import { CenteredContainer } from '../../components/centered-container';
import { FadeIn } from '../../components/fade-in';

import { name } from '../../../config.json';

import { getMarkdownDocument, Wrapper } from './main.module';

export const Main = () => {
  const { sendRequest, onSuccess, onFail, onPending } = useRequest(() => getMarkdownDocument());

  useEffect(function getSourceDataOnMount() {
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
