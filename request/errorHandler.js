import toastManager from "../helpers/toastManager"
import errorConstant from "../constant/errorConstant"
import {FAIL_TOAST, INFO_TOAST, REQUEST_CANCEL, REQUEST_QUE} from "../constant/toastTypes"
import refreshToken from "./refreshToken"
import requestDataShareManager from "./requestDataShareManager"

function errorHandler({offlineSending, getTokenWithRefreshToken, useRefreshToken, dontToast, err, onGoingReqs, reqUrl, callback})
{
    console.log(" %cERROR ", "color: orange; font-size:12px; font-family: 'Helvetica',consolas,sans-serif; font-weight:900;", err.response)
    if (!useRefreshToken && err?.response?.status === 403 && err?.response?.data?.detail === "Forbidden")
    {
        return refreshToken({getTokenWithRefreshToken})
            .then(() =>
            {
                delete onGoingReqs?.[reqUrl]
                return callback()
            })
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
            if (err.message === "Network Error" && offlineSending.some(item => reqUrl.includes(item))) toastManager.addToast({message: REQUEST_QUE, type: INFO_TOAST})
            else toastManager.addToast({message: errorConstant(err), type: FAIL_TOAST})
        }
        if (onGoingReqs?.[reqUrl]?.count > 1) requestDataShareManager.dataShare({message: {status: "NOK", dataReqUrl: reqUrl, data: err}})
        delete onGoingReqs?.[reqUrl]
        throw err
    }
}

export default errorHandler