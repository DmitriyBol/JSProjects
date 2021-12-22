import React, {Fragment} from "react";
import {Routes, Route} from 'react-router-dom'
import LinksPage from "./pages/LinksPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import AuthPage from "./pages/AuthPage";

const useRoutes = (isAuth) => {
    if (isAuth) {
        return (
            <Routes>
                <Fragment>
                    <Route path='/links' exact element={<LinksPage/>} />
                    <Route path='/create' exact element={<CreatePage/>} />
                    <Route path='/detail/:id' exact element={<DetailPage/>} />
                </Fragment>
            </Routes>
        )
    } else {
        return (
            <Routes>
                <Route path='/' exact element={<AuthPage/>} />
            </Routes>
        )
    }
}

export default useRoutes;