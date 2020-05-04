import React, { useCallback, useEffect, useState } from 'react';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

import { FadeIn } from '../fade-in';
import { NavList } from '../nav-list';

import { getEntries } from './nav-item.module';
import Styled from './nav-item.styles';

import type { Node } from '../../types';

export const NavItem = ({ node, prevPath, isRoot }: { node: Node; prevPath?: string; isRoot?: true }) => {
  const [folder, serFolder] = useState([] as Node[]);

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const path = `${prevPath ? `${prevPath}/` : ''}${node.name}`;

  const getFolder = useCallback(async (): Promise<void> => {
    if (!folder.length) {
      setLoading(true);

      try {
        const entries = await getEntries(path);

        serFolder(entries);
      } catch ({ message: errorMessage }) {
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  useEffect(function getFolderOnMount() {
    getFolder();
  }, []);

  if (error) {
    return (
      <FadeIn>
        <Text color="var(--c-negative)" align="center">
          {`${error} ☹️`}
        </Text>
      </FadeIn>
    );
  }

  return (
    <FadeIn>
      <div>
        {isRoot ? (
          <NavList tree={folder} prevPath={path} isLoading={isLoading} />
        ) : (
          <Flex direction="column" margin={{ top: 'medium' }}>
            <Flex alignment={{ vertical: 'center' }}>
              <Styled.Folder />

              <Text>{node.name}</Text>
            </Flex>

            <Styled.NavList direction="column">
              <NavList tree={folder} prevPath={path} isLoading={isLoading} />
            </Styled.NavList>
          </Flex>
        )}
      </div>
    </FadeIn>
  );
};
