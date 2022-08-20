import {useEffect} from "react"

function OnKeyDown({key, callback, disable, disableCallback})
{
    useEffect(() =>
    {
        function onKeyDown(e)
        {
            if (e.key === key)
            {
                if (!disable)
                {
                    if (callback) callback()
                }
                else
                {
                    if (disableCallback) disableCallback()
                }
            }
        }

        document.addEventListener("keydown", onKeyDown, {passive: true})
        return () => document.removeEventListener("keydown", onKeyDown)
    }, [key, callback, disable, disableCallback])
}

export default OnKeyDown