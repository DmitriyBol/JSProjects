import React, {useEffect, useState} from "react";

const CustomTextForm = (props) => {
    const [currentValue, setCurrentValue] = useState('');

    useEffect(() => {
        if (currentValue) {
            props.setTextAreaEmpty(false);
        } else {
            props.setTextAreaEmpty(true);
        }
    })

    const changeHandler = (e) => {
        setCurrentValue(e.target.value);
        props.getTextValue(e.target.value);
    }

    return (
        <>
            <textarea
                name={props.key}
                id={props.id}
                cols="30"
                rows="10"
                onChange={changeHandler}
                value={currentValue}
                className='main-textarea'
                placeholder='input text'/>
        </>
    )
}

export default CustomTextForm;