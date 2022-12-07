import onResize from "./onResize"
import isStandalone from "./isStandalone"
import getComputedStyleHelper from "./getComputedStyleHelper"

function setCssVariables()
{
    let timeout = null
    const viewport = +getComputedStyleHelper("--desktop-viewport").replace("px", "")
    fitVariables({isFirstTime: true})

    function fitVariables({isFirstTime = false})
    {
        function setStyle()
        {
            const clientWidth = window.innerWidth
            const clientHeight = window.innerHeight

            document.documentElement.style.setProperty(
                "--full-viewport",
                clientWidth > viewport ? viewport + "px" : "100vw",
            )
            document.documentElement.style.setProperty(
                "--full-height",
                clientHeight + "px",
            )
        }

        if (isFirstTime || !isStandalone()) setStyle()
        else
        {
            clearTimeout(timeout)
            timeout = setTimeout(setStyle, 100)
        }
    }

    onResize({callback: fitVariables})
}

export default setCssVariables