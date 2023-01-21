import axios from "axios"
import urlMaker from "./urlMaker"
import errorHandler from "./errorHandler"
import requestDataShareManager from "./requestDataShareManager"
import cookieHelper from "../helpers/cookieHelper"

let onGoingReqs = {}
let getTokenWithRefreshToken
let makeBaseOnEnv = base => base
let offlineSending = []

function init({refreshFunc, makeBaseOnEnvFunc, offlineSendingArr})
{
    if (refreshFunc) getTokenWithRefreshToken = refreshFunc
    if (makeBaseOnEnvFunc) makeBaseOnEnv = makeBaseOnEnvFunc
    if (offlineSendingArr) offlineSending = offlineSendingArr
}

function handleRepeat({reqUrl})
{
    return new Promise((resolve, reject) =>
    {
        onGoingReqs[reqUrl] = {count: onGoingReqs[reqUrl]?.count ?? 1}

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

function get({base, url, param = "", dontToast, dontCache, cancel, useRefreshToken, refreshed})
{
    const reqUrl = urlMaker({makeBaseOnEnv, base, url, param})
    if (onGoingReqs[reqUrl] && !refreshed) return handleRepeat({reqUrl})
    else
    {
        onGoingReqs[reqUrl] = {count: onGoingReqs[reqUrl]?.count ?? 1}
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
                if (onGoingReqs[reqUrl]?.count > 1) requestDataShareManager.dataShare({message: {status: "OK", dataReqUrl: reqUrl, data: output}})
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
                        if (onGoingReqs[reqUrl]?.count > 1) requestDataShareManager.dataShare({message: {status: "OK", dataReqUrl: reqUrl, data: output}})
                        delete onGoingReqs[reqUrl]
                        return output
                    }
                    else return error({dontToast, err, reqUrl, callback: () => get(arguments[0])})
                }
                else return error({dontToast, err, reqUrl, callback: () => get({...arguments[0], refreshed: true})})
            })
    }
}

function post({base, url, data, param = "", progress, cancel, dontToast, useRefreshToken, headers, dontCache = true})
{
    const reqUrl = urlMaker({makeBaseOnEnv, base, url, param})
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
            headers: (token || headers) && {...(token ? {[useRefreshToken ? "refresh-token" : "Authorization"]: token} : {}), ...(headers ? headers : {})},
            cancelToken: source?.token,
            onUploadProgress: p => progress && progress(Math.floor((p.loaded * 99) / p.total)),
        },
    )
        .then(res =>
        {
            const output = res.data
            if (!dontCache) localStorage.setItem(reqUrl, JSON.stringify(output))
            return output
        })
        .catch(err =>
        {
            if (err.message === "Network Error" && !dontCache)
            {
                const cacheData = localStorage.getItem(reqUrl)
                if (cacheData) return JSON.parse(cacheData)
                else return error({dontToast, err, reqUrl, callback: () => post(arguments[0])})
            }
            else return error({dontToast, err, reqUrl, callback: () => post(arguments[0])})
        })
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
            onUploadProgress: p => progress && progress(Math.floor((p.loaded * 99) / p.total)),
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
            onUploadProgress: p => progress && progress(Math.floor((p.loaded * 99) / p.total)),
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

function sendFile({base, url, param, data, progress, dontToast, method = "put"})
{
    const reqUrl = urlMaker({makeBaseOnEnv, base, url, param})
    const token = cookieHelper.getItem("token")
    return axios[method](
        reqUrl,
        data,
        {
            headers: {"Authorization": token},
            onUploadProgress: p => progress && progress(Math.floor((p.loaded * 99) / p.total)),
        },
    )
        .then(res =>
        {
            progress?.(100)
            return res.data
        })
        .catch(err => error({dontToast, err, reqUrl, callback: () => sendFile(arguments[0])}))
}

function error({useRefreshToken, dontToast, err, reqUrl, callback})
{
    return errorHandler({
        offlineSending,
        getTokenWithRefreshToken,
        onGoingReqs,
        useRefreshToken,
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