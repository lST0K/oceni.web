
import { Avatar, Box, Divider, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Social from './Social';
import { getConfiguration } from 'utils';
import BasicSignUp from './BasicSignUp';

export  function SignUp() {
  const language = getConfiguration()
  
    return (
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: 500
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {language.signUp}
            </Typography>
            
              <BasicSignUp/>
              <Divider sx={{mt:4}}>
                <Typography component="h3" variant="h6">{language.or}</Typography>
              </Divider>        
              <Social />  
          </Box>    
        </Box> 
    )
}
