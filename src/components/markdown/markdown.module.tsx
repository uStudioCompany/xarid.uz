import React from 'react';
import { Renderers } from 'react-markdown';
/* import Code from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism'; */

import Styled from './markdown.styles';

export const renderers: Renderers = {
  inlineCode: Styled.InlineCode,
  // react-syntax-highlighter is broken with parcel for now
  /* code: ({ children, language }) => (
    <Code language={language} style={coy}>
      {children}
    </Code>
  ), */
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
  link: Styled.Link,
};
