import styled from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';
import LibDrawer from 'ustudio-ui/components/Drawer';

const Aside = styled(Flex)`
  position: fixed;
  top: 64px;
  left: 0;

  width: 320px;
  min-height: 100%;

  padding: var(--i-regular) var(--i-large);

  border-right: 1px solid var(--c-light);
  border-radius: 0;

  overflow-y: scroll;
  z-index: var(--l-bottom);
`;

const Drawer = styled(LibDrawer)`
  width: 320px;

  flex-direction: column;

  padding: var(--i-large);
`;

export default { Aside, Drawer };
