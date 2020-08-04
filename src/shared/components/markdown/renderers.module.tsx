import React from 'react';
import { Renderers } from 'react-markdown';

import Styled from './markdown.styles';

import { CSV } from './csv';
import { JsonSchema } from './json-schema';

export const renderers: Renderers = {
  thematicBreak: Styled.Divider,
  root: Styled.Root,
  heading: ({ children, level }) => (
    <Styled.Heading
      as={`h${level}` as 'h1'}
      id={children[0]?.props?.children
        .split(' ')
        .reduce((id: string, word: string) => `${id ? `${id}-` : ''}${word}`, ``)
        .toLowerCase()}
    >
      {children}
    </Styled.Heading>
  ),
  blockquote: Styled.Quote,
  paragraph: Styled.Paragraph,
  list: ({ depth, children, ordered }) => (
    <Styled.List depth={depth} ordered={ordered}>
      {children}
    </Styled.List>
  ),
  link: ({ href, children, title }: { href: string; children: string; title?: string }) => {
    if (/^.+\.csv/.test(href)) {
      return <CSV href={href} title={title} />;
    }

    if (/^.+\.schema.json/.test(href)) {
      return <JsonSchema href={href} />;
    }

    return <Styled.Link href={href}>{children}</Styled.Link>;
  },
};
