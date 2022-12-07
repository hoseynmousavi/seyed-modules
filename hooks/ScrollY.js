import {useEffect} from "react"
import getMainRender from "../helpers/getMainRender"

function ScrollY({condition, updateParams = [], timeout = 0})
{
    useEffect(() =>
    {
        setTimeout(() =>
        {
            const root = getMainRender()

            function onScroll()
            {
                condition?.({scrollTop: root.scrollTop, scrollHeight: root.scrollHeight})
            }

            root?.addEventListener?.("scroll", onScroll, {passive: true})
            return () => root?.removeEventListener?.("scroll", onScroll)
        }, timeout)
        // eslint-disable-next-line
    }, updateParams)
}

export default ScrollY