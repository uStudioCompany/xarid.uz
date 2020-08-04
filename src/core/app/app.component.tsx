import React, { FC, Suspense } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import { ThemeProvider } from 'ustudio-ui/theme';

import { Layout } from '../../shared/components/layout';
import { FadeIn } from '../../shared/components/fade-in';
import { useAppConfig } from '../../shared/services/app-config';

import RequestConfig from '../../shared/services/request-config';

import { routes } from '../routes.module';

export const App: FC = () => {
  const { palette } = useAppConfig();

  return (
    <RequestConfig serviceUrl="https://udoc.eprocurement.systems">
      <ThemeProvider override={{ palette }}>
        <HashRouter>
          <FadeIn>
            <Layout>
              <Suspense fallback={<div />}>
                <Switch>
                  {routes.map((route) => (
                    <Route {...route} key={route.path as string} />
                  ))}
                </Switch>
              </Suspense>
            </Layout>
          </FadeIn>
        </HashRouter>
      </ThemeProvider>
    </RequestConfig>
  );
};
