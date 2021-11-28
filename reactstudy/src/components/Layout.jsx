import React from "react";
import '../style/globalStyle.scss'

const Layout = ( { children } ) => {
    return (
        <div className={'main_layout'}>
            { children }
        </div>
    )
}

export default Layout;

