import React, {useEffect, useState} from 'react';
import './style/main.scss'
import HeaderMain from "./comp/header/HeaderMain";
import ItemsList from "./comp/content/leftside/ItemsList";
import MockDB from "./mockDB/MockDB";

function App() {
    const [datafromDB, setDataFromDB]: any = useState();

    useEffect(() => {
        setDataFromDB(MockDB);
    }, [])

    return (
        <div className='main-container'>
            <HeaderMain/>
            <section className='main-content'>
                <section className='main-content_left-cont'>
                    <ItemsList data={datafromDB} />
                </section>
                <section className='main-content_right-cont'> Меню, фильтры</section>
            </section>
            <footer>
                дополнительная инфа
            </footer>
        </div>
    );
}

export default App;
