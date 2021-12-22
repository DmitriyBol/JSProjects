import React from "react";
import {BrowserRouter} from 'react-router-dom'
import useRoutes from './routes'

const App = () => {
    const routes = useRoutes(false);
    return (
        <BrowserRouter>
            <div>
                {routes}
            </div>
        </BrowserRouter>
    );
}

export default App;
