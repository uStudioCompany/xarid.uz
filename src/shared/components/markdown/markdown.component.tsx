import React from 'react';
import ReactMarkdown from 'react-markdown';
import CsvParser from './csv-parser';

import { renderers } from './renderers.module';
import { MarkdownProps } from './markdown.props';

export const Markdown: React.FC<MarkdownProps> = ({ source }) => {
  return (
    <CsvParser
      patterns={{
        rangeQuery: /^\d+-\d+$/,
        numberQuery: /^\d+$/,
        queryStringPattern: /\?([rc])=\d+((,\d+)*(-\d+)?)*(&([rc])=\d+((,\d+)*(-\d+)?)*)?/,
      }}
    >
      <ReactMarkdown source={source} renderers={renderers as {}} escapeHtml={false} />
    </CsvParser>
  );
};
