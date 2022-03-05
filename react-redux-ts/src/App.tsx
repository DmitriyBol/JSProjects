import React, {ChangeEvent, SyntheticEvent, useState} from 'react';
import './style/main.scss'

function App() {
    const [isSelected, setSelected] = useState('Главная');

    const setSelectedMenu = (e: any): void => {
        setSelected(e.target.innerHTML)
    }

    return (
        <div className='main-container'>
            <header className='header-main'>
                <nav>
                    <ul className='nav-list'>
                        <li className='nav-list_item'>
                            <a
                            style={isSelected === 'Главная' ? {backgroundColor: '#6acbff'} : {}}
                            href="#"
                            onClick={setSelectedMenu}>Главная
                            </a>
                        </li>
                        <li className='nav-list_item'>
                            <a
                                style={isSelected === 'Магазин' ? {backgroundColor: '#6acbff'} : {}}
                                href="#"
                                onClick={setSelectedMenu}
                            >Магазин</a>
                        </li>
                        <li className='nav-list_item'>
                            <a
                                style={isSelected === 'Контакты' ? {backgroundColor: '#6acbff'} : {}}
                                href="#"
                                onClick={setSelectedMenu}
                            >Контакты
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
            <section className='left-cont'> Основное поле с товарами и картинками</section>
            <section className='right-cont'> Меню, фильтры</section>
            <footer>
                дополнительная инфа
            </footer>
        </div>
    );
}

export default App;
