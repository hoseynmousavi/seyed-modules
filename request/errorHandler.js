import toastManager from "../helpers/toastManager"
import errorConstant from "../constant/errorConstant"
import {FAIL_TOAST, INFO_TOAST, REQUEST_CANCEL, RequestQue} from "../constant/toastTypes"
import refreshToken from "./refreshToken"
import requestDataShareManager from "./requestDataShareManager"
import cookieHelper from "../helpers/cookieHelper"

function errorHandler({offlineSending, getTokenWithRefreshToken, onGoingReqs, useRefreshToken, dontToast, err, reqUrl, callback})
{
    console.log(" %cERROR ", "color: orange; font-size:12px; font-family: 'Helvetica',consolas,sans-serif; font-weight:900;", err.response)
    if (!useRefreshToken && err?.response?.status === 403 && err?.response?.data?.detail === "Forbidden")
    {
        return refreshToken({getTokenWithRefreshToken})
            .then(callback)
            .catch(err =>
            {
                if (onGoingReqs?.[reqUrl]?.count > 1) requestDataShareManager.dataShare({message: {status: "NOK", dataReqUrl: reqUrl, data: err}})
                delete onGoingReqs?.[reqUrl]
                throw err
            })
    }
    else
    {
        if (!dontToast && err?.response?.status !== 404 && err?.message !== REQUEST_CANCEL)
        {
            const language = cookieHelper.getItem("language") || "fa"
            if (err.message === "Network Error" && offlineSending.some(item => reqUrl.includes(item))) toastManager.addToast({message: RequestQue(language), type: INFO_TOAST})
            else toastManager.addToast({message: errorConstant(err), type: FAIL_TOAST})
        }
        if (onGoingReqs?.[reqUrl]?.count > 1) requestDataShareManager.dataShare({message: {status: "NOK", dataReqUrl: reqUrl, data: err}})
        delete onGoingReqs?.[reqUrl]
        throw err
    }
}

export default errorHandler