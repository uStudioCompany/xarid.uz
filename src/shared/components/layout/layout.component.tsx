import React, { FC, useState, useEffect } from 'react';

import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';

import useMediaQuery from 'ustudio-ui/hooks/use-media-query';
import Flex from 'ustudio-ui/components/Flex';

import type { Node } from '../../entity';
import { sortDocsByName } from '../../utils';
import { useAppConfig } from '../../services/app-config';
import { useRequestConfig } from '../../services/request-config';

import { Aside } from './aside';
import DrawerCloser from './drawer-closer';

import Styled from './layout.styles';

export const Layout: FC = ({ children }) => {
  const [firstDocName, setFirstDocName] = useState('');
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const { pathname } = useLocation();

  const { name, repo } = useAppConfig();
  const { getEntriesConfig } = useRequestConfig();

  const isDocPage = pathname.includes(repo.docsFolder);

  const isMd = useMediaQuery('screen and (min-width: 768px)');

  useEffect(() => {
    (async (): Promise<void> => {
      const { data: entries } = await axios(getEntriesConfig(`${repo.docsFolder}`));

      setFirstDocName(
        (entries as Node[])
          .filter((entry) => entry.type === 'blob')
          .sort(sortDocsByName)[0]
          .name.replace('.md', '')
      );
    })();
  }, []);

  return (
    <>
      <Helmet titleTemplate={`${name} | %s`} defaultTitle={name} />

      <DrawerCloser close={() => setDrawerOpen(false)}>
        <Styled.Layout>
          <Styled.Header>
            <Styled.LogoLink to="/">
              <Styled.Logo />

              <Styled.LogoText>{name}</Styled.LogoText>
            </Styled.LogoLink>

            <Styled.Nav>
              {firstDocName && <Link to={`/${repo.docsFolder}/${firstDocName}`}>Docs</Link>}

              <a href={`https://github.com/${repo.owner}/${repo.name}`} target="_blank" rel="noopener noreferrer">
                Github
              </a>
            </Styled.Nav>

            {!isMd && isDocPage && (
              <Styled.DrawerButton isDrawerOpen={isDrawerOpen} onClick={() => setDrawerOpen(!isDrawerOpen)} />
            )}
          </Styled.Header>

          <Styled.Main isDocPage={isDocPage}>
            {isDocPage && <Aside isMd={isMd} setDrawerOpen={setDrawerOpen} isDrawerOpen={isDrawerOpen} />}

            <Flex padding={{ left: 'large', right: 'large' }}>{children}</Flex>
          </Styled.Main>

          <Styled.Footer>
            © 2020{' '}
            <a href="https://ustudio.company" target="_blank" rel="noreferrer noopener">
              uStudio LLC
            </a>{' '}
            ❤️
          </Styled.Footer>
        </Styled.Layout>
      </DrawerCloser>
    </>
  );
};
