import { Button } from "@mui/material";
import { authActions } from "_store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export { User };

function User() {

    const navigate = useNavigate();

    const authUser = useSelector(x => x.auth.user);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());

    return (

       <>
        {!authUser && <Button variant="outlined" color="primary" onClick={() => navigate("/signin")}>Prijavi me</Button>}
        {authUser && <Button variant="outlined" color="primary" onClick={logout}>Odjavi me</Button>}
       </> 
    );
}