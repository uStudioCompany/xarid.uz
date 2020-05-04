import React, { Suspense } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import { ThemeProvider } from 'ustudio-ui/theme';

import { Layout } from './components/layout';
import { FadeIn } from './components/fade-in';
import { routes } from './routes';

import { palette } from '../config.json';

const App = () => {
  return (
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
  );
};

export default App;
