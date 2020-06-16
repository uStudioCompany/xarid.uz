import React, { useEffect } from 'react';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import { useRequest } from 'honks';

import { FadeIn } from '../fade-in';
import { NavList } from '../nav-list';

import { getEntries } from './nav-item.module';
import Styled from './nav-item.styles';

import type { Node } from '../../types';

export const NavItem = ({ node, prevPath, isRoot }: { node: Node; prevPath?: string; isRoot?: true }) => {
  const path = `${prevPath ? `${prevPath}/` : ''}${node.name}`;

  const { sendRequest, onSuccess, onFail } = useRequest(() => getEntries(path));

  useEffect(function getFolderOnMount() {
    sendRequest();
  }, []);

  return (
    <FadeIn>
      {onSuccess((data) => {
        return (
          <div>
            {isRoot ? (
              <NavList tree={data} prevPath={path} />
            ) : (
              <Flex direction="column" margin={{ top: 'medium' }}>
                <Flex alignment={{ vertical: 'center' }}>
                  <Styled.Folder />

                  <Text>{node.name}</Text>
                </Flex>

                <Styled.NavList direction="column">
                  <NavList tree={data} prevPath={path} />
                </Styled.NavList>
              </Flex>
            )}
          </div>
        );
      })}

      {onFail((error) => {
        return (
          <Text color="var(--c-negative)" align="center">
            {`${error} ☹️`}
          </Text>
        );
      })}
    </FadeIn>
  );
};
