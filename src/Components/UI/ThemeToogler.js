import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export  function ThemeToogler() {

    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
  
    return (
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'right',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1
      }}
    >
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
    );
  }