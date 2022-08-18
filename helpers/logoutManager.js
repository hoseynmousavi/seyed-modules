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

const logout = ({redirect, logoutReq}) =>
{
    if (logoutReq) logoutReq()
    else window.history.replaceState("for-history", "", redirect)
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