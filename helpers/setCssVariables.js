import onResize from "./onResize"

function setCssVariables()
{
    const viewport = +process.env.REACT_APP_DESKTOP_VIEWPORT.replace("px", "")
    fitVariables()

    function fitVariables()
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

    onResize({callback: fitVariables})
}

export default setCssVariables