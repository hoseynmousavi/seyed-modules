const configTheme = () =>
{
    window.pushBarColor = function (props)
    {
        const event = new CustomEvent("pushBarColor", {detail: props})
        window.dispatchEvent(event)
    }

    window.popBarColor = function ()
    {
        const event = new CustomEvent("popBarColor")
        window.dispatchEvent(event)
    }
}

const pushBarColor = ({barColor}) =>
{
    window.pushBarColor({barColor})
}

const popBarColor = () =>
{
    window.popBarColor()
}

const themeManager = {
    configTheme,
    pushBarColor,
    popBarColor,
}

export default themeManager