function getDomain()
{
    if (process.env.REACT_APP_DOMAIN) return process.env.REACT_APP_DOMAIN
    else
    {
        const hostName = window.location.hostname
        return hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1)
    }
}

export default getDomain