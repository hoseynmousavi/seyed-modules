function onScroll({callback})
{
    const root = document.getElementById("main-render")

    function onScroll()
    {
        callback?.({scrollTop: root.scrollTop, scrollHeight: root.scrollHeight})
    }

    root.addEventListener("scroll", onScroll, {passive: true})
    return () => root.removeEventListener("scroll", onScroll)
}

export default onScroll