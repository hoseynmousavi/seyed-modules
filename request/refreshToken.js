import {INFO_TOAST, tokenExpired} from "../constant/toastTypes"
import refreshTokenManager from "./refreshTokenManager"
import toastManager from "../helpers/toastManager"
import logoutManager from "../helpers/logoutManager"

let isRefreshing = false

function rejected({reject})
{
    logoutManager.logout()
    reject()
    setTimeout(() => toastManager.addToast({message: tokenExpired, type: INFO_TOAST}), 150)
}

function refreshToken({getTokenWithRefreshToken})
{
    return new Promise((resolve, reject) =>
    {
        if (getTokenWithRefreshToken)
        {
            if (!isRefreshing)
            {
                isRefreshing = true
                getTokenWithRefreshToken()
                    .then(status =>
                    {
                        if (status)
                        {
                            isRefreshing = false
                            refreshTokenManager.refreshToken({message: "OK"})
                            resolve()
                        }
                        else
                        {
                            isRefreshing = false
                            refreshTokenManager.refreshToken({message: "NOK"})
                            rejected({reject})
                        }
                    })
            }
            else
            {
                function onRefreshEvent(event)
                {
                    const {message} = event.detail
                    if (message === "OK") resolve()
                    else rejected({reject})
                    window.removeEventListener("refreshToken", onRefreshEvent)
                }

                window.addEventListener("refreshToken", onRefreshEvent, {passive: true})
            }
        }
        else rejected({reject})
    })
}

export default refreshToken