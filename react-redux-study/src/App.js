import "./style/globalStyle.scss"
import {useState} from "react";
import SecondOne from "./comp/SecondOne";
import ThirdOne from "./comp/ThirdOne";
import {useDispatch} from "react-redux";
import {addNewItem} from "./store";

const App = () => {
    const [sendedData, setSendedData] = useState([]);
    const [sendDeleteIndex, setSendDeleteIndex] = useState(0);
    const [currentDataLength, setCurrentDataLength] = useState(0);

    const dispatch = useDispatch();
    const handleSendByRedux = () => {
        const stamp = new Date().toLocaleString();
        dispatch(addNewItem({stamp: stamp, value: "Откуда-то"}));
    }

    const handleSendData = () => {
        const stamp = new Date().toLocaleString();
        setSendedData({stamp: stamp, value: "Что-то"})
    }

    const dataLengthHandler = (val) => {
        setCurrentDataLength((prev) => val);
    }

    const handleDeleteSomeSendData = () => {
        const rndIndex = Math.floor(Math.random() * currentDataLength);
        if (currentDataLength === 0) {
            setSendDeleteIndex(0);
        } else {
            setSendDeleteIndex(rndIndex);
        }
    }

    return (
        <section className='main-section'>
            <div className='data-card'>
                <span style={{color: 'blue'}}>Основная</span>
                <p>Итак, эти карточки, это данные, которые мы пробрасываем из различных компонентов. Либо берем из
                    глобального стейта используя Redux. К примеру, эта карточка может генерировать стрейт всем
                    другим.</p>
                <br/>
                <div className='one-to-two'>
                    <span>Через пропсы</span>
                    <button onClick={handleSendData}>Добавить к второй "Чтото"</button>
                    <button onClick={handleDeleteSomeSendData}>Удалить "Чтото" из второй</button>
                </div>
                <div className='one-to-two'>
                    <span>Через Redux</span>
                    <button onClick={handleSendByRedux}>Добавить в третий "Откуда-то"</button>
                </div>
            </div>
            {/* ПРОПСЫ */}
            <SecondOne
                sendedData={sendedData}
                sendDeleteIndex={sendDeleteIndex}
                setSendDeleteIndex={setSendDeleteIndex}
                dataLengthHandler={dataLengthHandler}
            />

            {/* ПРОПСОВ НЕТ */}
            <ThirdOne/>
        </section>
    );
}

export default App;
