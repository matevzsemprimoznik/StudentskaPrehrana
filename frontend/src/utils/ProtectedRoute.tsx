import {FC, ReactElement} from "react";
import {auth} from "../config/firebase";
import Login from "../screens/Login/Login";
import * as React from "react";

interface ProtectedRouteProps {
    children: ReactElement
}

const ProtectedRoute:FC<ProtectedRouteProps> = ({children}) => {
    if(!auth.currentUser)
        return <Login/>
    return children
}

export default ProtectedRoute