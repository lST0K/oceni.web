import { Button } from "@mui/material";
import { authActions } from "_store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getConfiguration } from "utils";

export { User };

function User() {
    const language = getConfiguration()
    const navigate = useNavigate();

    const authUser = useSelector(x => x.auth.user);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());

    return (

       <>
        {!authUser && <Button variant="outlined" color="primary" onClick={() => navigate("/signin")}>{language.signIn}</Button>}
        {authUser && <Button variant="outlined" color="primary" onClick={logout}>{language.signOut}</Button>}
       </> 
    );
}