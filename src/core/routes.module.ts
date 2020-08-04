import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';

import { repo } from '../../config.json';

const DocsPage = lazy(() => import('../modules/docs'));
const Main = lazy(() => import('../modules/main'));
const Page404 = lazy(() => import('../modules/page-404'));

export const routes: RouteProps[] = [
  {
    path: '/',
    component: Main,
  },
  {
    path: `/${encodeURI(repo.docsFolder)}/:path*/:docName`,
    component: DocsPage,
  },
  {
    path: '*',
    component: Page404,
  },
].map((route) => ({
  ...route,
  exact: true,
}));
