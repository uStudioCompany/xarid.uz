import React from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';

import Grid from 'ustudio-ui/components/Grid/Grid';
import Cell from 'ustudio-ui/components/Grid/Cell';
import Button from 'ustudio-ui/components/Button';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

import Styled from './page-404.styles';

export const Page404 = () => {
  const { goBack, replace } = useHistory();

  return (
    <>
      <Helmet>
        <title>404</title>
      </Helmet>

      <Grid isContainer>
        <Cell>
          <Styled.Content direction="column">
            <Flex alignment={{ horizontal: 'center', vertical: 'center' }}>
              <Styled.ErrorStatus>4</Styled.ErrorStatus>

              <Styled.Logo />

              <Styled.ErrorStatus>4</Styled.ErrorStatus>
            </Flex>

            <Flex alignment={{ horizontal: 'center', vertical: 'center' }}>
              <Text color="var(--c-dark)" align="center" variant="h1">
                Someone has stolen this page ... :(
              </Text>
            </Flex>

            <Flex margin={{ top: 'large' }} alignment={{ horizontal: 'space-around', vertical: 'center' }}>
              <Button appearance="text" onClick={() => goBack()}>
                Back
              </Button>

              <Button appearance="text" onClick={() => replace('/')}>
                Home
              </Button>
            </Flex>
          </Styled.Content>
        </Cell>
      </Grid>
    </>
  );
};
