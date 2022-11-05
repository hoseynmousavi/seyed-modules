import {useEffect, useState} from "react"
import themeConstant from "../constant/themeConstant"
import getComputedStyleHelper from "../helpers/getComputedStyleHelper"
import GetTheme from "../hooks/GetTheme"

function ThemeColorBar({defaultColor = themeConstant.defaultColor})
{
    const {isDark} = GetTheme()
    const [barColor, setBarColor] = useState(getComputedStyleHelper(defaultColor))

    useEffect(() =>
    {
        function onChangeBarColor(event)
        {
            const {barColor} = event.detail
            if (barColor === "reset") setBarColor(getComputedStyleHelper(defaultColor))
            else setBarColor(barColor)
        }

        window.addEventListener("changeBarColor", onChangeBarColor, {passive: true})
        return () => window.removeEventListener("changeBarColor", onChangeBarColor)
    }, [])

    return (
        <>
            <meta name="theme-color" content={barColor}/>
            <meta name="apple-mobile-web-app-status-bar-style" content={isDark ? "black" : "default"}/>
        </>
    )
}

export default ThemeColorBar