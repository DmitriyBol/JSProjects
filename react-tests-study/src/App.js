import React, {useEffect, useState} from "react";
import "./style/globalStyle.scss"
import CustomTextForm from "./comp/mainForms/CustomTextForm";
import CustomPriceForm from "./comp/mainForms/CustomPriceForm";

const App = () => {
    // initial data
    const [isTextAreaEmpty, setTextAreaEmpty] = useState(true);
    const [isPriceAreaEmpty, setPriceAreaEmpty] = useState(true);

    //recieved data (state and updaters)
    const [receivedTextData, setReceivedTextData] = useState('');
    const [receivedPriceData, setReceivedPriceData] = useState('');

    // mock data
    const [DB, setDB] = useState([]);

    useEffect(() => {
        if (DB.length > 3) {
            setDB([])
        }
    }, [DB]);

    // handlers
    const getTextValue = (val) => {
        setReceivedTextData(val);
    }

    const getPriceValue = (val) => {
        setReceivedPriceData(+val);
    }

    const logCurrentData = () => {
        console.log('isTextAreaEmpty', isTextAreaEmpty);
        console.log('received text', receivedTextData);
        console.log('isPriceAreaEmpty', isPriceAreaEmpty);
        console.log('received price', receivedPriceData);
    }

    const addToDB = () => {
        const newObj = {
            value: `${receivedPriceData} $`,
            comment: receivedTextData,
        }
        setDB([...DB, newObj]);
    }

    return (
        <>
            <div className='main-cont'>
                <button className='main-button' onClick={logCurrentData}>
                    Always enabled (Log current data)
                </button>
                <button disabled={!isTextAreaEmpty} className='main-button'>
                    Should disabled then textarea empty
                </button>
                <button disabled={isTextAreaEmpty} className='main-button'>
                    Should disabled then textarea NOT empty
                </button>
                <CustomTextForm
                    name='main-text-area'
                    id='1'
                    setTextAreaEmpty={setTextAreaEmpty}
                    getTextValue={getTextValue}
                />
                <CustomPriceForm
                    aria-label="price-input"
                    setPriceAreaEmpty={setPriceAreaEmpty}
                    getPriceValue={getPriceValue}
                />
                {/* appears then text && price is NOT empty */}
                {receivedTextData && receivedPriceData && (
                    <button className='main-button_big' onClick={addToDB}>Send data</button>
                )}
                <ul>
                    {DB && (
                        DB.map((el, index) => {
                            return (
                                <li aria-label="listitem" className='list-item' key={index}>Расход: {el.value}, а что ты
                                    сказал на это - " {el.comment} "</li>
                            )
                        })
                    )}
                </ul>
                <span className='description'>
                    Данная демка создана с целью показать возможности тестов используя интрументы react-testing-library,
                    тут не будет много кода, а может и сама форма выглядит не совсем приятно, ведь вся магия происходит "под копотом"
                </span>
            </div>
        </>
    )
}

export default App;
