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

const logout = ({logoutReq, redirectUrl} = {}) =>
{
    logoutReq?.()
    if (redirectUrl) window.history.replaceState("for-history", "", "/")
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