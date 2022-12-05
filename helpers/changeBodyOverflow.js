import getMainRender from "./getMainRender"

function changeBodyOverflow(makeHide, parent)
{
    const parentEl = parent && document.getElementById(parent)
    const root = document.getElementById("root")
    const main = getMainRender()
    if (makeHide)
    {
        if (parentEl)
        {
            parentEl.style.overflowY = "hidden"
        }
        else
        {
            if (main) main.style.overflowY = "hidden"
            if (root) root.style.overscrollBehavior = "auto"
            document.body.style.overflowY = "hidden"
        }
    }
    else
    {
        if (parentEl)
        {
            parentEl.style.removeProperty("overflow-y")
        }
        else
        {
            if (main) main.style.removeProperty("overflow-y")
            if (root) root.style.removeProperty("overscroll-behavior")
            document.body.style.removeProperty("overflow-y")
        }
    }
}

export default changeBodyOverflow