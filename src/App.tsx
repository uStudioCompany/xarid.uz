import React from 'react';

import { ThemeProvider } from 'ustudio-ui/theme';
import { palette } from './assets/theme.json';

const App = () => {
  return (
    <ThemeProvider override={{ palette }}>
      <h1>Hello world</h1>
    </ThemeProvider>
  );
};

export default App;
