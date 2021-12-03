import React from "react";
import Logo from '../../../../static/img/card-right.png'

const Contacts = () => {
    return (
        <div className='contacts_wrapper'>
            <div className='contacts_wrapper-card'>
                <div className='contacts_wrapper-card-text'>
                    <h3 className='contacts_wrapper-card-text text-gradient-hot'>FullName: Dmitriy Bolshakov</h3>
                    <h4 className='contacts_wrapper-card-text text-gradient-hot'>State: Junior fullstack developer</h4>
                    <h4 className='contacts_wrapper-card-text text-gradient-hot'>Email: patrik.pjemslav@gmail.com</h4>
                    <h4 className='contacts_wrapper-card-text text-gradient-hot'>GitHub: github.com/DmitriyBol</h4>
                </div>
                <div className='contacts_wrapper-card-logo'>
                    <img src={Logo} alt=""/>
                </div>
            </div>
        </div>
    )
}

export default Contacts;