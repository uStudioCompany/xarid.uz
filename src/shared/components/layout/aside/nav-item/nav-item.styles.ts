import styled from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';

import FolderIcon from '../../../../../assets/icons/folder.inline.svg';

const NavList = styled(Flex)`
  margin-left: 20px;
`;

const Folder = styled(FolderIcon)`
  color: var(--c-dark);

  height: 0.75rem;
  width: 0.75rem;

  margin-right: var(--i-medium);
  margin-top: 1px;
`;

export default { NavList, Folder };
