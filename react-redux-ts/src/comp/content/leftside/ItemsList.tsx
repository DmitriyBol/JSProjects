import React, {useEffect, useState} from "react";
import ListItem from "./ListItem";

const ItemsList = (props: any) => {
    const [receivedData, setReceivedData] = useState([]);

    useEffect(() => {
        setReceivedData(props.data);
        console.log('props.data', props.data)
    }, [props.data])

    return (
        <ul className='main-content_left-cont_list'>
            {receivedData ? (
                receivedData.map((el, key) => {
                    return (
                        <ListItem
                            key={key}
                            country={el["country"]}
                            name={el["name"]}
                            price={el["price"]}
                            val={el["val"]}
                        />
                    )
                })
            ) : (
                <h1>Нет данных для отображения</h1>
            )}
        </ul>)
}

export default ItemsList;