import React from 'react';
import { HashRouter } from 'react-router-dom';

import { ThemeProvider } from 'ustudio-ui/theme';

import { palette } from './assets/theme.json';
import { Layout } from './components/Layout';

const App = () => {
  return (
    <ThemeProvider override={{ palette }}>
      <HashRouter>
        <Layout>
          <h1>Hello world</h1>
        </Layout>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
