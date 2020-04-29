import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import { ThemeProvider } from 'ustudio-ui/theme';

import { palette } from './config.json';
import { Layout } from './components/layout';
import { routes } from './routes';

const App = () => {
  return (
    <ThemeProvider override={{ palette }}>
      <HashRouter>
        <Layout>
          <Switch>
            {routes.map((route) => (
              <Route {...route} key={route.path as string} />
            ))}
          </Switch>
        </Layout>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
