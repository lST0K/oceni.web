import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { history } from '_helpers';
import { authActions } from '_store';
import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from '@mui/material/Link';
import { getConfiguration } from 'utils';

export { SingIn };

function SingIn() {

    const language = getConfiguration()

    const dispatch = useDispatch();
    const authUser = useSelector(x => x.auth.user);
    const authError = useSelector(x => x.auth.error);

    useEffect(() => {
        // redirect to home if already logged in
        if (authUser) history.navigate('/');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authUser]);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ username, password }) {
        return dispatch(authActions.login({ username, password }));
    }

    return (
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {language.signIn}
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={language.emailAddress}
              name="email"
              autoComplete="email"
              autoFocus
              {...register('username')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={language.password}
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password')} 
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={language.rememberMe}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitting} 
            >
              {isSubmitting && <span className="spinner-border spinner-border-sm mr-1">Submitting...</span>}
              {language.signIn}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                {language.forgotPassword}?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                {language.dontHaveAnAccount}? {language.signUp}
                </Link>
              </Grid>
            </Grid>
          </Box>
          {authError && 
            <Box className="alert alert-danger mt-3 mb-0">{authError.message}</Box>
          }
        </Box>
        
    )
}
