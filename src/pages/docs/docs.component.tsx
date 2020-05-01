import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';
import Text from 'ustudio-ui/components/Text';

import { encodePath } from '../../utils';

import { Markdown } from '../../components/markdown';
import { CenteredContainer } from '../../components/centered-container';
import { FadeIn } from '../../components/fade-in';

import { getMarkdownDocument } from './docs.module';

export const DocsPage: React.FC = () => {
  const { path, docName } = useParams();

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [source, setSource] = useState('');

  const getSource = useCallback(async (): Promise<void> => {
    setLoading(true);

    try {
      const markdownFile = await getMarkdownDocument({
        path: encodePath(path),
        docName,
      });

      setSource(markdownFile);
    } catch ({ message: errorMessage }) {
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [path, docName]);

  useEffect(
    function getSourceDataOnMount() {
      getSource();
    },
    [path, docName]
  );

  return (
    <>
      <Helmet>
        <title>{docName}</title>
      </Helmet>

      {isLoading && !error && (
        <FadeIn>
          <CenteredContainer>
            <Flex alignment={{ horizontal: 'center' }}>
              <Spinner delay={500} appearance={{ size: 48 }} />
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
            <Text color="var(--c-negative)" align="center">
              {`${error} ☹️`}
            </Text>
          </CenteredContainer>
        </FadeIn>
      )}
    </>
  );
};
