import {useEffect} from "react"
import getMainRender from "../helpers/getMainRender"

function ScrollY({condition, updateParams = []})
{
    useEffect(() =>
    {
        const root = getMainRender()

        function onScroll()
        {
            condition?.({scrollTop: root.scrollTop, scrollHeight: root.scrollHeight})
        }

        root?.addEventListener?.("scroll", onScroll, {passive: true})
        return () => root?.removeEventListener?.("scroll", onScroll)
        // eslint-disable-next-line
    }, updateParams)
}

export default ScrollY