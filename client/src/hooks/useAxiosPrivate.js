import { axiosPrivate } from "../config/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

// Attach interceptors to axiosPrivate
// Think of interceptors as like js eventListeners
const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    /*
    The following effect intercepts the request and add the access token to the header (if there isn't one already).
    If this fails, then its likely due to the access token expired and we detecct this by intercepting the response.
    So then we send a request with refresh() to get a new access token with our refresh token
    Then we send the same request with the new access token. If it fails again, this means our refresh token is invalid/expired.
    SInce the refresh token is invalid, redirect them to the login page.
    */
    useEffect(() => {
        // Intercept the request
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        )

        // Intercept the response
        const responseIntercept = axiosPrivate.interceptors.response.use(
            // Return response if there is one. Otherwise, handle error
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            // Remove the interceptors so we don't duplicate same interceptors
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;