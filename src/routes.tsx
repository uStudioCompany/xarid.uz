import { RouteProps } from 'react-router-dom';

import { DocsPage } from './pages/docs';
import { Main } from './pages/main';
import { Page404 } from './pages/page-404';

import { repo } from '../config.json';

export const routes: RouteProps[] = [
  {
    path: '/',
    component: Main
  },
  {
    path: `/${encodeURI(repo.docsFolder)}/:path*/:docName`,
    component: DocsPage
  },
  {
    path: '*',
    component: Page404,
  },
  ].map((route) => ({
  ...route,
  exact: true,
}));
