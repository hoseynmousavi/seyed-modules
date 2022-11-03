import getMainRender from "./getMainRender"

function changeBodyOverflow(makeHide)
{
    const root = document.getElementById("root")
    const main = getMainRender()
    if (makeHide)
    {
        if (main) main.style.overflowY = "hidden"
        if (root) root.style.overscrollBehavior = "auto"
        document.body.style.overflowY = "hidden"
    }
    else
    {
        if (main) main.style.removeProperty("overflow-y")
        if (root) root.style.removeProperty("overscroll-behavior")
        document.body.style.removeProperty("overflow-y")
    }
}

export default changeBodyOverflow