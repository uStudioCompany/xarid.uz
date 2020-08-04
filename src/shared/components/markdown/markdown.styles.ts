import styled, { css } from 'styled-components';

import Tag from 'ustudio-ui/components/Tag';
import { Mixin } from 'ustudio-ui/theme';

const Root = styled.article`
  width: 100%;

  margin-bottom: var(--i-large);
  scroll-snap-type: y mandatory;

  overflow-x: hidden;
  overflow-y: auto;
`;

const Divider = styled.hr`
  height: 1px;
  background-color: var(--c-light);
`;

const Heading = styled.h1`
  margin: var(--i-large) 0 0;
  scroll-margin: calc(54px + 2rem) 0 0;
`;

const Paragraph = styled.div`
  margin: var(--i-medium) 0;

  ${Mixin.Font.articleRegular()};

  line-height: 1.7;
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
