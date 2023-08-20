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


const BasicSignUp = () => {
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
        firstname: Yup.string().required(language.firstNameIsRequired),
        lastname: Yup.string().required(language.lastNameIsRequired),
        email: Yup.string().required(language.emailIsRequired).email(language.emailInvalid),
        username: Yup.string().required(language.usernameIsRequired),
        password: Yup.string()
          .min(6, language.passwordMinLength)
          .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, language.passwordRegex)
          .required(language.passwordIsRequired),

        confirmpassword: Yup.string()
          .oneOf([Yup.ref('password'), null], language.passwordsMustMatch)
          .required(language.confirmPasswordIsRequired)
        
    });
    const formOptions = { mode: "onChange", resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit,  formState } = useForm(formOptions);
    const { errors, isSubmitting, isValid } = formState;

    function onSubmit({ username, password, email, firstname, lastname }) {
      setFormChanged(false)
        return dispatch(authActions.signup({username, password, email, firstname, lastname, provider:"basic" }));
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
              id="firstname"
              label={(!!errors.firstname && errors.firstname.message) || language.firstName}
              name="firstname"
              autoComplete="firstname"
              autoFocus      
              error={!!errors.firstname}
              {...register('firstname')}
            />
             <TextField
              margin="normal"
              required
              fullWidth
              id="lastname"
              label={(!!errors.lastname && errors.lastname.message) || language.lastName}
              name="lastname"
              autoComplete="lastname"
              autoFocus      
              error={!!errors.lastname}
              {...register('lastname')}
            />
             <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={(!!errors.email && errors.email.message) || language.email}
              name="email"
              autoComplete="email"
              autoFocus      
              error={!!errors.email}
              {...register('email')}
            />
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmpassword"
              label={(!!errors.confirmpassword && errors.confirmpassword.message) || language.confirmpassword}
              type="password"
              id="confirmpassword"
              error={!!errors.confirmpassword}
              autoComplete="confirm-password"
              {...register('confirmpassword')} 
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
            { authError &&
              <Box sx={{ color: 'error.main' }}>{authError.message} {errors.message}</Box>
            }
            <Grid container sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'end'
                      }}>
              <Grid item xs >
                <Link href="/signin" variant="body2">
                {language.alreadyHaveAnAccount}? {language.signIn}
                </Link>
              </Grid>
            </Grid>       
          </Box>         
          </>     
    )
}

export default BasicSignUp