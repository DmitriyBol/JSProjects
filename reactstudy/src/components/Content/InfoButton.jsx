import React, {useRef, useState} from "react";
import ColorCard from "./Cards/ColorCard";

const InfoButton = () => {
    const [isActive, setActive] = useState(false);
    const contRef = useRef();

    return (
        <>
            <div className={isActive ? 'info_button-active' : 'info_button'} onClick={() => {
                setActive(!isActive)
            }}>
                <span>?</span>
            </div>

            {isActive &&
            <div className='info_container' ref={contRef}>
                <h3 style={{margin: '10px 0'}}>Информация по материалам:</h3>
                <h4 style={{margin: '10px 0'}}>Шрифты: <a href="https://fonts.google.com/specimen/Roboto"
                                                          className='single_link' target='_blank'>Roboto</a> {' '}
                    и <a
                        href="https://fonts.google.com/specimen/Smooch" className='single_link'
                        target='_blank'>Smooch</a></h4>
                <h4 style={{margin: '10px 0'}}>Палитра: сервис <a
                    href="https://coolors.co/" className='single_link' target='_blank'>Coolors</a></h4>
                <div className='colorCard_container'>
                    <ColorCard color={'#db2763'}/>
                    <ColorCard color={'#253237'}/>
                    <ColorCard color={'#5c6b73'}/>
                    <ColorCard color={'#9db4c0'}/>
                    <ColorCard color={'#c2dfe3'}/>
                    <ColorCard color={'#e0fbfc'}/>
                </div>
                <h4 style={{margin: '10px 0'}}>Иконки: не использовались.</h4>
                <h4 style={{margin: '10px 0'}}>Картинки: {' '}
                    <a href="https://wowjp.net/publ/istorii_wow/logotipy_dopolnenij_world_of_warcraft/122-1-0-21403"
                       className='single_link' target='_blank'>логотип WoW</a> , {' '}
                    <a href="https://www.pikpng.com/pngvi/xTTbiR_svg-wikimedia-commons-vector-steam-logo-png-clipart/"
                       className='single_link' target='_blank'>Логотип Steam</a>
                </h4>
            </div>
            }
        </>
    )
}

export default InfoButton;