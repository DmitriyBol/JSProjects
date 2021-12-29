import {useCallback, useEffect, useState} from "react";

const storageName = 'userData';

const useAuth = () => {
    const [token, setToken] = useState();
    const [userId, setUserId] = useState();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));
        if (data && data.token) {
            login(data.token, data.userId)
        }
    }, [])

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken);
        setUserId(id);

        localStorage.setItem(storageName, JSON.stringify({
            userId: userId, token: jwtToken
        }))
    })

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem(storageName)
    })

    return {logout, login, token, userId}
}

export default useAuth;