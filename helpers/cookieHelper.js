function makeKeyOnEnv(key)
{
    const {hostname} = window.location
    if (process.env.NODE_ENV === "development" || hostname.includes("dev")) return key + "-dev"
    else if (hostname.includes("uat")) return key + "-uat"
    else return key
}

function setItem(key, value, expireDay = 365)
{
    const saveKey = makeKeyOnEnv(key)
    const d = new Date()
    d.setTime(d.getTime() + (expireDay * 24 * 60 * 60 * 1000))
    document.cookie = `${saveKey}=${value}; SameSite=Lax; Secure; domain=${process.env.NODE_ENV === "development" ? "localhost" : process.env.REACT_APP_DOMAIN}; path=/; Priority=High; expires=${d.toUTCString()};`
}

function removeItem(key)
{
    setItem(key, "")
}

function getItem(key)
{
    const saveKey = makeKeyOnEnv(key)
    let name = saveKey + "="
    let ca = document.cookie.split(";")
    for (let i = 0; i < ca.length; i++)
    {
        let c = ca[i]
        while (c.charAt(0) === " ")
        {
            c = c.substring(1)
        }
        if (c.indexOf(name) === 0)
        {
            return c.substring(name.length, c.length)
        }
    }
    return ""
}

const cookieHelper = {
    setItem,
    removeItem,
    getItem,
}

export default cookieHelper