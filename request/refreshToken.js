import {FAIL_TOAST, tokenExpired} from "../constant/toastTypes"
import refreshTokenManager from "./refreshTokenManager"
import toastManager from "../helpers/toastManager"
import logoutManager from "../helpers/logoutManager"

let isRefreshing = false

function rejected({reject, redirectUrl})
{
    toastManager.addToast({message: tokenExpired, type: FAIL_TOAST})
    logoutManager.logout({redirectUrl})
    reject()
}

function refreshToken({getTokenWithRefreshToken, redirectUrl})
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
                            rejected({reject, redirectUrl})
                        }
                    })
            }
            else
            {
                function onRefreshEvent(event)
                {
                    const {message} = event.detail
                    if (message === "OK") resolve()
                    else rejected({reject, redirectUrl})
                    window.removeEventListener("refreshToken", onRefreshEvent)
                }

                window.addEventListener("refreshToken", onRefreshEvent, {passive: true})
            }
        }
        else rejected({reject, redirectUrl})
    })
}

export default refreshToken