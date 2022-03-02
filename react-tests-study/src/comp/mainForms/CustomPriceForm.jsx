import React, {useEffect, useState} from "react";

const CustomPriceForm = (props) => {
    const [currentPrice, setPrice] = useState('');

    useEffect(() => {
        if (currentPrice) {
            props.setPriceAreaEmpty(false);
        } else {
            props.setPriceAreaEmpty(true);
        }
    }, [currentPrice])

    const changeHandler = (e) => {
        setPrice(e.target.value);
        props.getPriceValue(e.target.value);
    }

    return (
        <>
            <input className='main-input' type="number" placeholder={'price'} value={currentPrice} onChange={changeHandler}/>
        </>
    )
}

export default CustomPriceForm;