import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import classes from './App.module.css'
import CssBaseline from '@mui/material/CssBaseline';
// import {ColorModeContext} from './components/ui/ThemeToogler';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import {HomePage, ProfilePage} from './pages';
// import MenuBar from './components/header/MenuBar';
import { useMediaQuery } from '@mui/material';
import { getThemeModeFromCookie, setThemeModeInCookie } from './utils/ThemeUtils';
import { history } from '_helpers';
import { SingIn ,ColorModeContext, MenuBar, PrivateRoute} from 'components';




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

  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <div className={classes.App}>
          <CssBaseline />   
          <React.StrictMode>
            <MenuBar />
              <Routes>
                <Route 
                    path="/" 
                    element={
                      <PrivateRoute>
                        <HomePage />
                      </PrivateRoute>
                    } 
                />
                <Route path="/signin" element={<SingIn />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
          </React.StrictMode> 
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
