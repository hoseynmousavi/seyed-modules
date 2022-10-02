const configToast = () =>
{
    if (!window.addToast)
    {
        window.addToast = function (props)
        {
            const event = new CustomEvent("addToast", {detail: props})
            window.dispatchEvent(event)
        }
    }
}

const addToast = ({message, type, onClick, isUndo, removeOnChangeLocation}) =>
{
    window.addToast({message, type, onClick, isUndo, removeOnChangeLocation})
}

const toastManager = {
    configToast,
    addToast,
}

export default toastManager