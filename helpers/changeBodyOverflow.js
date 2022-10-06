function changeBodyOverflow(makeHide)
{
    const main = document.getElementById("main-render")
    if (makeHide)
    {
        if (main) main.style.overflowY = "hidden"
        document.body.style.overflowY = "hidden"
        document.body.style.overscrollBehavior = "auto"
    }
    else
    {
        if (main) main.style.removeProperty("overflow-y")
        document.body.style.removeProperty("overflow-y")
        document.body.style.removeProperty("overscroll-behavior")
    }
}

export default changeBodyOverflow