import React, {useEffect, useRef} from "react";
import Layout from "./Layout";
import Header from "./Header/Header";
import {BrowserRouter} from "react-router-dom";
import Content from "./Content/Content";
import InfoButton from "./Content/InfoButton";

export function App() {
    return (
        <div className={'header_wrapper'}>
            <BrowserRouter>
                <Layout>
                    <Header />
                    <Content />
                    <InfoButton />
                </Layout>
            </BrowserRouter>
        </div>
    )
}