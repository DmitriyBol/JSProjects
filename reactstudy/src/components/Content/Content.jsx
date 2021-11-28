import React from "react";
import { Routes, Route } from "react-router-dom";
import Tech from "./Blogs/Tech";

const Content = () => {
    return (
        <div className={'content_container'}>
            <Routes>
                <Route exact path={'/about'} element={<h1>HOME</h1>} />
                <Route exact path={'/tech'} element={<Tech />} />
                <Route exact path={'/faq'} element={<h1>FAQ</h1>} />
                <Route exact path={'/contacts'} element={<h1>CONTACTS</h1>} />
            </Routes>
        </div>
    )
}

export default Content;