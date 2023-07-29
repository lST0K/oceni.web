import * as React from 'react';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import classes from './App.module.css'
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeToogler, ColorModeContext} from './Components/UI/ThemeToogler';



function App() {

  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <div className={classes.App}>
          <CssBaseline />
          <ThemeToogler/>     
          <div>Hajde da ocenimo nesto!</div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
