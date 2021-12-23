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
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <h2 style={{ textAlign: 'center' }}>Авторизация</h2>
                <div style={{margin: '10px 0', display: 'flex', justifyContent: 'space-between'}}>
                    <label style={{margin: '0 10px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center'}} htmlFor='email'>Email</label>
                    <input placeholder='insert email'
                           id='email'
                           type="text"
                           name='email'
                           onChange={changeHandler}
                           style={{padding: '10px'}}
                    />
                </div>
                <div style={{margin: '10px 0', display: 'flex', justifyContent: 'space-between'}}>
                    <label style={{margin: '0 10px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center'}} htmlFor='password'>Password</label>
                    <input placeholder='insert password'
                           id='password'
                           type="password"
                           name='password'
                           onChange={changeHandler}
                           style={{padding: '10px'}}
                    />
                </div>
                <div style={{display: 'flex', justifyContent: 'space-evenly', marginTop: 'auto'}}>
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