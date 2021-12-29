import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from '../App'

const AuthPage = () => {
    const {loading, error, request, clearError} = useHttp();
    const [gettedData, setGettedData] = useState();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const authPageContext = useContext(AuthContext);

    useEffect(() => {
        clearError();
    }, [error, clearError])

    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const registerHandler = async () => {
        try {
            await request('/api/auth/register', 'POST', {...form})
        } catch (e) {
            throw e;
        }
    }
    const loginHandler = async () => {
        try {
            await fetch('/api/auth/login', {method: "POST", headers: {'Content-Type': 'application/json'} , body: JSON.stringify(form)}).then( async (res) => {
                const data = await res.json();
                authPageContext.login(data.token, data.userID)
            })
        } catch (e) {
            throw e;
        }
    }
    const dataRecieveHandler = async () => {
        try {
            await fetch('/api/auth/getallusers').then(async (res) => {
                const data = await res.json();
                setGettedData(data.data);
            })
        } catch (e) {
            throw e;
        }
    }

    return (
        <>
            <div
                className='main_container'
            >
                <h2 className='main_container-title'>Авторизация</h2>
                <div className='main_container-input_row'>
                    <label className='main_container-input_row-label' htmlFor='email'>Email</label>
                    <input className='main_container-input_row-input' placeholder='insert email'
                           id='email'
                           type="text"
                           name='email'
                           onChange={changeHandler}
                    />
                </div>
                <div className='main_container-input_row'>
                    <label className='main_container-input_row-label' htmlFor='password'>Password</label>
                    <input className='main_container-input_row-input'
                           placeholder='insert password'
                           id='password'
                           type="password"
                           name='password'
                           onChange={changeHandler}
                    />
                </div>
                <div className='main_container-buttons'>
                    <button
                        onClick={loginHandler}
                        disabled={loading}
                    > Войти
                    </button>
                    <button
                        onClick={registerHandler}
                        disabled={loading}
                    > Регистрация
                    </button>
                </div>
                <button
                    className='all_email_data-button'
                    onClick={dataRecieveHandler}
                    disabled={loading}
                >Получить список Email's
                </button>
            </div>
            <div className='all_email_data'>
                <span>Какие email's есть в базе</span>
                {gettedData &&
                gettedData.map((element, index) => {
                    return (
                        <div key={index}>{element}</div>
                    )
                })}
            </div>
        </>
    )
}

export default AuthPage;