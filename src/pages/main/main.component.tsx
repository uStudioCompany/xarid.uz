import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import Spinner from 'ustudio-ui/components/Spinner';

import { Markdown } from '../../components/markdown';
import { CenteredContainer } from '../../components/centered-container';
import { FadeIn } from '../../components/fade-in';

import { name } from '../../../config.json';

import { getMarkdownDocument, Wrapper } from './main.module';

export const Main = () => {
  const [isLoading, setLoading] = useState(true);
  const [source, setSource] = useState('');
  const [error, setError] = useState<string | null>(null);

  const getMainContent = useCallback(async (): Promise<void> => {
    setLoading(true);

    try {
      const markdownFile = await getMarkdownDocument();

      setSource(markdownFile);
    } catch ({ message: errorMessage }) {
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(function getSourceDataOnMount() {
    getMainContent();
  }, []);

  return (
    <>
      <Helmet>
        <title>{name} documentation</title>
      </Helmet>

      <Wrapper>
        {isLoading && !error && (
          <FadeIn>
            <CenteredContainer>
              <Flex alignment={{ horizontal: 'center' }}>
                <Spinner appearance={{ size: 48 }} />
              </Flex>
            </CenteredContainer>
          </FadeIn>
        )}

        {!isLoading && !error && (
          <FadeIn>
            <Markdown source={source} />
          </FadeIn>
        )}

        {!isLoading && error && (
          <FadeIn>
            <CenteredContainer>
              <Text variant="h5" color="var(--c-negative)" align="center">
                {`${error} ☹️`}
              </Text>
            </CenteredContainer>
          </FadeIn>
        )}
      </Wrapper>
    </>
  );
};
