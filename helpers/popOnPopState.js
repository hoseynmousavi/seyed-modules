import themeManager from "./themeManager"
import changeBodyOverflow from "./changeBodyOverflow"
import goBack from "./goBack"

function popOnPopState({key = "Escape", callback, dontPush, dontChangeOverflow, statusBarColor})
{
    let pushed = 0

    function onPushState()
    {
        pushed++
    }

    function onPopState()
    {
        if (pushed && !dontPush) pushed--
        else
        {
            callback?.()
            window.removeEventListener("popstate", onPopState)
            window.removeEventListener("pushstate", onPushState)
            if (!dontChangeOverflow) changeBodyOverflow(false)
            if (statusBarColor) themeManager.popBarColor()
            if (key) document.removeEventListener("keydown", onKeyDown)
        }
    }

    function onKeyDown(e)
    {
        if (e.key === key) goBack()
    }

    if (!dontPush) window.history.pushState("for-history", "", window.location.href)
    window.addEventListener("popstate", onPopState, {passive: true})
    window.addEventListener("pushstate", onPushState, {passive: true})
    if (!dontChangeOverflow) changeBodyOverflow(true)
    if (statusBarColor) themeManager.pushBarColor({barColor: statusBarColor})
    if (key) document.addEventListener("keydown", onKeyDown, {passive: true})

    return () =>
    {
        window.removeEventListener("popstate", onPopState)
        window.removeEventListener("pushstate", onPushState)
    }
}

export default popOnPopState