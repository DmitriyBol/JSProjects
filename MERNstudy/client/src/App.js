import React, {createContext} from "react";
import {BrowserRouter} from 'react-router-dom'
import useRoutes from './routes'
import '../src/styles/styles.css'
import useAuth from "./hooks/auth.hook";

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: () => {},
    logout: () => {},
    isAuth: false,
})

const App = () => {
    const {token, login, logout, userId} = useAuth();
    const isAuth = !!token;
    const routes = useRoutes(isAuth);

    return (
        <AuthContext.Provider value={{token, login, logout, userId, isAuth}}>
            <BrowserRouter>
                <div>
                    {routes}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
