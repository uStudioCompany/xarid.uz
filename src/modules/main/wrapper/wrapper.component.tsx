import React, { FC } from 'react';

import Cell from 'ustudio-ui/components/Grid/Cell';
import Grid from 'ustudio-ui/components/Grid/Grid';
import useMediaQuery from 'ustudio-ui/hooks/use-media-query';

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
