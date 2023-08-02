import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import classes from './App.module.css'
import CssBaseline from '@mui/material/CssBaseline';
import {ColorModeContext} from './Components/UI/ThemeToogler';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import MenuBar from './Components/Header/MenuBar';
import { useMediaQuery } from '@mui/material';
import { getThemeModeFromCookie, setThemeModeInCookie } from './Utils/ThemeUtils';




function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light' ;
  const [mode, setMode] = React.useState(getThemeModeFromCookie() ||  prefersDarkMode);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        const newThemeMode = mode === 'light' ? 'dark' : 'light';
        setMode(newThemeMode);
        setThemeModeInCookie(newThemeMode);
      },
    }),
    [mode],
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
          <React.StrictMode>
            <MenuBar />
              <Router>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                </Routes>
              </Router>
          </React.StrictMode> 
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
