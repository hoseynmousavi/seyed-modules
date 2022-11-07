import {useEffect} from "react"
import {REQUEST_CANCEL} from "../constant/toastTypes"

function GetData({request, isLoading, cancelToken, doAfterGet, dependencies = []})
{
    useEffect(() =>
    {
        function sendRequest()
        {
            cancelToken?.current?.cancel?.(REQUEST_CANCEL)
            request()?.then?.(() => doAfterGet && setTimeout(doAfterGet, 10))
        }

        if (isLoading) sendRequest()
        else doAfterGet?.()

        window.addEventListener("online", sendRequest)

        return () =>
        {
            // eslint-disable-next-line
            cancelToken?.current?.cancel?.(REQUEST_CANCEL)
            window.removeEventListener("online", sendRequest)
        }
        // eslint-disable-next-line
    }, dependencies)
}

export default GetData