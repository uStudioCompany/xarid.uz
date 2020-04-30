import { RouteProps } from 'react-router-dom';
import { DocsPage } from './pages/docs';

import config from '../config.json';

export const routes: RouteProps[] = [{ path: `/${encodeURI(config.repo.docsFolder)}/:path*/:docName`, component: DocsPage }].map((route) => ({
  ...route,
  exact: true,
}));
