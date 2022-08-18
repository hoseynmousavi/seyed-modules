import makeBaseOnEnv from "../helpers/makeBaseOnEnv"

function urlMaker({base = process.env.REACT_APP_REST_URL, url, param = ""})
{
    return makeBaseOnEnv(base) + "/" + url + "/" + param
}

export default urlMaker
