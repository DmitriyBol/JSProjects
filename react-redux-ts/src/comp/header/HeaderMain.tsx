import React, {useState} from "react";

const HeaderMain: React.FC = (props: any) => {
    const [isSelected, setSelected] = useState('Главная');

    const setSelectedMenu = (e: any): void => {
        setSelected(e.target.innerHTML)
    }
    return (
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
    )
}

export default HeaderMain