import {INFO_TOAST, TokenExpired} from "../constant/toastTypes"
import refreshTokenManager from "./refreshTokenManager"
import toastManager from "../helpers/toastManager"
import logoutManager from "../helpers/logoutManager"
import cookieHelper from "../helpers/cookieHelper"

let isRefreshing = false

function rejected({reject})
{
    logoutManager.logout()
    reject()
    const language = cookieHelper.getItem("language") || "fa"
    setTimeout(() => toastManager.addToast({message: TokenExpired(language), type: INFO_TOAST}), 150)
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