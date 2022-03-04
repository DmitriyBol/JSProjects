import {useCallback, useState} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = {}, headers = {}) => {
        setLoading(true);
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            await fetch(url, {method, body, headers}).then( async (res) => {
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || 'Smtn went wrong on useHttp')
                }

                setLoading(false);
                return data
            })
        } catch (e) {
            setLoading(false);
            setError(e.message)
            throw e;
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {loading, request, error, clearError}
}