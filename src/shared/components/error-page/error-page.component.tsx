import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import Cell from 'ustudio-ui/components/Grid/Cell';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import Button from 'ustudio-ui/components/Button';
import Grid from 'ustudio-ui/components/Grid/Grid';

import Styled from './error-page.styles';

export const ErrorPage: FC = () => {
  const { goBack, push } = useHistory();

  return (
    <Grid isContainer>
      <Cell>
        <Styled.Content direction="column">
          <Flex alignment={{ horizontal: 'center', vertical: 'center' }}>
            <Text color="var(--c-dark)" align="center" variant="h1">
              Oops, something went wrong :(
            </Text>
          </Flex>

          <Flex margin={{ top: 'large' }} alignment={{ horizontal: 'space-around', vertical: 'center' }}>
            <Button appearance="text" onClick={() => goBack()}>
              Back
            </Button>

            <Button appearance="text" onClick={() => push('/')}>
              Home
            </Button>
          </Flex>
        </Styled.Content>
      </Cell>
    </Grid>
  );
};
