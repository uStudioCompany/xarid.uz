import styled, { css } from 'styled-components';
import { Tag } from 'ustudio-ui';
import { Mixin } from 'ustudio-ui/theme';
import Text from 'ustudio-ui/components/Text';

const Root = styled.article`
  margin: var(--i-large) 0;
  scroll-snap-type: y mandatory;
`;

const Divider = styled.hr`
  height: 1px;
  background-color: var(--c-light);
`;

const Heading = styled.h1`
  margin: var(--i-large) 0 0;
  scroll-margin: calc(54px + 2rem) 0 0;
`;

const Paragraph = styled(Text).attrs(() => ({ variant: 'article' }))`
  margin: var(--i-medium) 0;
`;

const Quote = styled.blockquote`
  border-left: 2px solid var(--c-primary);
  padding-left: var(--i-regular);
  margin: var(--i-regular) 0;
  color: var(--c-dark);

  ${Paragraph} {
    margin: 0;
  }
`;

const InlineCode = styled(Tag)`
  padding: 2px var(--i-small);
  background: var(--c-light);
  font-size: inherit;
`;

const List = styled.ul(
  ({ depth, ordered }: { depth: number; ordered: boolean }) => css`
    display: grid;
    grid-auto-rows: auto;
    grid-gap: var(--i-medium);

    margin: var(--i-small) 0;
    padding-left: ${depth ? 'var(--i-large)' : 0};

    list-style-position: inside;
    list-style-type: ${ordered ? 'decimal' : 'circle'};
  `
);

const Link = styled.a`
  ${Mixin.Font.bodyRegular};

  font-family: inherit;
  font-size: inherit;
`;

export default { Root, Divider, Heading, Paragraph, Quote, InlineCode, List, Link };
