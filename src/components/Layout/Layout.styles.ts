import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Mixin } from 'ustudio-ui/theme';

const Layout = styled.div`
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--i-regular) var(--i-large);
  box-shadow: var(--s-light);
`;

const LogoLink = styled(Link)`
  max-height: 3rem;
  display: flex;
  align-items: center;
  &:after {
    content: none;
  }
`;

const LogoImage = styled.img`
  width: 2rem;
  margin-right: var(--i-medium);
`;

const LogoText = styled.span`
  line-height: 1;
  font-size: 24px;
  font-weight: 700;
  color: var(--c-darkest);
  user-select: none;
`;

const Main = styled.main`
  flex-grow: 1;
`;

const Footer = styled.footer`
  padding: var(--i-small) 0;
  background-color: var(--c-light);
  ${Mixin.Font.bodySmall()};
  text-align: center;
`;

export default {
  Layout,
  Header,
  LogoLink,
  LogoImage,
  LogoText,
  Main,
  Footer,
};
