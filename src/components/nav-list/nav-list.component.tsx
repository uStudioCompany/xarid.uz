import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';

import { NavItem } from '../nav-item';

import { DrawerState } from '../layout';

import type { Node } from '../../types';

export const NavList = ({ tree, prevPath, isLoading }: { tree: Node[]; prevPath: string; isLoading: boolean }) => {
  const setDrawerState = useContext(DrawerState);

  if (isLoading) {
    return (
      <Flex alignment={{ horizontal: 'center' }}>
        <Spinner delay={500} appearance={{ size: 32 }} />
      </Flex>
    );
  }

  return (
    <>
      {tree?.map((node) => {
        const parsedDocName = node.name.replace('.md', '');

        return node.type === 'tree' ? (
          <NavItem key={node.name} node={node} prevPath={prevPath} />
        ) : (
          <Link
            to={`/${prevPath}/${parsedDocName}`}
            key={node.name}
            onClick={setDrawerState}
          >
            {parsedDocName}
          </Link>
        );
      })}
    </>
  );
};
