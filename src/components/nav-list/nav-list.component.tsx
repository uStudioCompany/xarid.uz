import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import Flex from 'ustudio-ui/components/Flex';
import Placeholder from 'ustudio-ui/components/Placeholder';
import Text from 'ustudio-ui/components/Text';

import { NavItem } from '../nav-item';

import { DrawerState } from '../layout';

import { getRandomPlaceholderWidth } from './nav-list.module';
import Styled from './nav-list.styles';
import { sortDocsByName } from '../../utils';

import type { Node } from '../../types';

export const NavList = ({ tree, prevPath, isLoading }: { tree: Node[]; prevPath: string; isLoading: boolean }) => {
  const setDrawerState = useContext(DrawerState);

  if (isLoading) {
    return (
      <Flex margin={{ top: 'medium' }}>
        <Placeholder variant="text" appearance={{ width: `${getRandomPlaceholderWidth()}%`, height: 'body' }} />
      </Flex>
    );
  }

  const normalizedList = tree
    ?.filter(({ type, name }) => type === 'tree' || (type === 'blob' && /.md$/.test(name)))
    ?.sort(sortDocsByName);

  return (
    <Styled.NavList>
      {normalizedList.length ? (
        normalizedList.map((node) => {
          const parsedDocName = node.name.replace('.md', '');

          return node.type === 'tree' ? (
            <NavItem key={node.name} node={node} prevPath={prevPath} />
          ) : (
            <Flex key={node.name} margin={{ top: 'medium' }}>
              <NavLink to={`/${prevPath}/${parsedDocName}`} onClick={setDrawerState} activeClassName="current-page">
                {parsedDocName}
              </NavLink>
            </Flex>
          );
        })
      ) : (
        <Text variant="small" color="#333">
          No resources
        </Text>
      )}
    </Styled.NavList>
  );
};
