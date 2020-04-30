import React, { useEffect, useState } from 'react';
import { css } from 'styled-components';

import Text from 'ustudio-ui/components/Text';
import Dropdown from 'ustudio-ui/components/Dropdown';

import type { Node } from '../../types';

import { NavList } from '../nav-list';

import { getEntries } from './nav-item.module';
import Styled from './nav-item.styles';

export const NavItem = ({ node, prevPath, isRoot }: { node: Node; prevPath?: string; isRoot?: true }) => {
  const [navigationTree, setNavigationTree] = useState([] as Node[]);

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const path = `${prevPath ? `${prevPath}/` : ''}${node.name}`;

  const getFolder = async () => {
    if (!navigationTree.length) {
      setLoading(true);

      try {
        const entries = await getEntries(path);

        setNavigationTree(entries);
      } catch ({ message: errorMessage }) {
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(function getFolderOnMount() {
    if (isRoot) {
      getFolder();
    }
  }, []);

  if (error) {
    return (
      <Text color="var(--c-negative)" align="center">
        {`${error} ☹️`}
      </Text>
    );
  }

  return (
    <Styled.NavItem>
      {isRoot ? (
        <NavList tree={navigationTree} prevPath={path} isLoading={isLoading} />
      ) : (
        <Dropdown
          title={node.name}
          onChange={getFolder}
          styled={{
            // @ts-ignore Bug in uStudio UI types for styled prop
            DropdownContainer: css`
              border: none;
              box-shadow: none;
              &:hover {
                box-shadow: none;
              }
            `,
            Title: css`
              padding: 0;

              font-weight: 600;
            `,
            Content: css`
              padding: var(--i-medium) 0 var(--i-medium) var(--i-medium);
            `,
          }}
        >
          <NavList tree={navigationTree} prevPath={path} isLoading={isLoading} />
        </Dropdown>
      )}
    </Styled.NavItem>
  );
};
