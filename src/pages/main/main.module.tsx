import React, { FC } from 'react';
import axios from 'axios';

import useMediaQuery from 'ustudio-ui/hooks/use-media-query';
import Grid from 'ustudio-ui/components/Grid/Grid';
import Cell from 'ustudio-ui/components/Grid/Cell';

import { getMainMarkdownConfig } from '../../lib';

export const getMarkdownDocument = async (): Promise<string> => {
  const {
    data: { content: source },
  } = await axios(getMainMarkdownConfig());

  return source;
};

export const Wrapper: FC = ({ children }) => {
  const isXs = useMediaQuery('(max-width: 576px)');

  return (
    <>
      {isXs ? (
        children
      ) : (
        <Grid isContainer>
          <Cell>{children}</Cell>
        </Grid>
      )}
    </>
  );
};
