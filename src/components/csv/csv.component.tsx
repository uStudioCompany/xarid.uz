import React, { useCallback, useEffect, useState } from 'react';

import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';
import Text from 'ustudio-ui/components/Text';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { CsvToHtmlTable } from 'react-csv-to-table';
import { FadeIn } from '../fade-in';

import { getCsvDocument, getQueryFromHref } from './csv.module';
import type { CSVProps } from './csv.types';

import './csv.module.scss';

export const CSV: React.FC<CSVProps> = ({ href, title }) => {
  const [isLoading, setLoading] = useState(false);
  const [source, setSouce] = useState<string>('');
  const [error, setError] = useState<null | string>(null);

  const [meta, setMeta] = useState<{ rows?: string; cols?: string } | null>(null);

  useEffect(() => {
    if (href) {
      const query = getQueryFromHref(href);

      const matchQuery = (param: 'c' | 'r'): [string] | null => {
        return query.match(new RegExp(`(?:${param}\\=).+(?=&)|(?:${param}\\=).+(?=$)`)) as [string] | null;
      };

      const formatQuery = (match: [string] | null): string | undefined => {
        if (!match) {
          return undefined;
        }

        // Replace by , didn't work out here
        return match[0].split(',').join(', ').slice(2);
      };

      if (query) {
        setMeta({
          rows: formatQuery(matchQuery('r')),
          cols: formatQuery(matchQuery('c')),
        });
      }
    }
  }, [href]);

  const getCsvSource = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);

      const csv = await getCsvDocument(href);

      setSouce(csv);
    } catch ({ message: errorMessage }) {
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(function getCsvDocumentOnMount() {
    getCsvSource();
  }, []);

  if (isLoading) {
    return <Spinner delay={1000} appearance={{ size: 16 }} />;
  }

  if (error) {
    return (
      <FadeIn>
        <Text color="var(--c-negative)">
          This table was unable to load{' '}
          <span role="img" aria-label=":(">
            ☹️
          </span>
        </Text>
      </FadeIn>
    );
  }

  return (
    <FadeIn>
      <Flex direction="column" margin={{ top: 'regular' }}>
        {title && <Text variant="h3">{title}</Text>}

        {meta && (
          <Flex margin={{ top: 'small' }}>
            {meta?.rows && (
              <Text variant="small" color="var(--c-dark)">
                {meta.rows} rows
              </Text>
            )}

            {meta?.cols && (
              <Text variant="small" color="var(--c-dark)">
                {', '}
                {meta.cols} cols
              </Text>
            )}
          </Flex>
        )}

        <div className="table-wrapper">
          <CsvToHtmlTable data={source} csvDelimiter=";" />
        </div>
      </Flex>
    </FadeIn>
  );
};
