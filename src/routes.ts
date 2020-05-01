import { RouteProps } from 'react-router-dom';

import { DocsPage } from './pages/docs';
import { Main } from './pages/main';

import config from '../config.json';

export const routes: RouteProps[] = [
  {
    path: '/',
    component: Main
  },
  {
    path: `/${encodeURI(config.repo.docsFolder)}/:path*/:docName`,
    component: DocsPage
  }
  ].map((route) => ({
  ...route,
  exact: true,
}));
