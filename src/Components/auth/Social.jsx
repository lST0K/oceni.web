import { useCallback, useState } from "react";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";
import {FacebookLoginButton,GoogleLoginButton} from 'react-social-login-buttons';
import { getConfiguration } from "utils";

const { Box, Grid } = require("@mui/material")


const Social = () => {
    const language = getConfiguration()
    

    const [provider, setProvider] = useState('');
    const [profile, setProfile] = useState('');
  
    const onLoginStart = useCallback(() => {
      alert('login start');
    }, []);
  
    const onLogoutSuccess = useCallback(() => {
      setProfile(null);
      setProvider('');
      alert('logout success');
    }, []);
  
    const onLogout = useCallback(() => {}, []);
  

    return (
        <Grid container sx={{mt:3}} justifyContent="center">
            <Grid item xs>
                    <LoginSocialFacebook
                        appId={process.env.REACT_APP_FB_APP_ID || ''}
                        fieldsProfile={
                            'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
                        }
                        onLoginStart={onLoginStart}
                        onLogoutSuccess={onLogoutSuccess}
                        redirect_uri={process.env.REACT_APP_URI + "/signin" || ""}
                        onResolve={({ provider, data }) => {
                            setProvider(provider);
                            setProfile(data);
                        }}
                        onReject={err => {
                            console.log(err);
                        }}
                        >
                <FacebookLoginButton text={language.facebook}/>
         
            </LoginSocialFacebook>
            </Grid>
            <Grid item xs>
                    <LoginSocialGoogle
                        client_id={process.env.REACT_APP_GG_APP_ID || ''}
                        onLoginStart={onLoginStart}
                        redirect_uri={process.env.REACT_APP_URI + "/signin" || ""}
                        scope="openid profile email"
                        discoveryDocs="claims_supported"
                        access_type="offline"
                        onResolve={({ provider, data }) => {
                            setProvider(provider);
                            setProfile(data);
                        }}
                        onReject={err => {
                            console.log(err);
                        }}
                    >
                    <GoogleLoginButton  text={language.google} />
                    </LoginSocialGoogle>
            </Grid>
           
        </Grid>
    
    )
}

export default Social