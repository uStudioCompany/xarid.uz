import React from 'react';
import ReactMarkdown from 'react-markdown';

import { renderers } from './markdown.module';
import { MarkdownProps } from './markdown.types';

export const Markdown: React.FC<MarkdownProps> = ({ source }) => {
  return <ReactMarkdown source={source} renderers={renderers as {}} escapeHtml={false} />;
};
