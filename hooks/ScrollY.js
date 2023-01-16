import {useEffect} from "react"
import getMainRender from "../helpers/getMainRender"

function ScrollY({condition, updateParams = [], timeout = 0})
{
    useEffect(() =>
    {
        let root

        function onScroll()
        {
            condition?.({scrollTop: root.scrollTop, scrollHeight: root.scrollHeight})
        }

        const timer = setTimeout(() =>
        {
            root = getMainRender()
            root?.addEventListener?.("scroll", onScroll, {passive: true})
        }, timeout)

        return () =>
        {
            root?.removeEventListener?.("scroll", onScroll)
            clearTimeout(timer)
        }
        // eslint-disable-next-line
    }, updateParams)
}

export default ScrollY