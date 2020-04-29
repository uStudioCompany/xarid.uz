import React from 'react';
import { HashRouter } from 'react-router-dom';

import { ThemeProvider } from 'ustudio-ui/theme';

import { palette } from './config.json';
import { Layout } from './components/layout';

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
