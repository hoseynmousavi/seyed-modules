import onResize from "./onResize"
import isStandalone from "./isStandalone"

function setCssVariables()
{
    let timeout = null
    const viewport = +process.env.REACT_APP_DESKTOP_VIEWPORT.replace("px", "")
    fitVariables({isFirstTime: true})

    function fitVariables({isFirstTime = false})
    {
        function setStyle()
        {
            const clientWidth = window.innerWidth + 1
            const clientHeight = window.innerHeight + 1

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