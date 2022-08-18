import axios from "axios"
import urlMaker from "./urlMaker"
import errorHandler from "./errorHandler"
import requestDataShareManager from "./requestDataShareManager"
import cookieHelper from "../helpers/cookieHelper"

let onGoingReqs = {}
let getTokenWithRefreshToken
let makeBaseOnEnv = base => base
let offlineSending = []
let redirectUrl = "/login"

function init({refreshFunc, makeBaseOnEnvFunc, offlineSendingArr, redirectUrlLogout})
{
    getTokenWithRefreshToken = refreshFunc
    makeBaseOnEnv = makeBaseOnEnvFunc
    offlineSending = offlineSendingArr
    redirectUrl = redirectUrlLogout
}

function handleRepeat({reqUrl})
{
    return new Promise((resolve, reject) =>
    {
        onGoingReqs[reqUrl].count++

        function onDataEvent(event)
        {
            const {message: {status, dataReqUrl, data}} = event.detail
            if (reqUrl === dataReqUrl)
            {
                window.removeEventListener("dataShare", onDataEvent)
                if (status === "OK") resolve(data)
                else reject(data)
            }
        }

        window.addEventListener("dataShare", onDataEvent, {passive: true})
    })
}

function get({base, url, param = "", dontToast, dontCache, cancel, useRefreshToken})
{
    const reqUrl = urlMaker({makeBaseOnEnv, base, url, param})
    if (onGoingReqs[reqUrl]) return handleRepeat({reqUrl})
    else
    {
        onGoingReqs[reqUrl] = {count: 1}
        const token = cookieHelper.getItem(useRefreshToken ? "refreshToken" : "token")
        let source
        if (cancel)
        {
            const CancelToken = axios.CancelToken
            source = CancelToken.source()
            cancel(source)
        }
        return axios.get(
            reqUrl,
            {
                headers: token && {[useRefreshToken ? "x-refresh-token" : "Authorization"]: token},
                cancelToken: source?.token,
            },
        )
            .then(res =>
            {
                const output = res.data
                if (onGoingReqs[reqUrl].count > 1) requestDataShareManager.dataShare({message: {status: "OK", dataReqUrl: reqUrl, data: output}})
                delete onGoingReqs[reqUrl]
                if (!dontCache) localStorage.setItem(reqUrl, JSON.stringify(output))
                return output
            })
            .catch(err =>
            {
                if (err.message === "Network Error" && !dontCache)
                {
                    const cacheData = localStorage.getItem(reqUrl)
                    if (cacheData)
                    {
                        const output = JSON.parse(cacheData)
                        if (onGoingReqs[reqUrl].count > 1) requestDataShareManager.dataShare({message: {status: "OK", dataReqUrl: reqUrl, data: output}})
                        delete onGoingReqs[reqUrl]
                        return output
                    }
                    else return error({dontToast, err, onGoingReqs, reqUrl, callback: () => get(arguments[0])})
                }
                else return error({dontToast, err, onGoingReqs, reqUrl, callback: () => get(arguments[0])})
            })
    }
}

function post({base, url, data, param = "", progress, cancel, dontToast, useRefreshToken})
{
    const reqUrl = urlMaker({makeBaseOnEnv, base, url, param})
    if (onGoingReqs[reqUrl]) return handleRepeat({reqUrl})
    else
    {
        onGoingReqs[reqUrl] = {count: 1}
        const token = cookieHelper.getItem(useRefreshToken ? "refreshToken" : "token")
        let source
        if (cancel)
        {
            const CancelToken = axios.CancelToken
            source = CancelToken.source()
            cancel(source)
        }
        return axios.post(
            reqUrl,
            data,
            {
                headers: token && {[useRefreshToken ? "refresh-token" : "Authorization"]: token},
                cancelToken: source?.token,
                onUploadProgress: e => progress && progress(e),
            },
        )
            .then(res =>
            {
                const output = res.data
                if (onGoingReqs[reqUrl].count > 1) requestDataShareManager.dataShare({message: {status: "OK", dataReqUrl: reqUrl, data: output}})
                delete onGoingReqs[reqUrl]
                return output
            })
            .catch(err => error({dontToast, err, onGoingReqs, reqUrl, callback: () => post(arguments[0])}))
    }
}

function put({base, url, data, param = "", progress, dontToast})
{
    const reqUrl = urlMaker({makeBaseOnEnv, base, url, param})
    const token = cookieHelper.getItem("token")
    return axios.put(
        reqUrl,
        data,
        {
            headers: {"Authorization": token},
            onUploadProgress: e => progress && progress(e),
        },
    )
        .then(res => res.data)
        .catch(err => error({dontToast, err, reqUrl, callback: () => put(arguments[0])}))
}

function patch({base, url, data, param = "", progress, dontToast})
{
    const reqUrl = urlMaker({makeBaseOnEnv, base, url, param})
    const token = cookieHelper.getItem("token")
    return axios.patch(
        reqUrl,
        data,
        {
            headers: {"Authorization": token},
            onUploadProgress: e => progress && progress(e),
        },
    )
        .then(res => res.data)
        .catch(err => error({dontToast, err, reqUrl, callback: () => patch(arguments[0])}))
}

function del({base, url, data, param = "", dontToast})
{
    const reqUrl = urlMaker({makeBaseOnEnv, base, url, param})
    const token = cookieHelper.getItem("token")
    return axios.delete(
        reqUrl,
        {
            headers: {"Authorization": token},
            data,
        },
    )
        .then(res => res.data)
        .catch(err => error({dontToast, err, reqUrl, callback: () => del(arguments[0])}))
}

function sendFile({base, url, param, data, progress, dontToast})
{
    const reqUrl = urlMaker({makeBaseOnEnv, base, url, param})
    const token = cookieHelper.getItem("token")
    return axios.put(
        reqUrl,
        data,
        {
            headers: {"Authorization": token},
            onUploadProgress: e => progress && progress(e),
        },
    )
        .then(res =>
        {
            progress?.(100)
            return res.data
        })
        .catch(err => error({dontToast, err, reqUrl, callback: () => put(arguments[0])}))
}

function error({dontToast, err, reqUrl, callback})
{
    return errorHandler({
        redirectUrl,
        offlineSending,
        getTokenWithRefreshToken,
        dontToast,
        err,
        reqUrl,
        callback,
    })
}

const request = {
    init,
    get,
    post,
    put,
    patch,
    del,
    sendFile,
}

export default request
