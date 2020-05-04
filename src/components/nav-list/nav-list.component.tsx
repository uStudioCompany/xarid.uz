import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Flex from 'ustudio-ui/components/Flex';
import Placeholder from 'ustudio-ui/components/Placeholder';
import Text from 'ustudio-ui/components/Text';

import { NavItem } from '../nav-item';

import { DrawerState } from '../layout';

import type { Node } from '../../types';
import { getRandomPlaceholderWidth } from './nav-list.module';

export const NavList = ({ tree, prevPath, isLoading }: { tree: Node[]; prevPath: string; isLoading: boolean }) => {
  const setDrawerState = useContext(DrawerState);

  if (isLoading) {
    return (
      <Flex margin={{ top: 'small' }}>
        <Placeholder variant="text" appearance={{ width: `${getRandomPlaceholderWidth()}%`, height: 'body' }} />
      </Flex>
    );
  }

  const filteredList = tree?.filter(({ type, name }) => type === 'tree' || (type === 'blob' && /.md$/.test(name)));

  return (
    <>
      {filteredList.length ? (
        filteredList.map((node) => {
          const parsedDocName = node.name.replace('.md', '');

          return node.type === 'tree' ? (
            <NavItem key={node.name} node={node} prevPath={prevPath} />
          ) : (
            <Flex key={node.name} margin={{ top: 'small' }}>
              <Link to={`/${prevPath}/${parsedDocName}`} onClick={setDrawerState}>
                {parsedDocName}
              </Link>
            </Flex>
          );
        })
      ) : (
        <Text variant="small" color="#333">
          No resources
        </Text>
      )}
    </>
  );
};
