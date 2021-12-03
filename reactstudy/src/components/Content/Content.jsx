import React from "react";
import { Routes, Route } from "react-router-dom";
import Tech from "./Blogs/Tech";
import Home from "./Blogs/Home";
import Contacts from "./Blogs/Contacts";
import Faq from "./Blogs/Faq";

const Content = () => {
    return (
        <div className={'content_container'}>
            <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/tech'} element={<Tech />} />
                <Route path={'/faq'} element={<Faq />} />
                <Route path={'/contacts'} element={<Contacts />} />
            </Routes>
        </div>
    )
}

export default Content;