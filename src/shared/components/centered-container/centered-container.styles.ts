import styled from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';

const CenteredContainer = styled(Flex)`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default { CenteredContainer };
