import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const SecondOne = () => {
    const currentItems = useSelector(state => state.currentItems);
    const [currentData, setCurrentData] = useState([]);

    useEffect(() => {
        setCurrentData([...currentData, currentItems])
    }, [currentItems])

    return (
        <div className='data-card'>
            <span style={{color: 'blue'}}>Третья (Это отдельный компонент)</span>
            <p>Это третья карточка, в нее, мы не прокидываем props. Текущие данные в него приходят из глобального
                хранилища (Store), применяя технологию Redux</p>
            <p>Сюда <b>НЕ</b> передаются пропсы</p>
            <br/>
            <>
                {currentData && currentData.map((el, key) => {
                    if (el.value && el.stamp) {
                        return <div className='card' key={key}>{el.stamp} - {el.value}</div>
                    }
                })}
            </>
        </div>
    )
}

export default SecondOne;