import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import Flex from 'ustudio-ui/components/Flex';
import Placeholder from 'ustudio-ui/components/Placeholder';
import Text from 'ustudio-ui/components/Text';
import { useDrawerState } from '../../index';

import { NavItem } from '../nav-item';

import Styled from './nav-list.styles';
import { sortDocsByName } from '../../../../utils';

import type { Node } from '../../../../entity';

export const NavList = ({ tree, prevPath, isLoading }: { tree: Node[]; prevPath: string; isLoading?: boolean }) => {
  const { close } = useDrawerState();

  if (isLoading) {
    return (
      <Flex margin={{ top: 'medium' }}>
        <Placeholder
          variant="text"
          appearance={{ width: `${Math.round(Math.random() * (100 - 25 + 1) + 25)}%`, height: 'body' }}
        />
      </Flex>
    );
  }

  const normalizedList = useMemo(
    () =>
      tree?.filter(({ type, name }) => type === 'tree' || (type === 'blob' && /.md$/.test(name)))?.sort(sortDocsByName),
    [tree]
  );

  return (
    <Styled.NavList>
      {normalizedList.length ? (
        normalizedList.map((node) => {
          const parsedDocName = node.name.replace('.md', '');

          return node.type === 'tree' ? (
            <NavItem key={node.name} node={node} prevPath={prevPath} />
          ) : (
            <Flex key={node.name} margin={{ top: 'medium' }}>
              <NavLink to={`/${prevPath}/${parsedDocName}`} onClick={close} activeClassName="current-page">
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
