import React, { lazy } from 'react';
import { RouteProps } from 'react-router-dom';

const DocsPage = lazy(() => import('./pages/docs'));
const Main = lazy(() => import('./pages/main'));
const Page404 = lazy(() => import('./pages/page-404'));

import { repo } from '../config.json';

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
