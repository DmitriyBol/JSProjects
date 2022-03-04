import React, {useEffect, useState} from "react";

const SecondOne = (props) => {
    const [currentData, setCurrentData] = useState([]);

    const [currentProps, setCurrentProps] = useState([]);

    useEffect(() => {
        setCurrentProps(Object.keys(props));
    }, [])

    useEffect(() => {
        if (props.sendedData) {
            setCurrentData([...currentData, props.sendedData]);
            props.dataLengthHandler(currentData.length);
        }
    }, [props.sendedData]);

    useEffect(() => {
        const newData = [...currentData];
        newData.splice(props.sendDeleteIndex, 1);
        setCurrentData(newData);
    }, [props.sendDeleteIndex])

    return (
        <div className='data-card'>
            <span style={{color: 'blue'}}>Вторая (Это отдельный компонент)</span>
            <p>Это вторая карточка, она не может ничего создавать. Она является примером props drilling. Мы закидываем в
                нее пропсы из основной</p>
            <p>Сюда передаются пропсы:</p>
            <div className='prop-list'>
                {currentProps && currentProps.map((el, key) => {
                    return <span key={key}>{el}</span>
                })}
            </div>
            <br/>
            <div>
                {currentData && currentData.map((el, key) => {
                    return <div className='card' key={key}>{el.stamp} - {el.value}</div>
                })}
            </div>
        </div>
    )
}

export default SecondOne;