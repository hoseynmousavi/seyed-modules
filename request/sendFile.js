import axios from "axios"
import urlMaker from "./urlMaker"
import errorHandler from "./errorHandler"
import cookieHelper from "../helpers/cookieHelper"

function sendFile({base, url, param, data, progress, dontToast})
{
    const token = cookieHelper.getItem("token")
    return axios(
        {
            method: "put",
            url: urlMaker({base, url, param}),
            headers: {"Authorization": token},
            onUploadProgress: p => progress && progress(Math.floor((p.loaded * 99) / p.total)),
            data,
        },
    )
        .then(res =>
        {
            if (progress) progress(100)
            return res.data
        })
        .catch(err => errorHandler({dontToast, err, callback: () => sendFile(arguments[0])}))
}

export default sendFile