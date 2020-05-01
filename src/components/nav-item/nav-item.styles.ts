import styled from 'styled-components';

import FolderIcon from '../../assets/icons/folder.inline.svg';

const NavItem = styled.div`
  padding: 0;
`;

const Folder = styled(FolderIcon)`
  color: var(--c-dark);

  height: 0.75rem;
  width: 0.75rem;

  margin-right: var(--i-medium);
  margin-top: 1px;
`;

export default { NavItem, Folder };
