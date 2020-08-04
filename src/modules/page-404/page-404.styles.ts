import styled from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

import { Mixin } from 'ustudio-ui/theme';

import LogoIcon from '../../assets/icons/logo.inline.svg';

const Content = styled(Flex)`
  margin-top: 4rem;
`;

const ErrorStatus = styled(Text)`
  ${Mixin.Font.h1()};

  font-size: 6rem;
`;

const Logo = styled(LogoIcon)`
  height: 4rem;
  width: 4rem;

  margin: var(--i-medium) var(--i-medium) 0;
`;

export default { Content, ErrorStatus, Logo };
