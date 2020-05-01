import React, { useCallback, useEffect, useState } from 'react';

import Cell from 'ustudio-ui/components/Grid/Cell';
import Grid from 'ustudio-ui/components/Grid/Grid';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import Spinner from 'ustudio-ui/components/Spinner';

import { Markdown } from '../../components/markdown';

import { getMarkdownDocument } from './main.module';

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
    <Grid isContainer>
      <Cell>
        {isLoading && !error && (
          <Flex alignment={{ horizontal: 'center' }}>
            <Spinner delay={500} appearance={{ size: 32 }} />
          </Flex>
        )}

        {!isLoading && !error && <Markdown source={source} />}

        {!isLoading && error && (
          <Text color="var(--c-negative)" align="center">
            {`${error} ☹️`}
          </Text>
        )}
      </Cell>
    </Grid>
  );
};
