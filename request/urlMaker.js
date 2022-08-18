function urlMaker({makeBaseOnEnv, base = process.env.REACT_APP_REST_URL, url, param = ""})
{
    return makeBaseOnEnv(base) + "/" + url + "/" + param
}

export default urlMaker
