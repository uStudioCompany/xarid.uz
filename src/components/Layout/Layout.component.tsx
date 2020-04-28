import React, { FC } from 'react';

import logo from '../../assets/images/logo.png';

import Styled from './Layout.styles';

export const Layout: FC = ({ children }) => {
  return (
    <>
      <Styled.Layout>
        <Styled.Header>
          <Styled.LogoLink to="/">
            <Styled.LogoImage src={logo} alt="uDocumentation Logo" />
            <Styled.LogoText>uDocumentation</Styled.LogoText>
          </Styled.LogoLink>
        </Styled.Header>

        <Styled.Main>{children}</Styled.Main>

        <Styled.Footer>
          © 2020{' '}
          <a href="https://ustudio.company" target="_blank" rel="noreferrer noopener">
            uStudio LLC
          </a>{' '}
          ❤️
        </Styled.Footer>
      </Styled.Layout>
    </>
  );
};
