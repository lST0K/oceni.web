import { useState, useEffect, useCallback } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { history } from '_helpers';
import { authActions } from '_store';
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, Grid, TextField} from '@mui/material';
import Link from '@mui/material/Link';
import { getConfiguration } from 'utils';


const BasicSignIn = () => {
    const language = getConfiguration()

    const [formChanged, setFormChanged] = useState(false)
    const dispatch = useDispatch();
    const authUser = useSelector(x => x.auth.user);
    const authError = useSelector(x => x.auth.error);

    useEffect(() => {
        // redirect to home if already logged in
        //console.log(history.location)
        if (authUser) history.navigate(history.location);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authUser]);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required(language.usernameIsRequired),
        password: Yup.string().required(language.passwordIsRequired)
        
    });
    const formOptions = {mode: "onChange", reValidateMode: "onChange", resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit,  formState, trigger } = useForm(formOptions);
    const { errors, isSubmitting, isValid } = formState;

    function onSubmit({ username, password }) {
      setFormChanged(false)
        return dispatch(authActions.signin({ username, password, provider:"basic" }));
    }


    const onChange = () => {
      setFormChanged(true)
    }
    return (
        <>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1}} onChange={onChange}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label={(!!errors.username && errors.username.message) || language.username}
              name="username"
              autoComplete="username"
              autoFocus      
              error={!!errors.username}
              {...register('username')}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={(!!errors.password && errors.password.message) || language.password}
              type="password"
              id="password"
              error={!!errors.password}
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
              disabled={isSubmitting || !isValid} 
            >
              {isSubmitting && <CircularProgress size={25} sx={{mr:5, ml:-8}}/>} 
              {language.signIn}
            </Button>
            { authError && !formChanged &&
              <Box sx={{ color: 'error.main' }}>{authError.message} {errors.message}</Box>
            }
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                {language.forgotPassword}?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                {language.dontHaveAnAccount}? {language.signUp}
                </Link>
              </Grid>
            </Grid>       
          </Box>         
          </>     
    )
}

export default BasicSignIn