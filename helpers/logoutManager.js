const configLogout = () =>
{
    if (!window.logout)
    {
        window.logout = function ()
        {
            const event = new CustomEvent("logout")
            window.dispatchEvent(event)
        }
    }
}

const logout = ({logoutReq, redirectUrl}) =>
{
    if (logoutReq) logoutReq()
    else if (redirectUrl) window.history.replaceState("for-history", "", redirectUrl)
    setTimeout(window.logout, 0)
}

const setLogOut = ({callBack}) =>
{
    configLogout()

    function onLogout()
    {
        callBack()
    }

    window.addEventListener("logout", onLogout, {passive: true})
}

const logoutManager = {
    logout,
    setLogOut,
}

export default logoutManager