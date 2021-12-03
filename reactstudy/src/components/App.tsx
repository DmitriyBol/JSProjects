import React from "react";
import Layout from "./Layout";
import Header from "./Header/Header";
import {BrowserRouter} from "react-router-dom";
import Content from "./Content/Content";

export function App() {
    return (
        <div className={'header_wrapper'}>
            <BrowserRouter>
                <Layout>
                    <Header />
                    <Content />
                </Layout>
            </BrowserRouter>
        </div>
    )
}