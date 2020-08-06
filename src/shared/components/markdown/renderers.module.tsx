import React from 'react';
import { Renderers, MarkdownAbstractSyntaxTree } from 'react-markdown';

import { Code } from '../code';
import Styled from './markdown.styles';

import { CSV } from './csv';
import { JsonSchema } from './json-schema';
import { Json } from '../json';

export const renderers: Renderers = {
  thematicBreak: Styled.Divider,
  root: Styled.Root,
  heading: ({ children, level }) => {
    const getRecursiveChildren = (children: MarkdownAbstractSyntaxTree): string => {
      if (Array.isArray(children)) {
        return getRecursiveChildren(children[0]?.props?.children);
      }

      return children as unknown as string;
    };

    return (
      <Styled.Heading
        id={getRecursiveChildren(children)
          ?.split(' ')
          ?.reduce((id: string, word: string) => `${id ? `${id}-` : ''}${word}`, ``)
          ?.toLowerCase()}
        as={`h${level}` as 'h1'}
      >
        {children}
      </Styled.Heading>
    );
  },
  blockquote: Styled.Quote,
  paragraph: Styled.Paragraph,
  list: ({ depth, children, ordered }) => (
    <Styled.List depth={depth} ordered={ordered}>
      {children}
    </Styled.List>
  ),
  code: ({ value, language }: { value: string; language: string }) => <Code language={language} value={value} />,
  link: ({ href, children, title }: { href: string; children: string; title?: string }) => {
    if (/^.+\.csv/.test(href)) {
      return <CSV href={href} title={title} />;
    }

    if (/^.+\.schema.json/.test(href)) {
      return <JsonSchema href={href} />;
    }

    if (/^.+\.json/.test(href)) {
      return <Json href={href} />;
    }

    return <Styled.Link href={href}>{children}</Styled.Link>;
  },
};
