import React, {useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";

const AuthPage = () => {
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

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

    return (
        <>
            <div style={{
                width: '300px',
                height: '300px',
                margin: '0 auto',
                padding: '20px',
                backgroundColor: 'lightgray',
            }}>
                <h1>Auth page is loaded!</h1>
                <h2 style={{textAlight: 'center'}}>Авторизация</h2>
                <div style={{margin: '10px 0'}}>
                    <label style={{margin: '0 10px 0 0'}} htmlFor='email'>Email</label>
                    <input placeholder='insert email'
                           id='email'
                           type="text"
                           name='email'
                           onChange={changeHandler}
                    />
                </div>
                <div style={{margin: '10px 0'}}>
                    <label style={{margin: '0 10px 0 0'}} htmlFor='password'>Email</label>
                    <input placeholder='insert password'
                           id='password'
                           type="password"
                           name='password'
                           onChange={changeHandler}
                    />
                </div>
                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                    <button
                        style={{width: '100px', padding: '10px', cursor: 'pointer'}}
                        disabled={loading}
                    > Войти
                    </button>
                    <button
                        style={{width: '100px', padding: '10px', cursor: 'pointer'}}
                        onClick={registerHandler}
                        disabled={loading}
                    > Регистрация
                    </button>
                </div>
            </div>

        </>
    )
}

export default AuthPage;