import { Navigate, Outlet } from "react-router-dom";
import Auth from '../utils/auth';

const PrivateRoutes = () => {
    const loggedIn = Auth.loggedIn();
    console.log()

    return (
        loggedIn ? <Outlet/> : <Navigate to='/Login'/>
    )
}

export default PrivateRoutes