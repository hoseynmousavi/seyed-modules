const configTheme = () =>
{
    if (!window.changeBarColor)
    {
        window.changeBarColor = function (props)
        {
            const event = new CustomEvent("changeBarColor", {detail: props})
            window.dispatchEvent(event)
        }
    }
}

const changeBarColor = ({barColor}) =>
{
    window.changeBarColor({barColor})
}

const resetBarColor = () =>
{
    window.changeBarColor({barColor: "reset"})
}

const themeManager = {
    configTheme,
    changeBarColor,
    resetBarColor,
}

export default themeManager