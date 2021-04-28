import React from 'react';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import { useAppConfig } from '../../../services/app-config';

import { NavItem } from './nav-item';

import Styled from './aside.styles';
import Layout from '../layout.styles';

export const Aside = ({
  setDrawerOpen,
  isDrawerOpen,
  isMd,
}: {
  setDrawerOpen: (isOpen: boolean) => void;
  isDrawerOpen: boolean;
  isMd?: boolean;
}) => {
  const { repo } = useAppConfig();

  if (!isMd) {
    return (
      <Styled.Drawer isOpen={isDrawerOpen} onChange={() => setDrawerOpen(false)} showOverlay>
        <Flex margin={{ bottom: 'regular' }} alignment={{ vertical: 'center', horizontal: 'space-between' }}>
          <Text variant="h3">Resources</Text>

          <Layout.DrawerButton isDrawerOpen={isDrawerOpen} onClick={() => setDrawerOpen(false)} color="darkest" />
        </Flex>

        <NavItem node={{ name: repo.docsFolder, type: 'tree' }} isRoot />
      </Styled.Drawer>
    );
  }

  return (
    <Styled.Aside direction="column">
      <Flex margin={{ bottom: 'regular' }}>
        <Text variant="h3">Resources</Text>
      </Flex>

      <NavItem node={{ name: repo.docsFolder, type: 'tree' }} isRoot />
    </Styled.Aside>
  );
};
